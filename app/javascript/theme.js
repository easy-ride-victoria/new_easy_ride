import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
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
