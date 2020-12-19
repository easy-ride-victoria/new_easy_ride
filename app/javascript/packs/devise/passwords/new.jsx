import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import ResetPasswordForm from "../../../components/User/ResetPasswordForm";
import theme from "../../../theme";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ResetPasswordForm />
    </ThemeProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
