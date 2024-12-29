const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Admin model

const adminGuard = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
    req.admin = decoded;

    // Check if the admin is a registered admin
    const admin = await Admin.findById(req.admin.adminId); // Check if admin exists

    if (!admin) {
      return res.status(403).json({ message: 'Access denied. Admin not found.' });
    }

    next(); // Proceed if admin
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = adminGuard;