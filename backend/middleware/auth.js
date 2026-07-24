/**
 * JWT Authentication Middleware
 * 
 * Intercepts requests destined for protected routes. Extracts the JSON Web Token
 * from the 'Authorization' header, verifies it, and attaches the decoded payload 
 * (such as user ID) to the request object (`req.user`) before passing control 
 * to the next middleware or route handler.
 */

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Retrieve token from the 'Authorization' header and strip 'Bearer ' prefix
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is provided, return 401 Unauthorized status
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    // Verify token validity using the JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
    
    // Attach decoded user data (e.g. userId) to req.user for subsequent route handlers
    req.user = decoded;
    
    // Proceed to next handler/middleware in the chain
    next();
  } catch (error) {
    // If token verification fails, return 401 Unauthorized status
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;

