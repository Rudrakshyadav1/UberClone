const express = require('express');

const router = express.Router();

const {body} = require('express-validator');

const userController=require('../controllers/user.controller');

const authMiddleware=require('../middlewares/auth.middlewares');

router.post('/register',[
  body('email').isEmail().withMessage('Invalid Email‼️'),
  body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 letters long‼️'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long‼️'),
],userController.registerUser
);
router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email‼️'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long‼️'),
],userController.loginUser
); 
router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);
module.exports = router;
