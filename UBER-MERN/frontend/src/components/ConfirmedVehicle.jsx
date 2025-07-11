import React from 'react';

const ConfirmedVehicle = ({ setConfirm, setVehicleFound,vehicleType,createRide }) => {
    return (
        <div className="p-4">
            {/* Close Button */}
            <div >
                <h3
                    onClick={() => setConfirm(false)}
                    style={{ fontSize: '48px' }}>
                    <i className="ri-arrow-down-wide-line w-full flex justify-center "></i>
                </h3>
                
            </div>

            {/* Vehicle Image */}
            <div className="flex justify-center mb-6">
                <img
                    className="h-40 w-auto"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
                    alt="UberX"
                />
            </div>

            {/* Trip Details */}
            <div>
                {/* Pickup Location */}
                <div className="flex items-start gap-3 p-3 border-b border-gray-200">
                    <div className="text-2xl text-gray-600">
                        <i className="ri-map-pin-fill"></i>
                    </div>
                    <div>
                        <h2 className="font-semibold">5611/A</h2>
                        <p>Airport, Defense Colony, Chandigarh</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-3 p-3 border-b border-gray-200">
                    <div className="text-2xl text-gray-600">
                        <i className="ri-map-pin-user-fill"></i>
                    </div>
                    <div>
                        <h2 className="font-semibold">5611/A</h2>
                        <p>Airport, Defense Colony, Chandigarh</p>
                    </div>
                </div>

                {/* Fare Info */}
                <div className="flex items-start gap-3 p-3 border-b border-gray-200 mb-4">
                    <div className="text-2xl text-gray-600">
                        <i className="ri-money-rupee-circle-fill"></i>
                    </div>
                    <div>
                        <h2 className="font-semibold">₹193.02</h2>
                        <p>Cash/UPI</p>
                    </div>
                </div>
            </div>

            {/* Confirm Button */}
            <button
                onClick={() => {
                    setVehicleFound(true);
                    createRide(vehicleType);
                }
                }
                className="text-white bg-black px-10 py-3 w-full rounded-lg font-semibold text-xl"
            >
                Confirm
            </button>
        </div>
    );
};

export default ConfirmedVehicle;
