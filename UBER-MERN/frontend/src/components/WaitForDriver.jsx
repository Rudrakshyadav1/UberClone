import React from 'react';

const WaitForDriver = ({ setWait, rideDetails }) => {
  if (!rideDetails?.captain?._id){
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Waiting for driver details...
      </div>
    );
  }
  const captain = rideDetails.captain;

  return (
    <div className="flex flex-col bg-white h-full px-6 py-8">
      {/* Driver Info */}
      <div className="flex items-center gap-5 mb-8">
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
          alt="Vehicle"
          className="h-14 w-14 object-contain"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-black">{`${captain.firstname} ${captain.lastname}`}</h2>
          <p className="text-base text-gray-600">{captain.vehicle.model || 'Vehicle'}</p>
        </div>
        <span className="text-base font-semibold text-black bg-gray-100 px-4 py-2 rounded-lg">
          {captain.vehicle.plate}
        </span>
      </div>

      {/* Ride Info */}
      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <i className="ri-map-pin-line text-2xl text-black mt-1"></i>
          <div>
            <h4 className="text-base font-semibold text-black">Pickup</h4>
            <p className="text-sm text-gray-600">{rideDetails.pickup}</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <i className="ri-navigation-line text-2xl text-black mt-1 rotate-45"></i>
          <div>
            <h4 className="text-base font-semibold text-black">Destination</h4>
            <p className="text-sm text-gray-600">{rideDetails.destination}</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <i className="ri-wallet-3-line text-2xl text-black mt-1"></i>
          <div>
            <h4 className="text-base font-semibold text-black">₹{rideDetails.fare}</h4>
            <p className="text-sm text-gray-600">Cash / UPI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitForDriver;
