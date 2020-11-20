import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AdminRoute({ currentUser, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser && currentUser.attributes.is_admin ? (
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
