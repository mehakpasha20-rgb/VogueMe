/**
 * User Schema Model
 * 
 * Defines the MongoDB schema structure for User documents using Mongoose ODM.
 * Used for user account registration, login verification, and profile identification.
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // The user's display name (e.g., 'Jane Doe')
  name: {
    type: String,
    required: true
  },
  // The user's email address, used as login identifier (must be unique in the system)
  email: {
    type: String,
    required: true,
    unique: true
  },
  // The hashed password of the user (never stored in plain text for security)
  password: {
    type: String,
    required: true
  },
  // The timestamp when the user account was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compile and export the User model
module.exports = mongoose.model('User', UserSchema);

