import React, { useState, useEffect } from "react";
import MenuAppBar from "../Layout/NavBar";
import ReportsTable from "./ReportTable";
import Axios from "axios";


export default function ReportsPage(props) {
  const { currentUser, setCurrentUser } = props;
  const [reports, setReports] = useState([]);

  const getReports = () => {
    Axios.get("/api/v1/reports").then((response) => {
      console.log(response.data.data);
      setReports(response.data.data);
    });
  };
  useEffect(getReports, []);
  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <ReportsTable reports={reports} onChange={getReports} />
    </>
  );
}
