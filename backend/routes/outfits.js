const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');
const Dress = require('../models/Dress');
const Jewellery = require('../models/Jewellery');

// Get all outfits
router.get('/', async (req, res) => {
  try {
    const { mood } = req.query;
    let query = {};
    if (mood) query.mood = mood;

    const outfits = await Outfit.find(query)
      .populate('dressId')
      .populate('necklaceId')
      .populate('earringId');

    res.json(outfits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get outfit by ID
router.get('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id)
      .populate('dressId')
      .populate('necklaceId')
      .populate('earringId');
    
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create outfit (admin)
router.post('/', async (req, res) => {
  try {
    const outfit = new Outfit(req.body);
    await outfit.save();
    res.status(201).json(outfit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Generate random complete look
router.get('/generate/random', async (req, res) => {
  try {
    const { mood } = req.query;
    let dressQuery = {};
    if (mood) dressQuery.category = mood;

    const dresses = await Dress.find(dressQuery);
    const necklaces = await Jewellery.find({ category: 'Necklace' });
    const earrings = await Jewellery.find({ category: 'Earrings' });

    if (dresses.length === 0 || necklaces.length === 0 || earrings.length === 0) {
      return res.status(400).json({ message: 'Not enough items to generate outfit' });
    }

    const randomDress = dresses[Math.floor(Math.random() * dresses.length)];
    const randomNecklace = necklaces[Math.floor(Math.random() * necklaces.length)];
    const randomEarring = earrings[Math.floor(Math.random() * earrings.length)];

    res.json({
      dress: randomDress,
      necklace: randomNecklace,
      earring: randomEarring
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
