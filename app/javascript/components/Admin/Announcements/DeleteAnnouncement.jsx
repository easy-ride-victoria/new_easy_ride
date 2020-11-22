import React, { useState } from 'react';
import { Dialog, Avatar, Button, DialogActions, DialogTitle } from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from "axios";
import {  makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#780e0c",
    width: "35px",
    height:"35px",
  }
});

const DeleteAnnouncement = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { announcement } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    event.preventDefault();
    console.log("deleted", announcement);
    axios.delete(`/api/v1/announcements/${announcement.id}`, announcement)
      .then(response => {
        console.log(response);
        if (props.onSubmit) {
          props.onSubmit();
        }
      }
      );
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="primary">
        <Avatar className={classes.avatar}>
          <DeleteOutlineIcon/>
        </Avatar>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">This action cannot be undone, please confirm to delete. </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">DELETE</Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
};

export default DeleteAnnouncement;