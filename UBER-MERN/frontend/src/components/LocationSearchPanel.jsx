import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationSearchPanel = ({
  pickup,
  destination,
  activeFeild,
  setPickup,
  setDestination,
  setPanel,
  setVehiclePanel,
  getFare
}) => {
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`;

      try {
        const pickupRes = await axios.get(url, {
          params: { input: pickup },
          headers: { Authorization: `Bearer ${token}` },
        });
        setPickupSuggestions(pickupRes.data || []);
      } catch (err) {
        console.error('Pickup error:', err);
      }

      try {
        const destRes = await axios.get(url, {
          params: { input: destination },
          headers: { Authorization: `Bearer ${token}` },
        });
        setDestinationSuggestions(destRes.data || []);
      } catch (err) {
        console.error('Destination error:', err);
      }
    };

    fetchSuggestions();
  }, [pickup, destination]);

  const activeSuggestions = activeFeild ? pickupSuggestions : destinationSuggestions;

  return (
    <div>
      {activeSuggestions.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            const selected = location.description || location;
            if (activeFeild) {
              setPickup(selected);
            } else {
              setDestination(selected);
            }

            if (pickup && destination) {
              getFare(); 
              setPanel(false);
              setVehiclePanel(true);
            }
          }}
          className="flex gap-2 active:border-2 p-3 my-4 items-center justify-start rounded-xl cursor-pointer hover:bg-gray-100"
        >
          <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location.description || location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
