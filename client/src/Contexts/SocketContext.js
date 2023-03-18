import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setsocket] = useState("socket details");
  return (
    <SocketContext.Provider value={[socket, setsocket]}>
      {props.children}
    </SocketContext.Provider>
  );
};
