import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCaptain = {
      firstname,
      lastname,
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity: parseInt(capacity, 10),
        vehicleType: vehicleType.toLowerCase(),
      },
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + '/captain/register',
        newCaptain
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }

      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
      setColor('');
      setPlate('');
      setCapacity('');
      setVehicleType('');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 p-7 flex flex-col">
      <div className="mb-3 pt-6">
        <img
          className="w-24"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1600px-Uber_logo_2018.svg.png"
          alt="Uber logo"
        />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 rounded">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-2">What's your Name?</h3>
            <div className="flex gap-3 mb-6">
              <input
                required
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 w-1/2"
              />
              <input
                required
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 w-1/2"
              />
            </div>

            <h3 className="text-xl font-semibold mb-2">Email Address</h3>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full"
            />

            <h3 className="text-xl font-semibold mb-2">Password</h3>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full"
            />

            <h3 className="text-xl font-semibold mb-2">Vehicle Details</h3>
            <input
              required
              placeholder="Color"
              minLength={3}
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full"
            />
            <input
              required
              placeholder="License Plate"
              value={plate}
              maxLength={10}
              onChange={(e) => setPlate(e.target.value)}
              type="text"
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full"
            />
            <input
              required
              placeholder="Capacity"
              min={1}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full"
            >
              <option disabled value="">Select Vehicle Type</option>
              <option value="car">car</option>
              <option value="motorcycle">motorcycle</option>
              <option value="auto">auto</option>
            </select>

            <button
              type="submit"
              className="bg-black mb-4 text-white text-base font-medium rounded px-4 py-2 w-full hover:bg-gray-800 transition"
            >
              Create Account
            </button>

            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/captain-login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and Terms of Service apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
