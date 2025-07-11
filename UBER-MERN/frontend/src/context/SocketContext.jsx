import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`connected to the server`);
    });
    socket.on("disconnect", () => {
      console.log(`disconnected to the server`);
    });

  }, []);

  // const sendMessage = (eventname, message) => {
  //   socket.emit(eventname, message);
  // };

  // const receiveMessage = (eventname, callback) => {
  //   socket.on(eventname, callback);
  // };

  return (
    <SocketContext.Provider value={{socket }}>
      {children}
    </SocketContext.Provider>
  );
};

