const express = require('express');
const router = express.Router();
const Dress = require('../models/Dress');

// Get all dresses
router.get('/', async (req, res) => {
  try {
    const { category, color, sort } = req.query;
    let query = {};

    if (category) query.category = category;
    if (color) query.color = color;

    let dresses = await Dress.find(query);

    if (sort === 'price-low') {
      dresses.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      dresses.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      dresses.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.json(dresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get dress by ID
router.get('/:id', async (req, res) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) {
      return res.status(404).json({ message: 'Dress not found' });
    }
    res.json(dress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create dress (admin)
router.post('/', async (req, res) => {
  try {
    const dress = new Dress(req.body);
    await dress.save();
    res.status(201).json(dress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get matching jewellery for a dress
router.get('/:id/matching-jewellery', async (req, res) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) {
      return res.status(404).json({ message: 'Dress not found' });
    }

    const Jewellery = require('../models/Jewellery');
    
    // Rule-based matching logic
    const matchingJewellery = await Jewellery.find({
      $or: [
        { color: dress.color },
        { color: { $in: ['Gold', 'Silver', 'Rose Gold'] } }
      ]
    });

    const necklaces = matchingJewellery.filter(j => j.category === 'Necklace');
    const earrings = matchingJewellery.filter(j => j.category === 'Earrings');
    const bracelets = matchingJewellery.filter(j => j.category === 'Bracelet' || j.category === 'Ring');

    res.json({ necklaces, earrings, bracelets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
