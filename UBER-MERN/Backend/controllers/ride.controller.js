const { validationResult } = require('express-validator'); 
const rideService = require('../services/ride.service');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user,
      pickup,
      destination,
      vehicleType,
    });

    const { lat, lng } = await mapService.getAddressCoordinate(pickup);
    console.log({ lat, lng });

    const radiusInKm = 5;
    const nearbyCaptains = await mapService.getCaptainRadius(lat, lng, radiusInKm);
    const userRide = await rideModel.findById(ride._id).populate('user');

    nearbyCaptains.forEach(captain => {
      if (captain.socketId) {
        sendMessageToSocketId(captain.socketId, {
          event: 'new-ride',
          data: {
            ...userRide.toObject(),
          },
        });
      }
    });

    res.status(200).json(ride);

  } catch (err) {
    console.error('Ride creation error:', err.stack || err.message);
    res.status(400).json({ errors: [err.message] });
  }
};

module.exports.getFare = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ errors: [err.message || 'Internal server error'] });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId ,captainId } = req.body; 
  try {
    const ride = await rideService.confirmRide({ rideId,captainId }); 
    if (ride?.user?.socketId) {
      console.log({
        socket:ride.user.socketId,
        event: 'ride-confirmed',
        data: ride
      });
      sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-confirmed',
        data: ride
      });
    }
    return res.status(200).json(ride);
  } catch (err) {
    console.error('Confirm ride error:', err.stack || err.message);
    return res.status(500).json({ errors: [err.message || 'Internal Server Error'] }); 
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { rideId } = req.query;
  if (!rideId ) return res.status(400).json({ error: 'rideId and otp are required' });
  try {
    const ride = await rideService.startRide({ rideId });
    return res.status(200).json({ ride });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports.endride = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(json({erros:errors.array()})); 
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });
    if (ride?.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: ride,
      });
    }

    return res.status(200).json(ride);
  } catch (error) {
    console.error('Error ending ride:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
