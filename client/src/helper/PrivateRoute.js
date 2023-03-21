import React from "react";
import { Route, Redirect } from "react-router-dom";
import { hasAuthTokenInLocalStorage } from ".";

const PrivateRoute = ({ component: Component, ...rest }) => {
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
