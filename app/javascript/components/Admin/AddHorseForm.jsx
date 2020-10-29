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
  name: "",
  breed: "",
  email: "",
  date_of_birth: "2020-01-01",
  active: true,
};

export default function AddHorseForm(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(defaultState);

  const handleSubmit = () => {
    Axios.post("/api/v1/horses", state).then(() => {
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
        Add New Horse
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Horse</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            onChange={handleChange}
            value={state.name}
            fullWidth
          />
          <TextField
            margin="dense"
            name="breed"
            label="Breed"
            type="text"
            onChange={handleChange}
            value={state.breed}
            fullWidth
          />
          <TextField
            margin="dense"
            name="date_of_birth"
            label="Date of birth"
            type="date"
            onChange={handleChange}
            value={state.date_of_birth}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.active}
                onChange={(event) => {
                  setState({ ...state, active: event.target.checked });
                }}
                name="active"
                color="primary"
              />
            }
            label="Active"
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
