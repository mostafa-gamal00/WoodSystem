const express = require('express');
const woodController  = require('../controllers/WoodController');

const router = express.Router();

router.get('/', woodController.index);
router.post('/', woodController.store);

module.exports = router;
