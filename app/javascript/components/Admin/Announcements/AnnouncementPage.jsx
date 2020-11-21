import React from 'react';
import { useState, useEffect } from "react";
import MenuAppBar from "../../Layout/NavBar";
import AnnouncementTable from "./AnnouncementTable";
import AddAnnouncement from './AddAnnouncement';
import axios from "axios";

const AnnouncementPage = (props) => {
  const { currentUser, setCurrentUser } = props;
  const [announcements, setAnnouncements] = useState([]);

  const loadAnnouncements = () => {
    axios.get("/api/v1/announcements")
      .then(response => {
        setAnnouncements(response.data.data);
      });
  };
  useEffect(loadAnnouncements, []);

  console.log("announcements array: ", announcements);
  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <AddAnnouncement onSubmit={loadAnnouncements}/>
      <AnnouncementTable announcements={announcements} onChange={loadAnnouncements}/>
    </>
  );
};

export default AnnouncementPage;