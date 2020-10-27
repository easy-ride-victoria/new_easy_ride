import React from 'react';
import { useState } from "react";
import { Modal, TextField, makeStyles, Button } from '@material-ui/core';
import Calendar from './Calendar';

/* eslint-disable */ 
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxSadow: "10px 5px 5px black",
    padding: "16px 32px 24px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  textfield: {
    width: "100%"
  },
  button: {
    textAlign: 'center'
  }
}))

const ModalBox = (props) => {
  const styles = useStyles();
  const { modal, setModal } = props;
  // const [modal, setModal] = useState(false);

  const openCloseModal = () => {
    setModal(!modal);
  }


  const body = (
    <div className= {styles.modal}>
      <div align="center">
        <h2>Booking</h2>
      </div>
      <TextField label="First Name" className={styles.textfield}/>
      <br />
      <TextField label="Last Name" className={styles.textfield}/>
      <br />
      <TextField label="Email" className={styles.textfield}/>
      <br /> <br />
      <div align="right"> 
        <Button color="primary">Send</Button>
        <Button onClick={()=>openCloseModal()}>Cancel</Button>
      </div>
    </div>
  )
  return (
    <div>
      <Button className={styles.button} onClick={()=>openCloseModal()}>Open Modal</Button>
      <Modal
        open={modal}
        onClose={openCloseModal} >
          {body}
      </Modal>
    </div>
  );
};

export default ModalBox;