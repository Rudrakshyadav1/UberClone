import React, { useState, createContext } from 'react';

export const CaptainDataContext = createContext();

export const CaptainDataProvider = ({ children }) => {
  const [captain, setCaptain] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    color:'',
    plate:'',
    capacity:'',
    vehicleType:'',
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

