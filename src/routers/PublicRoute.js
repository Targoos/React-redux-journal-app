import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);
