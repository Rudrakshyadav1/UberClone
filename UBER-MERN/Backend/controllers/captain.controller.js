const captainModel=require('../models/captain.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');
module.exports.registerCaptain= async (req,res,next)=>{
    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({errors:error.array()});
    }
    const { firstname, lastname, email, password, vehicle } = req.body;
    const isCaptainExist =await captainModel.findOne({email});
    if(isCaptainExist){
        return res.status(400).json({message:'Captain already exists'});
    }
    const hashedPassword =  await bcrypt.hash(password, 10);;
    const captain= await captainService.createCaptain({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = await captain.generateAuthToken();
    res.status(201).json({
        token,
        captain
    });
};

module.exports.loginCaptain=async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({errors:error.array()});
    }
    const {email,password}=req.body;
    const captain= await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const isMatch= await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"}); 
    }
    const token=captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}
module.exports.getCaptainProfile = async (req, res, next) => {
    return res.status(200).json({ captain: req.captain });
}
module.exports.logoutCaptain= async (req,res,next)=>{
    const token = req.cookies.token || (req.headers && req.headers.authorization.split(' ')[1]);
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    return res.status(200).json({ message: "Logout successful" });
  }
