import React, { useContext, useEffect, useRef, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
const CaptainRiding = () => {
    const captain=useContext(CaptainDataContext);
    const [panel, setPanel] = useState(false);
    const panelRef = useRef(null);
    const location = useLocation();
    const ride = location.state?.rideData;  
    useEffect(() => {
        if (ride) {
            gsap.to(panelRef.current, {
                transform: panel ? 'translateY(0%)' : 'translateY(100%)',
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }, [panel, ride]);  
    if (!ride) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                Loading ride details...
            </div>
        );
    }
    if (!ride.user) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                Error: User data is missing!
            </div>
        );
    }

    return (
        <div className="h-screen w-screen relative overflow-hidden">
            {/* Top Nav */}
            <div className="fixed top-0 w-full flex items-center justify-between px-4 py-3 z-20 bg-transparent">
                <img
                    className="w-20"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1600px-Uber_logo_2018.svg.png"
                    alt="uber logo"
                />
                <Link
                    to="/captain/logout"
                    className="text-2xl text-gray-600 hover:text-red-500 transition duration-200"
                >
                    <i className="ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Background Image */}
            <div className="h-full w-full">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="background"
                />
            </div>

            {/* Bottom Info Section */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-white px-6 py-5 shadow-2xl rounded-t-2xl">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-800 text-base font-medium">
                        <i className="ri-road-map-line text-xl text-green-600"></i>
                        <span>Distance Travelled: <strong>12.4 km</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-800 text-base font-medium">
                        <i className="ri-time-line text-xl text-yellow-600"></i>
                        <span>ETA: <strong>5 mins</strong></span>
                    </div>
                </div>
                <button
                    onClick={() => setPanel(!panel)}
                    className="w-full bg-black text-white py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-green-700 transition duration-200 flex items-center justify-center gap-2">
                    <i className="ri-check-double-line text-xl"></i>
                    Complete Ride
                </button>
            </div>

            {/* Slide Panel */}
            <div
                ref={panelRef}
                style={{ transform: 'translateY(100%)', height: '90vh' }}
                className="absolute bottom-0 left-0 right-0 z-40 bg-white px-6 py-5 shadow-2xl rounded-t-2xl"
            >
                <div className='flex justify-center'>
                    <i
                        onClick={() => setPanel(!panel)}
                        style={{ fontSize: '50px' }}
                        className="ri-arrow-down-wide-line text-4xl text-gray-600 "></i>
                </div>
                <div className="p-6 bg-white max-w-md w-full text-base">
                    {/* Title */}
                    <div className="text-center mb-4">
                        <h1 className="font-bold text-lg text-gray-800">Details</h1>
                    </div>

                    {/* Rider Info + Distance */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <img
                                className="w-16 h-16 rounded-full object-cover border border-gray-300"
                                src="https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0"
                                alt="Rider"
                            />
                            <h2 className="font-semibold text-gray-700">{ride.user.firstname} {ride.user.lastname}</h2>
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

                </div>
                <Link
                    to="/captain-home"
                    className="w-full block text-center bg-black text-white py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-900 transition duration-200"
                >
                    Finish Ride
                </Link>

            </div>
        </div>
    );
};

export default CaptainRiding;
