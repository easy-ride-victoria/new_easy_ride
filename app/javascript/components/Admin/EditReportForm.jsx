import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import { Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Switch, FormControlLabel,InputLabel, Select, MenuItem } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Axios from "axios";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#004578",
    width: "35px",
    height:"35px"
  },
});
const style = {
  width: "25px",
  height: "25px"
}

export default function EditReportForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(props.report.attributes);

  const handleSubmit = () => {
    console.log (state)
    console.log("report id:", props.report.id)
    Axios.put(`/api/v1/reports/${props.report.id}`, state)
      .then(() => {
        handleClose();
        setTimeout(() => {
          alert("changes registered");
        }, 400);
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
    setState(props.report.attributes);
  };
return (
  <div>
    <Button onClick={handleClickOpen}>
      <Avatar className={classes.avatar}>
        <EditIcon style={style} />
      </Avatar>
    </Button>
  
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="First Name"
            type="text"
            onChange={handleChange}
            value={state.user.first_name}
            fullWidth
          />

        <TextField
            margin="dense"
            name="last_name"
            label="Last Name"
            type="text"
            onChange={handleChange}
            value={state.user.last_name}
            fullWidth
          />

        <TextField
          margin="dense"
          name="horse"
          label="Horse's name"
          onChange={handleChange}
          value={state.horse.name}
          fullWidth
          />

        <TextField
          margin="dense"
          name="date"
          label="Date of activity"
          onChange={handleChange}
          value={state.activity_date}
          fullWidth
          />
          
        <FormControlLabel
          control={
            <Switch
              checked={state.answer1}
              onChange={(event) => {
                setState({ ...state, answer1: event.target.checked });
              }}
              name="answer1"
              color="primary"
            />
          }
          label="Warm-up"
        />

      <InputLabel> Type of activity</InputLabel>
      <Select 
        name="answer2" 
        className="answer2" 
        value={state.answer2}
        onChange={handleChange}
        >
      {/* <MenuItem value={state.answer2}></MenuItem> */}
        <MenuItem value="lunge">Lunge</MenuItem>
        <MenuItem value="free_lunge">Free lunge</MenuItem>
        <MenuItem value="trail_ride">Trail ride</MenuItem>
        <MenuItem value="ride">Ride in the ring</MenuItem>
        <MenuItem value="play">Structured play</MenuItem>
        <MenuItem value="handwalk">Handwalk</MenuItem>
      </Select>

      <TextField
          margin="dense"
          name="answer3"
          label="Details of activity"
          onChange={handleChange}
          value={state.answer3}
          fullWidth
          />

      <TextField
          margin="dense"
          name="answer4"
          label="Comments"
          onChange={handleChange}
          value={state.answer4}
          fullWidth
          />
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
      <Button onClick={handleSubmit} color="secondary" >Submit</Button>
      </DialogActions>
      
    </Dialog>
    </div>
  )};