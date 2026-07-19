const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create order from cart
router.post('/', auth, async (req, res) => {
  try {
    const { shippingDetails } = req.body;

    const cartItems = await Cart.find({ userId: req.user.userId }).populate('productId');
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = cartItems.map(item => ({
      productId: item.productId._id,
      productType: item.productType,
      quantity: item.quantity,
      price: item.productId.price
    }));

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      shippingDetails
    });

    await order.save();

    // Clear cart
    await Cart.deleteMany({ userId: req.user.userId });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
