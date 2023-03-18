import React from "react";
import { Route, Redirect } from "react-router-dom";

//set auth token in local storage
export const setAuthTokenInLocalStorage = (token, cb) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("jwt", JSON.stringify(token));
    cb();
  }
};

//check auth token in local storage
export const hasAuthTokenInLocalStorage = () => {
  if (typeof window !== undefined) {
    if (window.localStorage.getItem("jwt"))
      return JSON.parse(localStorage.getItem("jwt"));
    else return false;
  }
  return false;
};

//only allow logged in users
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        hasAuthTokenInLocalStorage() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
