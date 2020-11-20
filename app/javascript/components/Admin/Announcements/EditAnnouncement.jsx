import React, { useState } from 'react';
import { Button, Avatar, TextField, Dialog, DialogActions, DialogContent, DialogTitle   } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles({
  addButton: {
    marginBottom: "40px",
    marginLeft: "63px",
    alignContent: "centre"
  },
  icons: {
    width: "25px",
    height: "25px"
  },
  avatar: {
    backgroundColor: "#004578",
    width: "35px",
    height:"35px"
  },
});

const defaultState = {
  title: "",
  start_date: null,
  end_date: null,
};
 
const EditAnnouncement = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(props.announcement.attributes);

  const handleSubmit = (e) => {
    event.preventDefault();
    console.log(e);
    axios.put(`/api/v1/announcements/${props.announcement.id}`, formData)
      .then(response => {
        console.log(response);
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
    // setFormData(defaultState);
  };

  console.log("Form Data is: ", formData);

  return (
    <div>
      <Button onClick={handleClickOpen} color="primary">
        <Avatar className={classes.avatar}>
          <EditIcon className={classes.icons} />
        </Avatar>
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditAnnouncement;