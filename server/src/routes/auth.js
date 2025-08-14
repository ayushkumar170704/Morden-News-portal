import { Router } from 'express';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Create OAuth2 client with the correct redirect URI
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage' // This is crucial for web applications
);

// Google OAuth callback
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body; // Changed from 'code' to 'credential'
    
    console.log('Received credential:', credential ? 'Present' : 'Missing');

    if (!credential) {
      return res.status(400).json({ error: 'Credential is required' });
    }

    // Verify the Google ID token directly
    const ticket = await oauth2Client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleUserId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];

    console.log('Google user verified:', email);

    // Find or create user
    let user = await User.findOne({ email: email });
    
    if (!user) {
      console.log('Creating new user...');
      user = new User({
        googleId: googleUserId,
        email: email,
        name: name,
        avatar: picture || ''
      });
      await user.save();
      console.log('New user created');
    } else {
      console.log('Existing user found');
      // Update Google ID and avatar if not set
      if (!user.googleId) {
        user.googleId = googleUserId;
        user.avatar = picture || user.avatar;
        await user.save();
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('JWT token generated successfully');

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar
    }
  });
});

// Logout
router.post('/logout', authenticate, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
