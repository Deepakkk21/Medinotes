const userController = require('../controllers/users_controller');
const medicineController = require('../controllers/medicine_controller'); 

const express=require('express');

const router = express.Router();


router.get('/profile/:id',userController.Profile_page)
router.post('/profile/:id',medicineController.medicineController)

module.exports=router;