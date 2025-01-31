const mongoose = require('mongoose');

const CapsuleSchema = new mongoose.Schema({
  vault_id: {
    type: Number, 
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
    videos: [String], 
    images: [String], 
    text_files: [String], 
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
