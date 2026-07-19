const express = require('express');
const router = express.Router();
const Jewellery = require('../models/Jewellery');

// Get all jewellery
router.get('/', async (req, res) => {
  try {
    const { category, color, sort } = req.query;
    let query = {};

    if (category) query.category = category;
    if (color) query.color = color;

    let jewellery = await Jewellery.find(query);

    if (sort === 'price-low') {
      jewellery.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      jewellery.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      jewellery.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.json(jewellery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get jewellery by ID
router.get('/:id', async (req, res) => {
  try {
    const jewellery = await Jewellery.findById(req.params.id);
    if (!jewellery) {
      return res.status(404).json({ message: 'Jewellery not found' });
    }
    res.json(jewellery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create jewellery (admin)
router.post('/', async (req, res) => {
  try {
    const jewellery = new Jewellery(req.body);
    await jewellery.save();
    res.status(201).json(jewellery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
