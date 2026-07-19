const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const seedDatabase = require('./seed');
const startDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;
    let isMemoryDB = false;
    if (!mongoUri) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      isMemoryDB = true;
      console.log('Using In-Memory MongoDB for development');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');

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

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/dresses', require('./routes/dresses'));
app.use('/api/jewellery', require('./routes/jewellery'));
app.use('/api/outfits', require('./routes/outfits'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Server restarted successfully and local MongoDB running - attempt 6

