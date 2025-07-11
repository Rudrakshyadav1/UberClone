import React from 'react';

const Vehicle = ({ fare, setVehiclePanel, setConfirm, setvehicleType}) => {
  const fareCar = Math.round(Number(fare.car) || 1e9);
  const fareAuto = Math.round(Number(fare.auto) || 1e9);
  const fareMoto = Math.round(Number(fare.motorcycle) || 1e9);

  return (
    <div>
      <div>
        <h3 onClick={() => setVehiclePanel(false)} style={{ fontSize: '48px' }}>
          <i className="ri-arrow-down-wide-line w-full flex justify-center" />
        </h3>
        <h3 className="text-black font-semibold text-2xl mb-5 mt-0">Choose a Vehicle:</h3>
      </div>

      {/* Car */}
      <div
        onClick={() => {
          setConfirm(true);
          setvehicleType("car");
        }}
        className="flex items-center justify-between border-3 rounded-xl active:border-black border-gray-100 mb-3"
      >
        <img className="h-16 w-auto" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="Car" />
        <div className="flex flex-col flex-grow px-4">
          <h4 className="text-lg font-semibold flex items-center gap-1">
            UberGo <span><i className="ri-user-4-fill text-sm"></i> 4</span>
          </h4>
          <h5 className="text-gray-500 text-sm">2 mins away</h5>
          <p className="text-gray-400 text-sm">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-bold whitespace-nowrap mr-2">₹{fareCar}</h2>
      </div>

      {/* Auto */}
      <div
        onClick={() => {
          setConfirm(true);
          setvehicleType("auto");
        }}
        className="flex items-center justify-between border-3 mb-3 active:border-black border-gray-100 rounded-xl"
      >
        <img className="h-16 w-auto" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Auto" />
        <div className="flex flex-col flex-grow px-4">
          <h4 className="text-lg font-semibold flex items-center gap-1">
            UberAuto <span><i className="ri-user-4-fill text-sm"></i> 3</span>
          </h4>
          <h5 className="text-gray-500 text-sm">3 mins away</h5>
          <p className="text-gray-400 text-sm">Quick 3-wheeler rides</p>
        </div>
        <h2 className="text-xl font-bold whitespace-nowrap mr-2">₹{fareAuto}</h2>
      </div>

      {/* Motorcycle */}
      <div
        onClick={() => {
          setConfirm(true);
          setvehicleType("motorcycle");
        }}
        className="flex items-center justify-between border-3 mb-3 active:border-black border-gray-100 rounded-xl"
      >
        <img className="h-16 w-auto" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Motorcycle" />
        <div className="flex flex-col flex-grow px-4">
          <h4 className="text-lg font-semibold flex items-center gap-1">
            UberMoto <span><i className="ri-user-4-fill text-sm"></i> 1</span>
          </h4>
          <h5 className="text-gray-500 text-sm">1 min away</h5>
          <p className="text-gray-400 text-sm">Fast & budget-friendly bike rides</p>
        </div>
        <h2 className="text-xl font-bold whitespace-nowrap mr-2">₹{fareMoto}</h2>
      </div>
    </div>
  );
};

export default Vehicle;
