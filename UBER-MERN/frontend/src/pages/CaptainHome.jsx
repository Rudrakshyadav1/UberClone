import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import CaptainDetails from '../components/CaptainDetails';
import RidePopup from '../components/RidePopup';
import CaptainConfirm from '../components/CaptainConfirm';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {
    const [rideData, setRideData] = useState(null);
    const [rideVisible, setRideVisible] = useState(false);
    const [confirmRide, setConfirmRide] = useState(false);
    const rideRef = useRef(null);
    const confirmRef = useRef(null);
    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);
    useEffect(() => {
        socket.emit('join', {
            userType: "captain",
            userId: captain.captain._id
        });
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain.captain._id,
                        location: {
                            type: 'Point',
                            coordinates: [position.coords.longitude,position.coords.latitude], // e.g., [76.72, 30.81]
                          }
                          
                    });
                });
            }
        };
        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();
        return () => clearInterval(locationInterval);
    }, [captain]);
    useEffect(() => {
        const handleNewRide = (data) => {
            console.log('New ride received:', data);
            setRideData(data);
            setRideVisible(true);
        };
        socket.on('new-ride', handleNewRide);
        return () => {
            socket.off('new-ride', handleNewRide);
        };
    }, [socket]);
    useEffect(() => {
        gsap.to(rideRef.current, {
            transform: rideVisible ? 'translateY(0%)' : 'translateY(100%)',
            duration: 0.5,
            ease: 'power2.out',
        });
    }, [rideVisible]);

    useEffect(() => {
        gsap.to(confirmRef.current, {
            transform: confirmRide ? 'translateY(0%)' : 'translateY(100%)',
            duration: 0.5,
            ease: 'power2.out',
        });
    }, [confirmRide]);

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Top Navbar */}
            <div className="fixed top-0 w-full flex items-center justify-between px-4 py-3 z-20">
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

            <div className="h-full w-full">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="background"
                />
            </div>

            <div><CaptainDetails/></div>

            <div>
                <div
                    ref={rideRef}
                    className="fixed z-30 bottom-0 left-0 w-full p-1.5 bg-white shadow-md box-border"
                    style={{ transform: 'translateY(100%)' }}
                >
                    <RidePopup
                        setRide={setRideVisible}
                        setConfirmRide={setConfirmRide}
                        ride={rideData}
                    />
                </div>
                <div
                    ref={confirmRef}
                    className="fixed z-30 bottom-0 left-0 w-full p-1.5 bg-white shadow-md box-border"
                    style={{ transform: 'translateY(100%)' }}
                >
                    <CaptainConfirm setConfirmRide={setConfirmRide} />
                </div>
            </div>
        </div>
    );
};

export default CaptainHome;
