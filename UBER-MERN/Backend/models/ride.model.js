const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'captain'
  },
  pickup: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true,
    min: [0, 'Fare must be greater than 0']
  },
  otp:{
    type:String,
    selected:0,
    required:1
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'canceled'],
    default: 'pending'
  },
  duration: {
    type: Number
  },
  distance: {
    type: Number
  },
  paymentId: {
    type: String
  },
  orderId: {
    type: String
  },
  signature: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ride', rideSchema);
