import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Axios from "axios";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#004578",
    width: "35px",
    height:"35px"
  },
  avatarDelete: {
    backgroundColor: "#780e0c",
    width: "35px",
    height:"35px",
  },
});
const style = {
  width: "25px",
  height: "25px"
}

export default function DeleteReportForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(props.report.attributes);

  const handleSubmit = () => {
    console.log (state)
    console.log("report id:", props.report.id)
    Axios.delete(`/api/v1/reports/${props.report.id}`, state)
      .then(() => {
        handleClose();
        setTimeout(() => {
          // alert("Report deleted");
        }, 400);
      if (props.onSubmit) {
        props.onSubmit();
       }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Avatar className={classes.avatarDelete}>
          <DeleteOutlineIcon style={style} />
        </Avatar>
      </Button>
    
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Please confirm Delete (this action can not be undone)</DialogTitle>
      <DialogActions>
      <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
        <Button onClick={handleSubmit} color="secondary" >DELETE</Button>
        </DialogActions>
        
      </Dialog>
      </div>
    )};
