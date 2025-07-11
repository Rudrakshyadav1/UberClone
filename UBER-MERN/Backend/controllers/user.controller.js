const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); 
const BlacklistToken= require('../models/blacklistToken.model');
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;
  const isUserExist =await userModel.findOne({email});
  if(isUserExist){
    return res.status(400).json({message:'User already exists'});
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save user in one step
  const user = await userModel.create({
     firstname,
     lastname ,
     email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({
    token,
    user,
  });
};
module.exports.loginUser=async(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password}=req.body;
  
  const user=  await userModel.findOne({email}).select('+password');
  if(!user){
    return res.status(401).json({message:"Invalid email or password"});
  }
  const isMatch=await user.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:"Invalid email or password"}); 
  }
  const token=user.generateAuthToken();
  res.cookie('token', token);
  res.status(200).json({token,user});
}
module.exports.getUserProfile = async (req, res, next) => {
  return res.status(200).json({ user: req.user }); 
};
module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || (req.headers && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access‼️" });
  }
  const isBlacklisted = await BlacklistToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized access‼️" });
  }
  await BlacklistToken.create({ token: token });
  res.clearCookie('token');
  return res.status(200).json({ message: "Logout successful" });   
};

