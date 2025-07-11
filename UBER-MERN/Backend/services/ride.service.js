const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

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

module.exports = {
  getFare,
  createRide
};
