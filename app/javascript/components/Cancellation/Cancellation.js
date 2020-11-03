import React, { useState } from 'react';
import emailjs, { sendForm } from 'emailjs-com';
import MenuAppBar from '../Layout/NavBar';
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid,  Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // form: {
  //   width: "50%",
  //   marginLeft: theme.spacing(4),
  //   marginRight: theme.spacing(4),
  //   margin: "20px",
  //   padding: "20px",
    
  // },
  titles: {
    marginLeft: "30px",
  },
  textfield: {
    margin: "30px",
    marginTop: "40px",
    width: "30vw",
  },
  multiline: {
    margin: "30px",

  },
  button: {
    margin: "30px",
    alignItems: "center",
    textAlign: 'start',
  }
}));

const Cancellation = (props) => {
  const { currentUser, setCurrentUser } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('gmail', 'template_wrw8lum', e.target, `${process.env.REACT_APP_EMAILJS}`)
      .then((result) => {
        console.log(result);
        console.log(e.target);
      }, (error) => {
        alert(error.text);
      });
    e.target.reset();
  };

  const handleSubmit = (e) => {
    sendEmail(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(currentUser);
  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container alignItems="start" justify="space-around" direction="column" >
 
        <Grid item xs className={classes.titles}>
          <Typography gutterBottom variant="h3">
              Cancellation request
          </Typography>
        </Grid>
        <Grid item className={classes.titles}>
          <Typography color="secondary" variant="body1" >
        * Customers must notify at least 5 days before the start of the event.
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <input type="hidden" className="form-control" name="first_name" value={currentUser.attributes.first_name}/>
            <input type="hidden" className="form-control" name="last_name" value={currentUser.attributes.last_name}/>
            <input type="hidden" className="form-control" name="email" value={currentUser.attributes.email}/>
          </div>

          <Grid container alignItems="start" justify="space-around" direction="column">
            <Grid item xs>
              <TextField className={classes.textfield}
                id="outlined-date"
                label="Date"
                name="date"
                type="text"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs>
              <TextField className={classes.multiline}
                id="filled-multiline-static"
                label="Message"
                name="message"
                type="text"
                multiline
                variant="outlined"
                rows={5}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  className: classes.multilineColor
                }}
              />
            </Grid>
         
            <Grid item xs className={classes.button}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                value="send"
              >
            Send
              </Button>
            </Grid>
       
          </Grid>
        </form>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your cancellation request has been sent."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We will review your request and get back to you within 48 hours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cancellation;

