import React, { useEffect, useRef, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const mapRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
    if (currentPosition) {
      map.panTo(currentPosition);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('📍 Location:', latitude, longitude);
        const newPos = { lat: latitude, lng: longitude };
        setCurrentPosition(newPos);
        if (mapRef.current) {
          mapRef.current.panTo(newPos);
        }
      },
      (error) => {
        console.error('❌ Geolocation error:', error);
        alert(`Location error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  if (!apiKey) {
    return <h1 className="text-red-600 text-2xl">NOT FOUND VALID API KEY</h1>;
  }

  if (!currentPosition) {
    return <h1 className="text-gray-600 text-xl text-center mt-10">Getting your location...</h1>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={onLoad}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
