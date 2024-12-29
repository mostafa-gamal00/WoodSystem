
const express = require('express');
const router = express.Router();

const woodRoutes = require('./woodRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const authRouters = require('./auth/authRouters');
const roleRouters = require('./roles');
const AdminMiddleware = require('../middlewares/adminMiddleware');





//woods routs
router.use('/auth', authRouters);
router.use('/woods', woodRoutes);
// app.use(authMiddleware);
router.use('/admins', adminRoutes);
router.use('/users', AdminMiddleware, userRoutes);
router.use('/roles', roleRouters);

module.exports = router;
