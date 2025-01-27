const mongoose = require('mongoose');

const CapsuleSchema = new mongoose.Schema({
  vault_id: {
    type: Number, // Links to SQL vault_id
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    videos: [String], // Array of video file URLs
    images: [String], // Array of image file URLs
    text_files: [String], // Array of text file URLs
  },
  status: {
    type: String,
    enum: ['locked', 'unlocked'],
    default: 'locked',
  },
  sender_email: {
    type: String,
    required: true,
  },
  receiver_email: {
    type: String,
    required: true,
  },
  anonymous_sender: {
    type: Boolean,
    default: false,
  },
});

const Capsule = mongoose.model('Capsule', CapsuleSchema);

module.exports = Capsule;
