import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, TextField, makeStyles, Button, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { StyleSharp } from '@material-ui/icons';
import { parseJSON } from 'date-fns';
import axios from 'axios';

/* eslint-disable */ 
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxSadow: "10px 5px 5px black",
    padding: "16px 32px 24px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#004578',
  },
  textfield: {
    width: "100%",
    margin: "auto",
  },
  button: {
    textAlign: 'right',
    justifyItems: "space-between",
    alignSelf: "right"
  },
  title: {
    textAlign: "center",
    width: "100%",
  },
  formControl: {
    width: "100%",
  }
}))

const ModalBox = (props) => {
  const styles = useStyles();
  const { modal, setModal } = props;
  // const [modal, setModal] = useState(false);
  // Adding state for the dropdown pickers
  const [horse, setHorse] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [email, setEmail] = useState('')

  const openCloseModal = () => {
    setModal(!modal);
  }
  // on send button click
  const handleSubmit = () => {
    openCloseModal();
    

    props.doBooking(horse, email, bookingType)
    
    
    
    
    
    // console.log(horse)
    // console.log(bookingType)
    // console.log(email)
    const info = {horse, email, eventType: bookingType}
    console.log(JSON.stringify(info))
    axios.post('http://localhost:3000/api/v1/rides', info)
    .then (response => console.log(response))
    .catch(error => console.log(error))
  };


  // selecting the horse
  const handleChangeHorse = (event) => {
    setHorse(event.target.value);
  };

   // selecting the event type
   const handleChangeType = (event) => {
    setBookingType(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const body = (
    <div className= {styles.modal}>
      <div className= {styles.title}>
        <h2>Booking</h2>
      </div>
      <FormControl className={styles.formControl}>
        <InputLabel id="demo-simple-select-label">Booking Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bookingType}
          onChange={handleChangeType}
        >
          <MenuItem value={'Lesson'}>Lesson</MenuItem>
          <MenuItem value={'Ride'}>Simple Ride</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
      </FormControl>
      <TextField label="First Name" className={styles.textfield}/>
      <br />
      <TextField label="Last Name" className={styles.textfield}/>
      <br />
      <FormControl className={styles.formControl}>
      <TextField label="Email" className={styles.textfield} onChange={handleChangeEmail}/>
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel id="demo-simple-select-label">Horse</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={horse}
          onChange={handleChangeHorse}
        >
          <MenuItem value={'Cisco'}>Cisco</MenuItem>
          <MenuItem value={'Danny'}>Danny</MenuItem>
          <MenuItem value={'Trigger'}>Trigger</MenuItem>
        </Select>
      </FormControl>
      <br /> <br />
      <div align="right"> 
        <Button onClick={()=>handleSubmit()} color="primary">Send</Button>
        <Button onClick={()=>openCloseModal()} color="primary">Cancel</Button>
      </div>
    </div>
  )
  return (
    <div>
      <Modal
        open={modal}
        onClose={openCloseModal} >
          {body}
      </Modal>
    </div>
  );
};

export default ModalBox;