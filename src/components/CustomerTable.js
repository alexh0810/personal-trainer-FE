import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AddTrainingToCustomer from "./AddTrainingToCustomer";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import Card from '@mui/material/Card';




function CustomerTable() {

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline color="secondary" {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit color="primary" {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
      };

const [data, setData] = useState([]);
const url = "https://customerrest.herokuapp.com/api/customers"
useEffect(() => fetchData(), []);
  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.content))
      .then((err) => console.error(err));
  };

  const addTrainingToCustomer = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training), 
    }).then((response) => {
      if(response.ok) {
        fetchData();
      } else { 
        alert("Something went wrong")
      }
    })
    .catch(err => console.error(err));
  };
    
   
  const [columns, setColumns] = useState([
    {
        field: 'links[0].href', 
        render: params => <AddTrainingToCustomer addTrainingToCustomer={addTrainingToCustomer} row={params}/>
    },
    { title: 'Firstname', field: 'firstname' },
    { title: 'Lastname', field: 'lastname'},
    { title: 'Address', field: 'streetaddress' },
    { title: 'Postcode', field: 'postcode'},
    { title: 'City', field: 'city' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' }, 
  ]);


   return (
       <MaterialTable
        components={{
        Container: props => (
          <Card {...props}/>
        )
      }}
        title="Customers"
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{
            exportButton: true,
            exportAllData: true
        }}
    
        editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                // BE call 
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify(newData)
                    }).then(resp => resp.json())
                    .then(resp => {fetchData()
                        resolve()
                })
            }),
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                // BE call 
                fetch(oldData.links[0].href, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify(newData)
                    }).then(resp => resp.json())
                    .then(resp => {fetchData()
                        resolve()
                })
            }), 
            onRowDelete: (oldData) => new Promise((resolve, reject) => {
                // BE call 
                fetch(oldData.links[0].href, {
                    method: 'DELETE'}).then(resp =>  {
                        if (resp.ok) {
                            fetchData()
                        } else {
                            alert("Something is wrong");
                        }
                        resolve()
                    })
                })           
          }}
        />
      )
    }
    

    export default CustomerTable;