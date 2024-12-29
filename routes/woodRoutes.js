const express = require('express');
const woodController  = require('../controllers/WoodController');
const woodValidation=require('../requests/woodRequest')

const router = express.Router();

router.get('/', woodController.index);
router.post('/', woodValidation,woodController.store);

module.exports = router;
