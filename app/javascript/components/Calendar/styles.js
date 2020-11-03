import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  form: {
    // position: "absolute",
    // width: 600,
    // backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: "10px 5px 5px black",
    // padding: "16px 32px 24px",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    color: theme.palette.primary.main,
  },
  button: {
    textAlign: "right",
    justifyItems: "space-between",
    alignSelf: "right",
  },
  title: {
    textAlign: "center",
    width: "100%",
    fontSize: theme.typography.h4.fontSize,
  },
  formControl: {
    width: "100%",
    margin: theme.spacing(1, 0, 2),
  },
  dateTimePickerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  dateTimePicker: {
    margin: theme.spacing(2, 1, 2),
  },
  calendar: {
    fontFamily: "Roboto",
    border: 0,
    borderRadius: 3,
    padding: "30px",
    color: "#004578",
    marginLeft: "45px",
    marginRight: "45px",
    
  },
  paymentForm: {
    margin: theme.spacing(1, 0, 1),
  },
  weather: {
    // paddingTop: "20px",
    margin: "10px",
  },
}));
