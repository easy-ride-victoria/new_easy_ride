// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#004578",
    },
    secondary: {
      main: "#a47638",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontSize: 21,
  },
  overrides: {
    MuiSelect: {
      root: {
        display: "flex",
        alignItems: "center",
      },
    },
    MuiOutlinedInput: {
      multiline: {
        // fontWeight: "bold",
        // fontSize: "20px",
        // color: "purple",
        width: "30vw",
      },
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/" component={App} />
      </Router>
      ,
    </ThemeProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
