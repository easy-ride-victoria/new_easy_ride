import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import MyCalendar from "./Calendar/Calendar";
import Home from "./Home/Home";
import AdminRoute from "./Auth/AdminRoute";
import GuestRoute from "./Auth/GuestRoute";
import RiderRoute from "./Auth/RiderRoute";



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
