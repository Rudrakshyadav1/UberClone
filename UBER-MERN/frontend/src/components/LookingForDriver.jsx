import React from 'react';

const LookingForDriver = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center mb-4 p-4">
        {/* <h3
          onClick={() => props.setVehiclePanel?.(false)}
          style={{ fontSize: '48px' }}
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h3> */}
        <h1 className="text-2xl font-semibold mt-2">Looking For Driver</h1>
        <img
          className="h-40 w-auto mt-4"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
          alt="UberX"
        />
      </div>

      <div>
        <div className="flex items-center gap-3 p-3 border-b-2 border-gray-100">
          <h3 style={{ fontSize: '30px' }}>
            <i className="ri-map-pin-fill"></i>
          </h3>
          <div>
            <h2>5611/A</h2>
            <p>Airport, Defense colony, Chandigarh</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border-b-2 border-gray-100">
          <h3 style={{ fontSize: '30px' }}>
            <i className="ri-map-pin-user-fill"></i>
          </h3>
          <div>
            <h2>5611/A</h2>
            <p>Airport, Defense colony, Chandigarh</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border-b-2 border-gray-100 mb-2">
          <h3 style={{ fontSize: '30px' }}>
            <i className="ri-money-rupee-circle-fill"></i>
          </h3>
          <div>
            <h2>₹193.02</h2>
            <p>Cash/UPI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
