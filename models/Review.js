// models/Review.js
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a compound index to ensure a user can only review an item once
ReviewSchema.index({ user: 1, item: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);