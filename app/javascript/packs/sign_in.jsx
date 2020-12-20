import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import SignInPage from "../components/SignIn/SignInPage";
import theme from "../theme";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <SignInPage />
    </ThemeProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
