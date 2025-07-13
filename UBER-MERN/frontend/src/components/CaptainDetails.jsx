import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
const CaptainDetails = () => {
    const{captain}=useContext(CaptainDataContext);
    return (
        <div className="h-1/2 w-full bg-white p-6 rounded-t-3xl shadow-lg -mt-8 z-10">
            {/* Captain Info */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <img
                        className="w-14 h-14 rounded-full object-cover border border-gray-300"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Captain"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{captain.captain.firstname+" "+captain.captain.lastname}</h2>
                        <p className="text-sm text-gray-500">Captain</p>
                    </div>
                </div>
                <div className="text-right">
                    <h4 className="text-2xl font-bold text-green-600">₹2000.98</h4>
                    <p className="text-sm text-gray-500">Earned</p>
                </div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <i className="ri-time-line text-2xl text-indigo-500"></i>
                    <h5 className="text-xl font-semibold mt-2">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <i className="ri-speed-up-line text-2xl text-yellow-500"></i>
                    <h5 className="text-xl font-semibold mt-2">24</h5>
                    <p className="text-sm text-gray-600">Trips Completed</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <i className="ri-wallet-2-line text-2xl text-green-500"></i>
                    <h5 className="text-xl font-semibold mt-2">₹850</h5>
                    <p className="text-sm text-gray-600">Today's Earnings</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
