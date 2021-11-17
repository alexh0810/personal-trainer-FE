import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import dayjs from "dayjs";
import { Button } from "@mui/material";

// Fetching customers and training lists from BE

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  // Using useEffect hook to fetch data from BE

  useEffect(() => fetchData(), []);
  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (response.ok) {
          fetchData();
        } else {
          alert("Something went wrong");
        }
      });
    }
  };

  const columns = [
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (trainings) => {
        return dayjs(trainings.date).format("DD/MM/YYYY");
      },
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    {
      headerName: " ",
      field: "links[0].href",
      cellRendererFramework: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteTraining(params.data.links[0].href)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 600, width: "50%", margin: "auto", padding: 20 }}
    >
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
