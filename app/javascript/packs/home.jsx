import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Home from "../components/Home/Home";
import theme from "../theme";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
