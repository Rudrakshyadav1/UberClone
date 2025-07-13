import React from 'react'

const RidePopup = ({ setRide, setConfirmRide, ride }) => {
  if (!ride || !ride.user) {
    return null; 
  }

  return (
    <div className="p-6 bg-white shadow-2xl rounded-2xl max-w-md w-full text-base">
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="font-bold text-lg text-gray-800">New Ride Available!</h1>
      </div>

      {/* Rider Info + Distance */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
            src="https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Rider"
          />
          <h2 className="font-semibold text-gray-700">
            {ride.user?.firstname} {ride.user?.lastname}
          </h2>
        </div>
        <div className="text-gray-600 font-medium text-lg">5 Km</div>
      </div>

      {/* Trip Details */}
      <div className="space-y-3 text-left text-gray-800">
        {/* Pickup */}
        <div className="flex items-start gap-3 border-b pb-3">
          <i className="ri-map-pin-fill text-2xl text-gray-500"></i>
          <div>
            <p className="font-medium">5611/A</p>
            <p className="text-gray-600 text-sm">{ride.pickup}</p>
          </div>
        </div>

        {/* Drop */}
        <div className="flex items-start gap-3 border-b pb-3">
          <i className="ri-map-pin-user-fill text-2xl text-gray-500"></i>
          <div>
            <p className="font-medium">5611/A</p>
            <p className="text-gray-600 text-sm">{ride.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3 border-b pb-3">
          <i className="ri-money-rupee-circle-fill text-2xl text-gray-500"></i>
          <div>
            <p className="font-medium">₹{Math.round(ride.fare)}</p>
            <p className="text-gray-600 text-sm">Cash / UPI</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={() => {
            setRide(false);
            setConfirmRide(true);
          }}
          className="bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => setRide(false)}
          className="bg-gray-200 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopup;
