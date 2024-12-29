const adminController=require('../controllers/AdminController');
const upload = require('../config/upload'); // Multer middleware
const express=require('express');
const adminValidation=require('../requests/adminRequest')
const router=express.Router();


router.get('/',adminController.index);
router.post('/',adminValidation,adminController.store);
router.put('/:id',adminController.update);
router.get('/:id',adminController.show);
router.delete('/:id',adminController.remove);

module.exports=router;
