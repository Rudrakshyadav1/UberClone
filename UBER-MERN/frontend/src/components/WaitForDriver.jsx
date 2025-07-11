import React from 'react'

const WaitForDriver = ({setWait}) => {
  return (
    <div>
      <div className="flex flex-col items-center mb-4 p-4">
        <h3
          onClick={() =>setWait(false)} 
          style={{ fontSize: '48px' }}
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h3>
      </div>
      <div>
      <img
          className="h-10 w-auto"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
          alt="UberX"
        />
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-medium'>John Doe</h2> 
          <h4 className='font-semibold'>MH40PO8907</h4>
          <p className='text-sm text-gray-600'>Kia Carnival</p>
        </div>
      </div>
      <div>
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
                        <i className="ri-map-pin-fill text-2xl text-blue-500"></i>
                        <div>
                            <h2 className="font-medium">5611/A</h2>
                            <p className="text-sm text-gray-600">Airport, Defense colony, Chandigarh</p>
                        </div>
                    </div>

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
                </div>
            </div>
      </div>
    </div>
  )
}

export default WaitForDriver
