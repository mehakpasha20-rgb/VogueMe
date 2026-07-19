const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const auth = require('../middleware/auth');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({ userId: req.user.userId })
      .populate('productId');
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to wishlist
router.post('/', auth, async (req, res) => {
  try {
    const { productId, productType } = req.body;

    const existingItem = await Wishlist.findOne({
      userId: req.user.userId,
      productId,
      productType
    });

    if (existingItem) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      userId: req.user.userId,
      productId,
      productType
    });
    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from wishlist
router.delete('/:id', auth, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
