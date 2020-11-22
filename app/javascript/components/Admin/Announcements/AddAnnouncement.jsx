import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles({
  addButton: {
    marginBottom: "40px",
    marginLeft: "63px",
    alignContent: "centre"
  }
});

const defaultState = {
  title: "",
  start_date: null,
  end_date: null,
};
 
const AddAnnouncement = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(defaultState);
  
  const handleSubmit = (e) => {
    event.preventDefault();
    axios.post("/api/v1/announcements", formData)
      .then(() => {
        console.log(formData);
        if (props.onSubmit) {
          props.onSubmit();
        }
      }
      );
    handleClose();
  };

  const handleChangeTitle = event => {
    console.log(event);
    setFormData({ ...formData, title: event.target.value });
  };
  
  const handleStartDate = (event) => {
    console.log(event);
    setFormData({ ...formData, start_date: event._d});
  };

  const handleEndDate = (event) => {
    console.log(event);
    setFormData({ ...formData, end_date: event._d });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(defaultState);
  };

  return (
    <div>
      <Button className={classes.addButton} onClick={handleClickOpen} color="primary">
        Add Announcement
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" color="primary">Add Announcement</DialogTitle>
        <DialogContent >
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            onChange={handleChangeTitle}
            value={formData.title}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              margin="dense"
              id="start-date-picker-dialog"
              name="start_date"
              label="Start Date"
              format="DD-MM-YYYY"
              onChange={handleStartDate}
              value={formData.start_date}
              fullWidth
              autoOk
              showTodayButton
              disablePast
            />
            <DatePicker
              margin="dense"
              id="end-date-picker-dialog"
              name="end_date"
              label="End Date"
              format="DD-MM-YYYY"
              onChange={handleEndDate}
              value={formData.end_date}
              fullWidth
              autoOk
              showTodayButton
              disablePast
            />
          </MuiPickersUtilsProvider>
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
};

export default AddAnnouncement;