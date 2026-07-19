const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.userId })
      .populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to cart
router.post('/', auth, async (req, res) => {
  try {
    const { productId, productType, quantity } = req.body;

    const existingItem = await Cart.findOne({
      userId: req.user.userId,
      productId,
      productType
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.json(existingItem);
    }

    const cartItem = new Cart({
      userId: req.user.userId,
      productId,
      productType,
      quantity: quantity || 1
    });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/:id', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { quantity },
      { new: true }
    );
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from cart
router.delete('/:id', auth, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
