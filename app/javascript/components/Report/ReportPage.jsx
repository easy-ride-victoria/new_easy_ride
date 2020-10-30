import React, { useState, useEffect } from "react";
import ReportForm from "./ReportForm";
import MenuAppBar from "../Layout/NavBar";

import Axios from "axios";

export default function ReportPage(props) {
  const { currentUser, setCurrentUser } = props;
  // const [report, setREports] = useState([]);
  // const loadUsers = () => {
  //   Axios.get("/api/v1/users").then((response) => {
  //     // console.log(response);
  //     setUsers(response.data.data);
  //   });
  // };
  // useEffect(loadUsers, []);

  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <ReportForm />
      {/* <UsersTable users={users} onChange={loadUsers} />  */}
    </>
  );
}
