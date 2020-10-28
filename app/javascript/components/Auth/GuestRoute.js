import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function GuestRoute({ currentUser, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: currentUser.attributes.is_admin
                ? "/admin"
                : "/calendar",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
