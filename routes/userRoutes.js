const userController=require('../controllers/UserController');
const express=require('express');

const router=express.Router();

router.get('/',userController.index);
router.post('/',userController.store);
router.put('/:id',userController.update);
router.get('/:id',userController.show);
router.delete('/:id',userController.remove);

module.exports=router;
