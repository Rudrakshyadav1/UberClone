import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Required import

const Riding = () => {
    return (
        <div className="h-screen flex flex-col relative">
            {/* Home Button */}
            <Link to='/home' className='fixed top-2 right-2 text-3xl rounded-2xl z-10 bg-white p-2 shadow-md'>
            <i class="ri-home-line"></i>
            </Link>
            {/* Top Half Image */}
            <div className="h-1/2 w-full">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="background"
                />
            </div>

            {/* Bottom Half Content */}
            <div className="h-1/2 w-full flex flex-col p-4 gap-4 bg-white">
                {/* Ride Info Header */}
                <div className="flex items-center justify-between">
                    <img
                        className="h-10 w-auto"
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
                        alt="UberX"
                    />
                    <div className="text-right">
                        <h2 className="text-lg font-medium">John Doe</h2>
                        <h4 className="font-semibold">MH40PO8907</h4>
                        <p className="text-sm text-gray-600">Kia Carnival</p>
                    </div>
                </div>

                {/* Locations & Fare */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                        <i className="ri-map-pin-user-fill text-2xl text-green-600"></i>
                        <div>
                            <h2 className="font-medium">5611/A</h2>
                            <p className="text-sm text-gray-600">Airport, Defense colony, Chandigarh</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                        <i className="ri-money-rupee-circle-fill text-2xl text-yellow-500"></i>
                        <div>
                            <h2 className="font-medium">₹193.02</h2>
                            <p className="text-sm text-gray-600">Cash/UPI</p>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button className='w-full text-xl font-semibold bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition'>
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Riding;
