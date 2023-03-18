import React, { useContext, useEffect, useState } from "react";
import { API } from "../../config/backend";
import { SocketContext } from "../../Contexts/SocketContext";
import { UserContext } from "../../Contexts/UserContext";
import socketioclient from "socket.io-client/dist/socket.io";

export default function UserDashboard() {
  const [user, setuser] = useContext(UserContext);
  // const [socket, setsocket] = useContext(SocketContext);
  const socket = socketioclient(API);
  const [ambulances, setambulances] = useState([]);
  useEffect(() => {
    socket.on("driversLocation", (res) => {
      // setambulances(ambulances);
      console.log(res.ambulances);
    });
  }, [ambulances]);
  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
}
