// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
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
    body1: {
      fontSize: "1.5rem",
    },
    subtitle1: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.75rem",
    },
    h5: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "2.75rem",
    },
    h3: {
      fontSize: "3.5rem",
    },
    h2: {
      fontSize: "4.5rem",
    },
    button: {
      fontSize: "1.5rem",
    },
  },
  overrides: {
    // MuiSvgIcon: {
    //   root: {
    //     width: "3em",
    //     height: "3em",
    //   },
    // },
    MuiOutlinedInput: {
      multiline: {
        // fontWeight: "bold",
        // fontSize: "20px",
        // color: "purple",
        width: "50vw",
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
