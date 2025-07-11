const mapService = require('../services/maps.service');
const { validationResult, query } = require('express-validator');
module.exports.getDistanceTime= async(req,res,next)=>{
    const {origin,destination}=req.query;
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    try{
        const distanceTime=await mapService.distanceTimeCalculator(origin,destination);
        res.status(200).json(distanceTime);
    }
    catch(error){
        res.status(404).json({ message: 'Distance Time not Found' });
    }

}
module.exports.getCoordinate = async (req, res, next) => {
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinate Not Found' });
    }
};
module.exports.getSuggestions=async(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
    }
    const {input}=req.query;
    if(!input) throw new Error('Input required');
    try{
        const suggest = await mapService.suggestions(input);
        res.status(200).json(suggest);
    }catch(error){
        res.status(404).json({ message: 'No suggestions' });
    }
}
