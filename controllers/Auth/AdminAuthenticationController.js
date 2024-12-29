const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Authentication failed email' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const payload = {
            adminId: admin._id,
            email: admin.email,
            role: 'admin',
          };
      
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN, // Set the token expiration time
          });
        
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: `Login failed ${error.message}`  });
    }
}

module.exports={login}
