/**
 * Authentication Route Handlers
 * 
 * Defines routing endpoints for user signup and login operations.
 * Utilizes bcryptjs for hashing passwords and jsonwebtoken for generating
 * session tokens to allow authenticated frontend actions.
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @route   POST /api/auth/signup
 * @desc    Registers a new user, hashes password, saves to DB, and returns a JWT
 * @access  Public
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password with a salt factor of 10 for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new User instance and save it to MongoDB
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Sign a JSON Web Token containing the new user's ID
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your_jwt_secret_key_here', 
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Return the token and essential user information
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticates a user with email/password and returns a JWT
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare plain-text password from request with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Sign a new JSON Web Token for the authenticated user session
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your_jwt_secret_key_here', 
      { expiresIn: '7d' }
    );

    // Return the token and essential user information
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

