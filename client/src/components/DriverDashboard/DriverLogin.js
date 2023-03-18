import React, { useContext, useState } from "react";
import Base from "../../pages/Base";
import LoginPageImg from "../../img/health-solution.svg";
import { DriverContext } from "../../Contexts/DriverContext";
import { SocketContext } from "../../Contexts/SocketContext";
import socketioclient from "socket.io-client/dist/socket.io";
import { API } from "../../config/backend";
import { useHistory } from "react-router";
import { getCurrentLocation } from "../../config/location";

const Login = () => {
  const [driver, setDriver] = useContext(DriverContext);
  const [socket, setsocket] = useContext(SocketContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [userDetails, setUserDetails] = useState({
    aadhar: "",
    password: "",
    plateNo: "",
  });
  const driverAfterLogin = {
    _id: "1",
    driverPhone: "9",
    plateNo: "xyz",
    driverName: name,
  };
  const { aadhar, password } = userDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("loggin");
    /**
     * TODO: After driver login
     * send the token to socket server
     * upon verification that it is indeed a driver
     * add him to on duty
     * ambulance
     */
    const s = socketioclient(API);
    setsocket(s);
    const location = getCurrentLocation((position) => {
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        speed: position.coords.speed,
      };
    });
    setDriver({
      details: driverAfterLogin,
      location: location,
    });
    console.log(driver);
    history.push("/driverdashboard");
  };

  return (
    <div>
      <Base>
        <div className="row p-4">
          <div className="col-md-5 col-sm-10 offset-md-1 p-4 bg-dark rounded ">
            <h1 className="mb-4 text-white ">
              Hope,
              <br /> you are all fine
            </h1>
            <form className="col-10 text-white" onSubmit={handleSubmit}>
              <input
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              {/* <div className="form-group">
                <label for="aadhar">aadhar card number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={aadhar}
                  pattern="^[0-9]{12}$"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, aadhar: e.target.value })
                  }
                  id="aadhar"
                  aria-describedby="aadharhelp"
                  placeholder="Enter 12 digit aadhar no"
                  required
                  autoComplete="true"
                  minLength="12"
                  maxLength="12"
                />
                <small id="aadharhelp" className="form-text text-muted">
                  We'll never share your details with anyone else.
                </small>
              </div>
              <div className="form-group my-3">
                <label for="plateNo">Ambulance Plate No</label>
                <input
                  type="password"
                  className="form-control"
                  value={userDetails.plateNo}
                  id="plateNo"
                  placeholder="Plate Number"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, plateNo: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />
              </div>

              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  remember me
                </label>
                </div> */}
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md col-sm-10 d-none d-md-flex justify-content-center align-items-center">
            <img src={LoginPageImg} alt="nice svg" />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Login;
