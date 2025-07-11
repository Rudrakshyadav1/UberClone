const express=require('express');
const captainMiddleware=require('../middlewares/auth.middlewares');
const router=express.Router(); 
const captainController=require('../controllers/captain.controller');
const {body} =require('express-validator');

router.post('/register',[
    body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').matches(/^[A-Z0-9]{1,10}$/).withMessage('Vehicle plate must be alphanumeric and up to 10 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
],
captainController.registerCaptain);
router.post('/login',[
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],captainController.loginCaptain);
router.get('/profile',captainMiddleware.authCaptain,captainController.getCaptainProfile);
router.get('/logout',captainMiddleware.authCaptain,captainController.logoutCaptain);
module.exports=router;
