import React, { useReducer, useState } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import {
  DatePicker, KeyboardDatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import moment from "moment";

const useStyles = makeStyles({
  addButton: {
    marginBottom: "40px",
    marginLeft: "63px",
    alignContent: "centre"
  }
});
const convertDate = (date) => {
  return moment(date).format("MM/DD/yyyy").toString();
};

const defaultState = {
  title: "",
  start_date: null,
  end_date: null,
};

// const formReducer = (state, event) => {
//   return {
//     ...state,
//     [event.name]: event.value
//   };
// };

 
const AddAnnouncement = (props) => {
  const classes = useStyles();
  const { announcements, setAnnouncements, formData, setFormData } = props;
  // const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate, setDate] = useState(moment());
  const [inputValue, setInputValue] = useState(moment().format("DD-MM-YYYY"));
  // const [formData, setFormData] = useReducer(formReducer, {});
  const [open, setOpen] = useState(false);

  console.log("inoutvalue:", inputValue);
  console.log("inoutvalue:", selectedDate);


  const handleSubmit = (e) => {
    event.preventDefault();
    console.log(e);
    props.onSubmit(setAnnouncements([...announcements, formData]));
    setFormData(defaultState);
    setOpen(false);
  };
  console.log(announcements);


  const handleChangeTitle = event => {
    // date => handleDateChange(date);
    console.log(event);
    setFormData((prev) => ({ ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  
  const handleStartDate = (event, date) => {
    // date => handleDateChange(date);
    setDate(date);
    console.log(event);
    
    setFormData((prev) => ({ ...prev, start_date: convertDate(event._d) }));
  };
  const handleEndDate = (event, date) => {
    // date => handleDateChange(date);
    setDate(date);
    console.log(event);
    
    setFormData((prev) => ({ ...prev, end_date: convertDate(event._d) }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setState(defaultState);
  };

  console.log("Form Data is: ", formData);



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
            required={true}
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
              // type="date"
              format="DD-MM-YYYY"
              onChange={handleStartDate}
              value={formData.start_date}
              fullWidth
              autoOk
            />
            <DatePicker
              margin="dense"
              id="end-date-picker-dialog"
              name="end_date"
              label="End Date"
              // type="date"
              format="DD-MM-YYYY"
              onChange={handleEndDate}
              value={formData.end_date}
              fullWidth
              autoOk
            />
            {/* <TextField
              margin="dense"
              name="end_date"
              label="End Date"
              type="text"
              // onChange={handleChange}
              // value={state.end_date}
              fullWidth
            /> */}
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