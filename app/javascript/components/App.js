import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import MyCalendar from "./Calendar/Calendar";
import Home from "./Home/Home";
import AdminRoute from "./Auth/AdminRoute";
import GuestRoute from "./Auth/GuestRoute";
import RiderRoute from "./Auth/RiderRoute";
import ProfilePage from "./Profile/ProfilePage";
import HorsesPage from "./Admin/HorsesPage";
import UsersPage from "./Admin/UsersPage";
import ReportPage from "./Report/ReportPage";
import ReportsPage from "./Admin/ReportsPage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("currentUser"))
  );
  const setCurrentUserInStorage = function (user) {
    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("currentUser");
    }
    setCurrentUser(user);
  };
  return (
    <Switch>
      <GuestRoute currentUser={currentUser} exact path="/">
        <Home setCurrentUser={setCurrentUserInStorage} />
      </GuestRoute>
      {/* Rider Routes */}
      <RiderRoute currentUser={currentUser} exact path="/calendar">
        <MyCalendar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </RiderRoute>
      <RiderRoute currentUser={currentUser} exact path="/profile">
        <ProfilePage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        </RiderRoute>
        <RiderRoute currentUser={currentUser} exact path="/report">
        <ReportPage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        </RiderRoute>
      {/* Admin Routes */}
      <AdminRoute currentUser={currentUser} exact path="/admin">
        <MyCalendar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </AdminRoute>
      <AdminRoute currentUser={currentUser} exact path="/admin/horses">
        <HorsesPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </AdminRoute>
      <AdminRoute currentUser={currentUser} exact path="/admin/users">
        <UsersPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </AdminRoute>
      <AdminRoute currentUser={currentUser} exact path="/admin/reports">
        <ReportsPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </AdminRoute>
    </Switch>
  );
};

export default App;
