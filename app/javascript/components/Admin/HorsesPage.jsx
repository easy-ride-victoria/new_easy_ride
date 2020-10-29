import React, { useState, useEffect } from "react";
import HorsesTable from "./HorsesTable";
import MenuAppBar from "../Layout/NavBar";
import AddHorseForm from "./AddHorseForm";

export default function HorsesPage(props) {
  const { currentUser, setCurrentUser } = props;
  const [horses, setHorses] = useState([]);

  const loadHorses = () => {
    Axios.get("/api/v1/horses").then((response) => {
      // console.log(response);
      setHorses(response.data.data);
    });
  };
  useEffect(loadHorses, []);
  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <HorsesTable horses={horses} onChange={loadHorses} />
      <AddHorseForm onSubmit={loadHorses} />
    </>
  );
}
