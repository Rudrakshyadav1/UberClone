import React, { useState, useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import Vehicle from '../components/Vehicle';
import ConfirmedVehicle from '../components/ConfirmedVehicle';
import WaitForDriver from '../components/WaitForDriver';
import LookingForDriver from '../components/LookingForDriver';
import axios from 'axios'; 
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panel, setPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [wait, setWait] = useState(false);
  const [activeFeild, setActiveFeild] = useState(true);
  const [fare, setFare] = useState({});
  const [vehicleType, setvehicleType] = useState(null);
  const [rideDetails,setRideDetails]=useState(null);

  const panelRef = useRef(null);
  const vehicleRef = useRef(null);
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit('join', { userId: user.user._id, userType: "user" });
  
    const handleRideConfirmed = (response) => {
      if (response) {
        console.log('🚕 Ride confirmed:', response);
        setRideDetails(response);
        setWait(true);
        setVehiclePanel(false);
        setVehicleFound(false);
        setConfirm(false);
        setPanel(false);
      }
      else {
        console.warn('ride-confirmed event received without expected data:', response);
      }
    };
    socket.on('ride-confirmed', handleRideConfirmed);
    return () => {
      socket.off('ride-confirmed', handleRideConfirmed);
    };
  }, [socket, user]);
  

  useEffect(() => {
    gsap.to(panelRef.current, {
      height: panel ? '70vh' : '0vh',
      autoAlpha: panel ? 1 : 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [panel]);

  useEffect(() => {
    gsap.to(vehicleRef.current, {
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [vehiclePanel]);

  useEffect(() => {
    gsap.to(confirmRideRef.current, {
      transform: confirm ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [confirm]);

  useEffect(() => {
    gsap.to(lookingForDriverRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [vehicleFound]);

  useEffect(() => {
    gsap.to(waitingForDriverRef.current, {
      height: wait ? '70vh' : '0vh',
      autoAlpha: wait ? 1 : 0,
      transform: wait ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [wait]);

  const getFare = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFare(response.data);
    } catch (error) {
      console.error('Error fetching fare:', error);
    }
  };

  const createRide = async (vehicleType) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
        pickup,
        destination,
        vehicleType,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandle = (e) => e.preventDefault();

  return (
    <div className="relative h-screen w-screen flex flex-col overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1600px-Uber_logo_2018.svg.png"
        alt="uber logo"
      />
      <img
        className="h-full w-full object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt="background"
      />

      <div className="absolute bottom-0 w-full">
        <div className="bg-white w-full rounded-t-2xl p-5 relative flex flex-col" style={{ height: '30vh' }}>
          <div className="flex justify-between items-center">
            <h4 className="text-3xl font-semibold mb-4">Find a Trip</h4>
            <h5
              onClick={() => setPanel(false)}
              className="cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <i className="ri-arrow-down-wide-line text-xl" />
            </h5>
          </div>
          <form onSubmit={submitHandle}>
            <input
              onClick={() => {
                setPanel(true);
                setActiveFeild(true);
              }}
              className="bg-[#eee] px-4 py-3 text-lg rounded-lg w-full mb-3"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              type="text"
              placeholder="Add a pick up location"
            />
            <input
              onClick={() => {
                setPanel(true);
                setActiveFeild(false);
              }}
              className="bg-[#eee] px-4 py-3 text-lg rounded-lg w-full"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div
          ref={panelRef}
          className="bg-white w-full p-5 overflow-hidden relative"
          style={{ height: 0, opacity: 0 }}
        >
          <LocationSearchPanel
            pickup={pickup}
            destination={destination}
            activeFeild={activeFeild}
            setPickup={setPickup}
            setDestination={setDestination}
            setPanel={setPanel}
            setVehiclePanel={setVehiclePanel}
            getFare={getFare}
          />
        </div>
      </div>

      {/* Other Panels */}
      <div ref={vehicleRef} className="fixed z-10 bottom-0 left-0 w-full p-1.5 bg-white shadow-md" style={{ transform: 'translateY(100%)' }}>
        <Vehicle setVehiclePanel={setVehiclePanel} setConfirm={setConfirm} fare={fare} setvehicleType={setvehicleType} />
      </div>

      <div ref={confirmRideRef} className="fixed z-10 bottom-0 left-0 w-full p-1.5 bg-white shadow-md" style={{ transform: 'translateY(100%)' }}>
        <ConfirmedVehicle setVehicleFound={setVehicleFound} setConfirm={setConfirm} createRide={createRide} vehicleType={vehicleType} />
      </div>

      <div ref={lookingForDriverRef} className="fixed z-10 bottom-0 left-0 w-full p-1.5 bg-white shadow-md" style={{ transform: 'translateY(100%)' }}>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 left-0 w-full p-1.5 bg-white shadow-md" style={{ height: '0vh', transform: 'translateY(100%)' }}>
        <WaitForDriver setWait={setWait} rideDetails={rideDetails} />
      </div>
    </div>
  );
};

export default Home;
