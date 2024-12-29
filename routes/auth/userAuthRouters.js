const express = require('express');
const authenticationController  = require('../../controllers/Auth/AuthenticationController');

const router = express.Router();

router.post('/login', authenticationController.login);

module.exports = router;
