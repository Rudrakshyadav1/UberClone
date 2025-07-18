import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainConfirm = ({ setConfirmRide, rideData }) => {
  const navigate = useNavigate();
  if (!rideData || !rideData.otp || !setConfirmRide) return null;

  const correctOtp = rideData.otp;
  const verificationArray = correctOtp.split('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      if (val && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleStartRide = async () => {
    const isOtpCorrect = otp.every((digit, i) => digit === verificationArray[i]);
    if (isOtpCorrect) {
      setConfirmRide(true);
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/otp-confirmed`, {
          params: { rideId: rideData._id },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        navigate('/captain-riding', { state: { rideData } });

      } catch (err) {
        console.error('Error confirming OTP:', err);
      }
    } else {
      alert('Wrong OTP!');
      setOtp(['', '', '', '', '', '']);
    }
  };

  return (
    <div className="p-6 bg-white shadow-2xl rounded-2xl max-w-md w-full text-base h-screen">
      <div className="text-center mb-4">
        <h1 className="font-bold text-lg text-gray-800">New Ride Available!</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
            src="https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Rider"
          />
          <h2 className="font-semibold text-gray-700">{rideData.user?.firstname || 'Rider'}</h2>
        </div>
        <div className="text-gray-600 font-medium text-lg">5 Km</div>
      </div>

      <div className="space-y-3 text-left text-gray-800">
        <div className="flex items-start gap-3 border-b pb-3">
          <i className="ri-map-pin-fill text-2xl text-gray-500"></i>
          <div>
            <p className="font-medium">{rideData.pickup}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 border-b pb-3">
          <i className="ri-map-pin-user-fill text-2xl text-gray-500"></i>
          <div>
            <p className="font-medium">{rideData.destination}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 border-b pb-3">
          <i className="ri-money-rupee-circle-fill text-2xl text-gray-500"></i>
          <div>
            <p className="font-medium">₹{rideData.fare}</p>
            <p className="text-gray-600 text-sm">Cash / UPI</p>
          </div>
        </div>
      </div>

      <h1 className="mt-6 text-center font-semibold text-lg">Please Enter OTP:</h1>
      <div className="w-full flex justify-evenly gap-2 max-w-sm mx-auto mt-4">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, i)}
            className="bg-gray-200 w-12 h-12 text-center text-xl font-semibold rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <button
          onClick={handleStartRide}
          
          className="bg-black text-center text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Start Ride
        </button>
        <button
          onClick={() => setConfirmRide(false)}
          className="bg-gray-200 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CaptainConfirm;
