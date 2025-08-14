import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  sharedNews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SharedNews'
  }]
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
