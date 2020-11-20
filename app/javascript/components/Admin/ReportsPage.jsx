import React, { useState, useEffect } from "react";
import ReportsTable from "./ReportTable";
import Axios from "axios";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  const getReports = () => {
    Axios.get("/api/v1/reports").then((response) => {
      setReports(response.data.data);
    });
  };
  useEffect(getReports, []);
  return <ReportsTable reports={reports} onChange={getReports} />;
}
