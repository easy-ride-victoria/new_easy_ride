import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { TextareaAutosize } from "@material-ui/core";


// Material ui customization
const useStyles = makeStyles({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
  saveButton: {
    marginBottom: "40px",
    marginLeft: "63px",
    alignContent: "centre"
  }
});

const defaultState = {
  name: "",
  horse: "",
  date: "",
  question1: "true",
  question2: "",
  question3: "",
  question4: ""
};

export default function AddHorseForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(defaultState);

  // const handleSubmit = () => {
  //   Axios.post("/api/v1/horses", state).then(() => {
  //     handleClose();
  //     if (props.onSubmit) {
  //       props.onSubmit();
  //     }
  //   });
  // };


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
      {/* <Button className={classes.addButton} color="primary" onClick={handleClickOpen}>
      Fill New Report
      </Button> */}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      > */}
      <DialogTitle id="form-dialog-title">Create New Report</DialogTitle>
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
          name="horse"
          label="Horse you worked with"
          type="text"
          onChange={state.horse}
          fullWidth
        />
        <TextField
          margin="dense"
          name="activity_date"
          label="Date of the activity"
          type="text"
          onChange={handleChange}
          value={state.date}
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox checked={state.question1} onChange={handleChange} name="question1" />}
          label="Did you warm-up with a 10 minutes walk on a loose rein?"
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select what type of activity you did:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value=""
            onChange={handleChange}
          >
            <MenuItem value={"lunge"}>Lunge</MenuItem>
            <MenuItem value={"free-lunge"}>Free Lunge</MenuItem>
            <MenuItem value={"trail-ride"}>Trail Ride</MenuItem>
            <MenuItem value={"ring-ride"}>Ride in the Ring</MenuItem>
            <MenuItem value={"play"}>Structured Play</MenuItem>
            <MenuItem value={"hand-walk"}>Hand Walk</MenuItem>
          </Select>
        </FormControl>
        <TextareaAutosize
          margin="dense"
          name="exercises"
          aria-label="minimum height"
          label="Details of exercises"
          type="text"
          rowsMin={3}
          onChange={handleChange}
          value={state.question3}
          fullWidth
        />
        <TextareaAutosize
          margin="dense"
          name="comments"
          aria-label="minimum height"
          label="Any other relevant comments"
          type="text"
          rowsMin={3}
          onChange={handleChange}
          value={state.question4}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
            Add
        </Button>
      </DialogActions>
     
    </div>
  );
}
