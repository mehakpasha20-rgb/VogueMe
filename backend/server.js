/**
 * VogueMe Backend Server Entry Point
 * 
 * This file initializes the Express application, establishes a connection to MongoDB 
 * (either a real MongoDB URI from environment variables or an In-Memory MongoDB for development),
 * configures middleware (CORS, body-parsing), mounts API routes, and starts the HTTP server.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express application
const app = express();

// ==========================================
// Middleware Configuration
// ==========================================

// Enable Cross-Origin Resource Sharing (allows frontend to make requests to backend)
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads (useful for form submissions)
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Database Connection & Initialization
// ==========================================
const seedDatabase = require('./seed');

/**
 * Connects to MongoDB database.
 * If MONGODB_URI is not provided in environment variables, it creates and connects to
 * an in-memory MongoDB server (mongodb-memory-server) to ease local development.
 */
const startDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;
    let isMemoryDB = false;
    
    // Fallback to in-memory database if no connection string is set in environment
    if (!mongoUri) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      isMemoryDB = true;
      console.log('Using In-Memory MongoDB for development');
    }
    
    // Connect using mongoose ODM
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');

    // Seed initial mock data if using in-memory database and it is empty
    if (isMemoryDB) {
      const Dress = require('./models/Dress');
      const count = await Dress.countDocuments();
      if (count === 0) {
        console.log('Database is empty, running seeder...');
        await seedDatabase();
      }
    }
  } catch (err) {
    console.log('MongoDB Connection Error:', err);
  }
};
startDB();

// ==========================================
// API Routes Mounting
// ==========================================

// Authentication routes (Signup, Login)
app.use('/api/auth', require('./routes/auth'));

// User profile management routes
app.use('/api/users', require('./routes/users'));

// Dress catalog routes
app.use('/api/dresses', require('./routes/dresses'));

// Jewellery catalog routes
app.use('/api/jewellery', require('./routes/jewellery'));

// Outfit creation/builder routes
app.use('/api/outfits', require('./routes/outfits'));

// Shopping cart routes
app.use('/api/cart', require('./routes/cart'));

// User wishlist routes
app.use('/api/wishlist', require('./routes/wishlist'));

// Orders & checkout routes
app.use('/api/orders', require('./routes/orders'));

// AI Styling Assistant routes (Chatbot integration)
app.use('/api/ai', require('./routes/ai'));

// Contact/Inquiry submission routes
app.use('/api/contact', require('./routes/contact'));

// ==========================================
// Server Startup
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
