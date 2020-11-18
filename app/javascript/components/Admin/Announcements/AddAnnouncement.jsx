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

const defaultState = {
  title: "",
  start_date: "",
  end_date: "",
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
  const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));
  // const [formData, setFormData] = useReducer(formReducer, {});
  const [open, setOpen] = useState(false);
  // const [state, setState] = useState(defaultState);
  // const [announcements, setAnnouncements] = useState([]);

  const onDateChange = (date, value) => {
    setDate(date);
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    event.preventDefault();
    console.log(e);
    
    props.onSubmit(setAnnouncements([...announcements, formData]));
  };
  console.log(announcements);

  // const handleChange = (event) => {
  // setState({ ...state, [event.target.name]: event.target.value });
  // };

  const handleChange = event => {
    date => handleDateChange(date);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setState(defaultState);
  };
  console.log(formData);
  const dateFormatter = str => {
    return str;
  };
  return (
    <div>
      <Button className={classes.addButton} onClick={handleClickOpen}>
        Add Announcement
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Announcement</DialogTitle>
        <DialogContent >
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            onChange={handleChange}
            // value={state.title}
            fullWidth
          />
          {/* <TextField
            margin="dense"
            name="start_date"
            label="Start Date"
            type="text"
            onChange={handleChange}
            // value={state.start_date}
            fullWidth
          /> */}
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            {/* <DatePicker
              variant="inline"
              label="Start Date"
              value={selectedDate}
              onChange={handleDateChange}
            /> */}
            <KeyboardDatePicker
              // clearable
              // name="start_date"
              // value={selectedDate}
              // label="Start Date"
              // placeholder="MM/DD/YY"
              // onChange={handleChange}

              // minDate={new Date()}
              // format="MM/DD/YY"
              // rifmFormatter={dateFormatter}
              autoOk={true}
              showTodayButton={true}
              value={selectedDate}
              format="YYYY-MM-DD"
              inputValue={inputValue}
              onChange={onDateChange}
              rifmFormatter={dateFormatter}
            />
            <TextField
              margin="dense"
              name="end_date"
              label="End Date"
              type="text"
              onChange={handleChange}
              // value={state.end_date}
              fullWidth
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