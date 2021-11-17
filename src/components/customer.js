import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

// Fetching customers and training lists from BE

function Customerlist() {
  const [customers, setCustomers] = useState([]);

  // Using useEffect hook to fetch data from BE

  useEffect(() => fetchData(), []);
  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .then((err) => console.error(err));
  };
  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (response.ok) {
          fetchData();
        } else {
          alert("Something went wrong");
        }
      })
      .catch(err => console.error(err));
    }
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customer), // Convert JS object into JSON String
    }).then((response) => {
      if (response.ok) {
        fetchData();
      } else {
        alert("Something went wrong")
      }
    })
    .catch(err => console.error(err));
  };

  const editCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    }).then((response) => {
      if(response.ok) {
        fetchData();
      } else {
        alert("Something went wrong")
      }
    })
    .catch(err => console.error(err));
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      headerName: " ",
      sortable: false, 
      filter: false,
      width: 120,
      field: "links[0].href",
      cellRendererFramework: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteCustomer(params.data.links[0].href)}
        >
          Delete
        </Button>
      ),
    },
    {
      headerName: " ", 
      sortable: false,
      filter: false, 
      field: "links[0].href", 
      cellRendererFramework: (params) => <EditCustomer editCustomer={editCustomer} row={params}/>
    }
  ];
  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 600, width: "90%", margin: "auto", padding: 20 }}
    >
      <AddCustomer addCustomer={addCustomer}/>
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellReduction={true}
      />
    </div>
  );
}

export default Customerlist;
