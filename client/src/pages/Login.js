import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../components/login/LoginForm";
import {
  hasAuthTokenInLocalStorage,
  setAuthTokenInLocalStorage,
} from "../helper";
import Base from "./Base";
import LoginPageImg from "../img/login.svg";
import { login } from "../apiCalls/auth";

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({
    adhaar: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //calling the login api
    login(userDetails).then((res) => {
      //if login ok
      if (res.success) {
        setLoading(false);
        console.log(res);
        //set token in local storage
        setAuthTokenInLocalStorage(res.token, () => {
          setRedirect(true);
        });
      }
      //if some error occured
      else {
        setErr(true);
        setLoading(false);
      }
    });
  };
  // this is when user tried to access a page from url
  //but is not logged in so redirected to login page
  //but this varible remember from which page user came
  //thus help in redirecting back to it
  const fromPage =
    (props.location.state && props.location.state.from.pathname) ||
    "/userdashboard";
  return (
    <Base title="login">
      <div>
        {/* for redirecting :when login success or is already logged in from token */}

        {(redirect || hasAuthTokenInLocalStorage()) && (
          <Redirect to={fromPage} />
        )}

        <div className="row p-4">
          {/* left part form*/}
          <div className="col-md-5 col-sm-10 offset-md-1 p-4 bg-dark rounded ">
            <h1 className="mb-4 text-white fw-bold display-5 h1">
              Hope,
              <br /> you are all fine
            </h1>
            {err && (
              <div class="alert alert-danger form-control" role="alert">
                email or password did not matched
              </div>
            )}
            <LoginForm
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          {/* right part image*/}
          <div className="col-md col-sm-10 d-none d-md-flex justify-content-center align-items-center">
            <img src={LoginPageImg} alt="nice svg" />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Login;
