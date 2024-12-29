
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/userMiddleware');

const authRouters = require('./auth/userAuthRouters');


router.use('/auth', authRouters);

router.get('/',authMiddleware, (req, res) => res.send());



module.exports = router;
