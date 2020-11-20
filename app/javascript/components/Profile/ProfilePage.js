import React from "react";
import { useState } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  },
  form: {
    width: "100%",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(8),
    // width: '30vw',
  },
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://photos.smugmug.com/photos/i-5ZBKBq4/0/dd69311e/L/i-5ZBKBq4-L.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "left",
    height: "130vh",
  },
}));

const stylesTextArea = {
  width: "300px",
};

const ProfileRoute = (props) => {
  const classes = useStyles();
  const { currentUser } = props;

  const [values, setValues] = useState({ ...currentUser.attributes });

  const handleSubmit = () => {
    // event.preventDefault();
    const id = currentUser.id;

    // console.log("Passing:", values);
    axios
      .put(`/api/v1/users/${id}`, values)
      .then(() => {
        setValues((prev) => ({ ...prev, values }));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={5} style={stylesTextArea}>
          <div className={classes.paper}>
            <form className={classes.form}>
              <Typography component="h4" variant="h4">
                My Profile
              </Typography>
              <br></br>
              <br></br>
              <TextField
                variant="outlined"
                label="First name"
                value={values.first_name}
                onChange={(e) => {
                  setValues({ ...values, first_name: e.target.value });
                }}
              />
              <br></br>
              <br></br>
              <TextField
                variant="outlined"
                label="Last name"
                value={values.last_name}
                onChange={(e) => {
                  setValues({ ...values, last_name: e.target.value });
                }}
              />
              <br></br>
              <br></br>
              <TextField
                variant="outlined"
                label="Email"
                value={values.email}
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                }}
              />
              <br></br>
              <br></br>
              <TextField
                variant="outlined"
                label="Password"
                value="******"
                disabled
              />
              <Link href="#" variant="subtitle1">
                <FormHelperText id="my-helper-text">
                  Forgot your password?
                </FormHelperText>
              </Link>
              <br></br>
              <TextField
                variant="outlined"
                label="HCBC Number"
                value={values.hcbc_number}
                onChange={(e) => {
                  setValues({ ...values, hcbc_number: e.target.value });
                }}
              />
              <br></br>
              <br></br>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.hcbc_active}
                    onChange={() => {
                      setValues({
                        ...values,
                        hcbc_active: !values.hcbc_active,
                      });
                    }}
                    name="active"
                    color="secondary"
                  />
                }
                label="Active HCBC"
              />
              <br></br>
              <br></br>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={7} className={classes.image} />
      </Grid>
    </div>
  );
};

export default ProfileRoute;
