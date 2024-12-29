const roleController=require('../controllers/RoleController');
const express=require('express');
const router=express.Router();


router.get('/',roleController.index);
router.post('/',roleController.store);
router.put('/:id',roleController.update);

module.exports=router;
