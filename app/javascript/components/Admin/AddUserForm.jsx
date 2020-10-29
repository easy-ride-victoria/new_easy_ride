import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Axios from "axios";

const defaultState = {
  first_name: "",
  last_name: "",
  email: "",
  // password: "",
  hcbc_number: "",
  is_admin: false,
};

export default function AddUserForm(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(defaultState);

  const handleSubmit = () => {
    Axios.post("/api/v1/users", state).then(() => {
      handleClose();
      if (props.onSubmit) {
        props.onSubmit();
      }
    });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState(defaultState);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="First Name"
            type="text"
            onChange={handleChange}
            value={state.first_name}
            fullWidth
          />
          <TextField
            margin="dense"
            name="last_name"
            label="Last Name"
            type="text"
            onChange={handleChange}
            value={state.last_name}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            onChange={handleChange}
            value={state.email}
            fullWidth
          />
          {/* <TextField
            margin="dense"
            name="password_digest"
            label="Password"
            type="password"
            fullWidth
          /> */}
          <TextField
            margin="dense"
            name="hcbc_number"
            label="HCBC Number"
            type="text"
            onChange={handleChange}
            value={state.hcbc_number}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.is_admin}
                onChange={(event) => {
                  setState({ ...state, is_admin: event.target.checked });
                }}
                name="is_admin"
                color="primary"
              />
            }
            label="Give administrator privileges"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
