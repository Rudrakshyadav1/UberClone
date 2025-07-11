import React, { useState, createContext } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

