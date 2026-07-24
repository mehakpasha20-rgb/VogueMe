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
    
    // Smart color matching logic
    const colorMatching = {
      'Red': 'Gold',
      'Blue': 'Silver',
      'Black': 'Silver',
      'White': 'Gold',
      'Green': 'Gold',
      'Pink': 'Rose Gold',
      'Purple': 'Silver',
      'Orange': 'Gold',
      'Yellow': 'Gold'
    };

    // Get matching jewelry color based on dress color
    const targetJewelryColor = colorMatching[dress.color] || 'Gold';
    
    // Find jewelry of the target color
    const matchingJewellery = await Jewellery.find({ color: targetJewelryColor });
    
    // If no matches, fallback to any jewelry
    const jewelleryToUse = matchingJewellery.length > 0 ? matchingJewellery : await Jewellery.find({});

    // Get only ONE item per category
    const necklace = jewelleryToUse.find(j => j.category === 'Necklace');
    const earring = jewelleryToUse.find(j => j.category === 'Earrings');
    const bracelet = jewelleryToUse.find(j => j.category === 'Bracelet' || j.category === 'Ring');

    res.json({ 
      necklaces: necklace ? [necklace] : [], 
      earrings: earring ? [earring] : [], 
      bracelets: bracelet ? [bracelet] : [] 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
