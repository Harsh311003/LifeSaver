import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { registerUser } from "../apiCalls/auth";
import SignUpStep1 from "../components/SignUp/SignUpStep1";
import SignUpStep2 from "../components/SignUp/SignUpStep2";
import SignUpStep3 from "../components/SignUp/SignUpStep3";
import Base from "./Base";
import LoginPageImg1 from "../img/signup1.svg";
import LoginPageImg2 from "../img/signup2.svg";
import LoginPageImg3 from "../img/signup3.svg";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    adhaar: "",
    dob: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  //when all the step are completed
  const finalSubmit = () => {
    setLoading(true);
    //calling register user api
    return registerUser(userDetails)
      .then((res) => {
        //if successfully created user
        if (res.success) {
          setLoading(false);
          setSuccess(true);
          console.log("user created Successfully");
        }
        //if some error occured
        else {
          setErr(res.error);
          setLoading(false);
        }
      })
      .catch((err) => console.log("FAILED", err));
  };

  //handling inputs of all substeps
  const handleChange = (name) => (event) => {
    setUserDetails({ ...userDetails, [name]: event.target.value });
  };

  //this fuction return which image to show at which step
  const getActiveImg = () => {
    switch (activeStep) {
      case 0:
        return LoginPageImg1;
      case 1:
        return LoginPageImg2;
      case 2:
        return LoginPageImg3;
      default:
        return LoginPageImg1;
    }
  };

  return (
    <div>
      <Base>
        <div className="row p-4">
          <div className="col-md-5 col-sm-10 offset-md-1 p-4 bg-dark rounded ">
            {success && <Redirect to="/login" />}
            {activeStep === 0 ? (
              <SignUpStep1
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                userDetails={userDetails}
                handleChange={handleChange}
              />
            ) : undefined}
            {activeStep === 1 ? (
              <SignUpStep2
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                userDetails={userDetails}
                handleChange={handleChange}
              />
            ) : undefined}
            {activeStep === 2 ? (
              <SignUpStep3
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                userDetails={userDetails}
                handleChange={handleChange}
                finalSubmit={finalSubmit}
                loading={loading}
                err={err}
                setErr={setErr}
              />
            ) : undefined}
          </div>
          <div className="col-md col-sm-10 d-none d-md-flex justify-content-center align-items-center">
            <img src={getActiveImg()} alt="nice svg" />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default SignUp;
