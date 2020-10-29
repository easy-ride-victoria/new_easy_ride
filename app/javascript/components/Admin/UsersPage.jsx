import React from "react";
import UsersTable from "./UsersTable";
import MenuAppBar from "../Layout/NavBar";

export default function UsersPage(props) {
  const { currentUser, setCurrentUser } = props;
  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <UsersTable></UsersTable>
    </>
  );
}