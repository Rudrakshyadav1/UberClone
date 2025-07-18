const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
router.post(
  '/create',
  [
    authMiddleware.authUser,
    body('pickup')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Pickup location is required'),

    body('destination')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Destination is required'),

    body('vehicleType')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Vehicle type is required'),
  ],
  rideController.createRide
);
router.get('/get-fare',
  [
    query('pickup').isString().isLength({min:1}).withMessage(`pickup is required`),
    query('destination').isString().isLength({min:1}).withMessage(`destination is required`)
  ],
  authMiddleware.authUser,
  rideController.getFare
);
router.post('/confirm',
  [
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ID'),
    body('captainId').isMongoId().withMessage('Invalid ID')
  ],rideController.confirmRide);
router.get('/otp-confirmed',[
  query('rideId').isMongoId().withMessage('Invalid Id')
],authMiddleware.authCaptain,rideController.startRide
)
router.post('/finish',[
  body('rideId').isMongoId.withMessage('Invalid Id'),
  body('captainId').isMongoId.withMessage('Invalid Id'),
],authMiddleware.authCaptain,rideController.endride);
module.exports = router;
