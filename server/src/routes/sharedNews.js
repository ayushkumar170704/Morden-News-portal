import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import SharedNews from '../models/SharedNews.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Get all shared news
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = category ? { category } : {};

    const sharedNews = await SharedNews.find(query)
      .populate('sharedBy', 'name avatar')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Add like status if user is authenticated
    if (req.user) {
      sharedNews.forEach(news => {
        news._doc.isLiked = news.likes.some(like => like.toString() === req.user._id.toString());
        news._doc.likesCount = news.likes.length;
      });
    } else {
      sharedNews.forEach(news => {
        news._doc.isLiked = false;
        news._doc.likesCount = news.likes.length;
      });
    }

    const total = await SharedNews.countDocuments(query);

    res.json({
      sharedNews,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching shared news:', error);
    res.status(500).json({ error: 'Failed to fetch shared news' });
  }
});

// Share a news article
router.post('/', 
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('url').isURL().withMessage('Valid URL is required'),
    body('category').optional().isString()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, url, description, imageUrl, category } = req.body;

      // Check if news already shared by this user
      const existingNews = await SharedNews.findOne({ 
        url: url, 
        sharedBy: req.user._id 
      });

      if (existingNews) {
        return res.status(400).json({ error: 'You have already shared this news' });
      }

      const sharedNews = new SharedNews({
        title,
        url,
        description: description || '',
        imageUrl: imageUrl || '',
        category: category || 'general',
        sharedBy: req.user._id
      });

      await sharedNews.save();
      
      // Update user's shared news list
      req.user.sharedNews.push(sharedNews._id);
      await req.user.save();

      await sharedNews.populate('sharedBy', 'name avatar');

      res.status(201).json(sharedNews);
    } catch (error) {
      console.error('Error sharing news:', error);
      res.status(500).json({ error: 'Failed to share news' });
    }
  }
);

// Like/Unlike a shared news
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const sharedNews = await SharedNews.findById(req.params.id);
    
    if (!sharedNews) {
      return res.status(404).json({ error: 'Shared news not found' });
    }

    const likeIndex = sharedNews.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      // Unlike
      sharedNews.likes.splice(likeIndex, 1);
    } else {
      // Like
      sharedNews.likes.push(req.user._id);
    }

    await sharedNews.save();

    res.json({
      likesCount: sharedNews.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// Add comment to shared news
router.post('/:id/comment',
  authenticate,
  [
    body('comment').notEmpty().withMessage('Comment is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const sharedNews = await SharedNews.findById(req.params.id);
      
      if (!sharedNews) {
        return res.status(404).json({ error: 'Shared news not found' });
      }

      const newComment = {
        user: req.user._id,
        comment: req.body.comment,
        createdAt: new Date()
      };

      sharedNews.comments.push(newComment);
      await sharedNews.save();

      await sharedNews.populate('comments.user', 'name avatar');

      const addedComment = sharedNews.comments[sharedNews.comments.length - 1];

      res.status(201).json(addedComment);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  }
);

// Get user's shared news
router.get('/my', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const sharedNews = await SharedNews.find({ sharedBy: req.user._id })
      .populate('sharedBy', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SharedNews.countDocuments({ sharedBy: req.user._id });

    res.json({
      sharedNews,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching user shared news:', error);
    res.status(500).json({ error: 'Failed to fetch your shared news' });
  }
});

export default router;
