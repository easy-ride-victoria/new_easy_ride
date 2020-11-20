import React, { useState, useEffect } from "react";
import HorsesTable from "./HorsesTable";
import AddHorseForm from "./AddHorseForm";
import Axios from "axios";

export default function HorsesPage() {
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
      <AddHorseForm onSubmit={loadHorses} />
      <HorsesTable horses={horses} onChange={loadHorses} />
    </>
  );
}
