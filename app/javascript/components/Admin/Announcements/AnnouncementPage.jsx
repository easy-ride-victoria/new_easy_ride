import React from 'react';
import { useState, useReducer } from "react";
import MenuAppBar from "../../Layout/NavBar";
import AnnouncementTable from "./AnnouncementTable";
import { Grid, Button } from "@material-ui/core";
import AddAnnouncement from './AddAnnouncement';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  };
};

const AnnouncementPage = (props) => {
  const { currentUser, setCurrentUser } = props;
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useReducer(formReducer, {});

  
  const handleSubmit = () => {
   
  };
  console.log(announcements);
  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {/* <Grid container justify="flex-start" spacing={2}>
        <Button
          size="medium"
          color="primary"
          onClick={() => {
            setAnnouncements(!announcements);
            loadAnnouncements();
          }}
        >
          Add Announcement
        </Button>
      </Grid> */}
      <AddAnnouncement formData={formData} setFormData={setFormData} announcements={announcements} setAnnouncements={setAnnouncements} onSubmit={handleSubmit}/>
      <AnnouncementTable announcements={announcements} setAnnouncements={setAnnouncements}/>
    </>
  );
};

export default AnnouncementPage;