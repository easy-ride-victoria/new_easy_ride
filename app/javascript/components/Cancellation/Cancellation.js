import React from 'react';
import emailjs from 'emailjs-com';
import MenuAppBar from '../Layout/NavBar';
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid,  Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  root: {
    background: '#004578',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '50px'
  },
  label: {
    textTransform: 'capitalize',
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: 'wrap'
  },
  form: {
    width: "100%",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  textInputInput: {
    color: "red",
  },
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'white',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
}));

const Cancellation = (props) => {
  const { currentUser, setCurrentUser } = props;
  const classes = useStyles();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('gmail', 'template_wrw8lum', e.target, 'user_o56NuTdKc5rmwca5wThBZ')
      .then((result) => {
        console.log(result);
        console.log(e.target);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };

  console.log(currentUser);
  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container alignItems="center" justify="space-around" direction="column">
        <div className={classes.section1}>
          <Grid item xs>
            <Typography gutterBottom variant="h3">
              Cancellation request
            </Typography>
          </Grid>
          <Grid item>
          </Grid>
          <Typography color="secondary" variant="body1" >
        * Customers must notify at least 5 days before the start of the event.
          </Typography>
        </div>
        <form onSubmit={sendEmail}>
      
          <input type="hidden" className="form-control" name="first_name" value={currentUser.attributes.first_name}/>
          <input type="hidden" className="form-control" name="last_name" value={currentUser.attributes.last_name}/>
          <input type="hidden" className="form-control" name="email" value={currentUser.attributes.email}/>
  

          <Grid container alignItems="center" justify="space-around" direction="column" spacing={2}>
            {/* <Grid item xs alignItems="center" justify="center" spacing={1} margin="80px"> */}
            <TextField
              id="outlined-number"
              label="Date"
              name="date"
              type="text"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* </Grid> */}
            <TextField
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
              margin  = "20px"
            />
         
        
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              value="send"
            >
            Send
            </Button>
            
       
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default Cancellation;

