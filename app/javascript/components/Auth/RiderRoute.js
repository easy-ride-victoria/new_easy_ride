import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function RiderRoute({ currentUser, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/users/sign_in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
