const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const blacklistTokenModel = require('../models/blacklistToken.model');
const { cookie } = require('express-validator');
module.exports.authUser = async (req, res, next) => {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access‼️" }); 
    }
    const isBlacklisted=await blacklistTokenModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized access‼️"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await userModel.findById(decoded._id);
        if (!foundUser) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = foundUser;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access‼️" }); 
    }
};

module.exports.authCaptain = async (req, res, next) => {
    try {
      let token;
  
      if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }
      else if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      }
      if (!token) {
        return res.status(401).json({ message: "Unauthorized access‼️" });
      }
  
      const isBlacklisted = await blacklistTokenModel.findOne({ token });
      if (isBlacklisted) {
        return res.status(401).json({ message: "Token has been blacklisted ‼️" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const foundCaptain = await captainModel.findById(decoded._id);
  
      if (!foundCaptain) {
        return res.status(401).json({ message: "Captain not found ‼️" });
      }
      req.captain = foundCaptain;
      next();
    } catch (err) {
      console.error("JWT Auth Error:", err.message);
      return res.status(401).json({ message: "Unauthorized access‼️" });
    }
  };
  

