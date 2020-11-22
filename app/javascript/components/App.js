import React, { useState, useEffect } from "react";
import { Switch } from "react-router-dom";
import NavBar from "./Layout/NavBar";
import MyCalendar from "./Calendar/Calendar";
import AdminRoute from "./Auth/AdminRoute";
import RiderRoute from "./Auth/RiderRoute";
import ProfilePage from "./Profile/ProfilePage";
import HorsesPage from "./Admin/HorsesPage";
import UsersPage from "./Admin/UsersPage";
import ReportPage from "./Report/ReportPage";
import ReportsPage from "./Admin/ReportsPage";
import Cancellation from "./Cancellation/Cancellation";
import AnnouncementPage from "./Admin/Announcements/AnnouncementPage";
import Axios from "axios";

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(async () => {
    const response = await Axios.get("/api/v1/current_user");
    setCurrentUser(response.data.data);
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Switch>
        {/* Rider Routes */}
        <RiderRoute currentUser={currentUser} exact path="/">
          <MyCalendar currentUser={currentUser} />
        </RiderRoute>
        <RiderRoute currentUser={currentUser} exact path="/profile">
          <ProfilePage currentUser={currentUser} />
        </RiderRoute>
        <RiderRoute currentUser={currentUser} exact path="/report">
          <ReportPage />
        </RiderRoute>
        <RiderRoute currentUser={currentUser} exact path="/cancellation">
          <Cancellation currentUser={currentUser} />
        </RiderRoute>
        {/* Admin Routes */}
        <AdminRoute currentUser={currentUser} exact path="/admin/horses">
          <HorsesPage />
        </AdminRoute>
        <AdminRoute currentUser={currentUser} exact path="/admin/users">
          <UsersPage />
        </AdminRoute>
        <AdminRoute currentUser={currentUser} exact path="/admin/reports">
          <ReportsPage />
        </AdminRoute>
      <AdminRoute currentUser={currentUser} exact path="/admin/announcements">
        <AnnouncementPage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </AdminRoute>
      </Switch>
    </>
  );
};

export default App;
