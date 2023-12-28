const express=require('express');
const userController = require('../controllers/users_controller');

const router = express.Router();

router.get('/',userController.Profile_page)

router.use('/auth', require('./auth'));
router.use('/user', require('./users'));


module.exports=router;