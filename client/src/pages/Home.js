import React, { useState } from "react";
import Base from "./Base";
import Map from "../components/Map";
import { API } from "../config/backend";
import socketioclient from "socket.io-client/dist/socket.io";

const Home = () => {
  // states
  const [lng, setLng] = useState(80.9462);
  const [lat, setLat] = useState(26.8467);
  const [zoom, setZoom] = useState(16);
  const socket = socketioclient(API);

  //functions

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 30000,
  };

  //when user allow location access
  const success = (pos) => {
    //user location
    const { latitude, longitude } = pos.coords;
    console.log("COORDS", latitude, longitude);

    //update the map with new coords
    setLng(longitude);
    setLat(latitude);
  };

  //if location permission denied or some other error
  const errors = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("please allow location");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred. try again");
        break;
      default:
        alert("some problem occured try again");
    }
  };

  //asking user for location permissions
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      //   this will show popup to allow location
      navigator.geolocation.getCurrentPosition(success, errors, options);
    } else
      alert("you browser does not support location try with different browser");
  };

  return (
    <div>
      <Base title="Home">
        <div style={{ position: "relative", height: "90vh" }}>
          {/* map dislay component */}
          <Map
            lng={lng}
            setLng={setLng}
            lat={lat}
            setLat={setLat}
            zoom={zoom}
            setZoom={setZoom}
            socket={socket}
          />
          {/* map component end */}

          <div className="">
            {/* form start */}
            <form
              className="col-sm-10 col-md-6 col-xl-4 bg-dark p-4 rounded"
              style={{
                position: "absolute",
                top: "50%",
                left: "5%",
                transform: "translateY(-50%)",
              }}
            >
              <h1 className="text-capitalize text-white h1">
                request a <br /> ambulance
              </h1>
              <div className="form-group my-4">
                <div className="row">
                  <div className="col-11">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="enter pickup location"
                    />
                  </div>
                  {/* btn to get current location */}
                  <span
                    title="use current location"
                    className="col-1 text-white bg-primary text-center d-flex justify-content-center align-items-center"
                    onClick={getCurrentLocation}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </span>
                </div>
                {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
              </div>

              <button type="submit" className="btn bg-primary w-100 ">
                get a ambulance now
              </button>
            </form>
            {/* form end */}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Home;
