import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { getCurrentLocation } from "../../config/location";
import { DriverContext } from "../../Contexts/DriverContext";
import { SocketContext } from "../../Contexts/SocketContext";

export default function DriverDashboard() {
  const [driver, setDriver] = useContext(DriverContext);
  const [socket, setsocket] = useContext(SocketContext);
  const history = useHistory();
  useEffect(() => {
    socket.emit("addAmbulance", driver.details, (error) => {
      if (error) {
        console.log(error);
      }
    });
    console.log(driver);
  }, []);
  setInterval(() => {
    getCurrentLocation((position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        speed: position.coords.speed,
      };
      socket.emit("sendLocation", location, () => {});
    });
  }, 5000);
  return (
    <div>
      <h1>Driver Name: {driver.details.driverName}</h1>
      <h1>Driver Phone: {driver.details.driverPhone}</h1>
      <h1>Ambulance Plate Number: {driver.details.plateNo}</h1>
    </div>
  );
}
