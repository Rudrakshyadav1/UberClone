const axios = require('axios');
const captainModel=require('../models/captain.model')
module.exports.getAddressCoordinate = async (address) => {
  if (!address) throw new Error('Address is required');
  const apiKey = process.env.GOOGLE_MAPS_API;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Geocoding failed: ${data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

module.exports.distanceTimeCalculator = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const encodedOrigin = encodeURIComponent(origin);
  const encodedDestination = encodeURIComponent(destination);

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const element = data.rows[0].elements[0];
      return {
        distance: element.distance.value,   
        duration: element.duration.value,  
      };
      
    } else {
      throw new Error(`Distance Matrix API failed: ${data.rows[0].elements[0].status}`);
    }
  } catch (error) {
    console.error('Error fetching distance and time:', error.message);
    throw error;
  }
};

module.exports.suggestions = async (input) => {
  if (!input) throw new Error('Input is required!!!');
  const encodedInput = encodeURIComponent(input);
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}&components=country:in`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== 'OK') {
      throw new Error(`Autocomplete API error: ${data.status}`);
    }
    return data.predictions;
  } catch (error) {
    console.error('Autocomplete API error:', error.message);
    throw error;
  }
};
module.exports.getCaptainRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radius / 3963.2]
      }
    }
  });
  return captains;
};
