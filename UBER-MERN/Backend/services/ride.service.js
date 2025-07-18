const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const captainModel =require('../models/captain.model')
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');
function getOtp(num){
  const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
  return otp;
}

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapService.distanceTimeCalculator(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinute = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const time = Number(distanceTime.duration);
  const distance = Number(distanceTime.distance);

  const fare = {
    auto: baseFare.auto + perMinute.auto * (time / 60) + perKmRate.auto * (distance / 1000),
    car: baseFare.car + perMinute.car * (time / 60) + perKmRate.car * (distance / 1000),
    motorcycle: baseFare.motorcycle + perMinute.motorcycle * (time / 60) + perKmRate.motorcycle * (distance / 1000),
  };

  return fare;
}

async function createRide({ user, pickup, destination, vehicleType }) {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required!');
  }

  const fare = await getFare(pickup, destination);
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare:fare[vehicleType],
  });

  return ride;
}
async function confirmRide({ rideId, captainId }) {
  if (!rideId || !captainId) {
    throw new Error('rideId and captainId are required!');
  }

  const captain = await captainModel.findByIdAndUpdate(
    captainId,
    { status: 'active' },
    { new: true }
  );

  if (!captain) {
    throw new Error('Captain not found!');
  }

  const ride = await rideModel.findById(rideId);
  if (!ride) {
    throw new Error('Ride not found!');
  }

  ride.status = 'accepted';
  ride.captain = captain._id;
  await ride.save();
  const updatedRide = await rideModel
    .findById(ride._id)
    .populate(['user', 'captain']);

  return updatedRide;
}
async function startRide({rideId}){
  const ride = await rideModel.findById(rideId).populate('user').populate('captain');
  if(!ride) throw new Error('Ride not found!');
  const updatedRide = await rideModel.findByIdAndUpdate(rideId, {status:'accepted'}, {new:true}).populate('user').populate('captain');
  sendMessageToSocketId(ride.user.socketId, {event:'start-ride', data:updatedRide});
  return updatedRide;
}
async function endRide({ rideId, captain }) {
  if (!rideId || !captain) throw new Error('Ride ID is required.');
  const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('user').populate('captain');
  if (!ride) {
    throw new Error('Ride not found.');
  }
  if(ride.status === "completed") {
    throw new Error('Ride has already ended.');
  }
  const updatedRide = await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status:"completed" },
    { new: true }
  ).populate('user').populate('captain');
  return updatedRide;
}
module.exports = {
  getFare,
  createRide,
  confirmRide,
  startRide,
  endRide
};
