const express = require('express');
const authenticationController  = require('../../controllers/Auth/AdminAuthenticationController');

const router = express.Router();

router.post('/login', authenticationController.login);

module.exports = router;
