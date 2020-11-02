import React from "react";
import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";

const DeleteAlert = (props) => {
  return (
    <div>
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this booking?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          For questions email admin@vtra.ca or call (778) 426-0506.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDelete} color="secondary">
          Delete
        </Button>
        <Button onClick={props.onClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
};

export default DeleteAlert;
