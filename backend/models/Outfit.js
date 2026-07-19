const mongoose = require('mongoose');

const OutfitSchema = new mongoose.Schema({
  dressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dress',
    required: true
  },
  necklaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jewellery'
  },
  earringId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jewellery'
  },
  name: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    enum: ['Casual', 'Party', 'Wedding', 'Formal', 'Traditional']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Outfit', OutfitSchema);
