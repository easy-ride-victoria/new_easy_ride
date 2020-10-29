import React from "react";
import HorsesTable from "./HorsesTable";
import MenuAppBar from "../Layout/NavBar";

export default function HorsesPage(props) {
  const { currentUser, setCurrentUser } = props;
  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <HorsesTable></HorsesTable>
    </>
  );
}
