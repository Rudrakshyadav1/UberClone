const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3
  },
  lastname: {
    type: String,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: String
});


// Generate JWT
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'1d'});
  return token;
};

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hash password
userSchema.method.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
