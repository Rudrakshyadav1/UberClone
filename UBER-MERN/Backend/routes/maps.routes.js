const express=require('express');
const router =express.Router();
const mapController=require('../controllers/maps.controller');
const authMiddleware=require('../middlewares/auth.middlewares');
const {query}=require('express-validator');
router.get('/get-coordinates',
    query('address').isString().isLength({min:1}),
    authMiddleware.authUser,mapController.getCoordinate);
router.get('/get-distance-time',
    query('origin').isString().isLength({min:1}),
    query('destination').isString().isLength({min:1}),
    authMiddleware.authUser,mapController.getDistanceTime
);
router.get('/get-suggestions',
    query('input').isString().isLength({min:1}),
    authMiddleware.authUser,mapController.getSuggestions

)
module.exports=router;