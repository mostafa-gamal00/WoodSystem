const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model
const Admin = require('../models/Admin'); // User model

const userGuard = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
    req.user = decoded;

    // Check if the user is a registered user
    if (decoded.role === 'user') {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(403).json({ message: 'Access denied. User not found.' });
      }
    } else if (decoded.role === 'admin') {
      const admin = await Admin.findById(decoded.adminId);
      if (!admin) {
        return res.status(403).json({ message: 'Access denied. Admin not found.' });
      }
    } else {
      return res.status(403).json({ message: 'Access denied. Invalid role.' });
    }

    next(); // Proceed if user
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = userGuard;