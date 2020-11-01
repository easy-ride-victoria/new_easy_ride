import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import MenuAppBar from "../Layout/NavBar";
import AddUserForm from "./AddUserForm";
import Axios from "axios";

export default function UsersPage(props) {
  const { currentUser, setCurrentUser } = props;
  const [users, setUsers] = useState([]);
  const loadUsers = () => {
    Axios.get("/api/v1/users").then((response) => {
      // console.log(response);
      setUsers(response.data.data);
    });
  };
  useEffect(loadUsers, []);

  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <AddUserForm onSubmit={loadUsers} />
      <UsersTable users={users} onChange={loadUsers} />
    </>
  );
}
