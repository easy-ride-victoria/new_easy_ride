import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import MyCalendar from "./Calendar/Calendar";
import Home from "./Home/Home";
import AdminRoute from "./Auth/AdminRoute";
import GuestRoute from "./Auth/GuestRoute";
import RiderRoute from "./Auth/RiderRoute";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Switch>
      <GuestRoute currentUser={currentUser} exact path="/">
        <Home setCurrentUser={setCurrentUser} />
      </GuestRoute>
      <RiderRoute currentUser={currentUser} exact path="/calendar">
        <MyCalendar />
      </RiderRoute>
      <AdminRoute currentUser={currentUser} exact path="/admin">
        {"adminroute"}
      </AdminRoute>
    </Switch>
  );
};

export default App;
