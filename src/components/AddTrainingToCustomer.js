import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment'; 
import { createTheme, MuiThemeProvider } from "@material-ui/core";



function AddTrainingToCustomer(props) {
  
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
      date: '',
      activity: '',
      duration: '',
      customer: props.row.links[0].href
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = (event) => {
      setTraining({...training, [event.target.name]: event.target.value})
  }

  const dateInputChanged = (value) => {
    setTraining({...training, date: value.toISOString()})

  }


  const handleSave = () => {
    props.addTrainingToCustomer(training);
    handleClose();
  }
  return (
    <div>
      <Button onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training To Customer</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
          label="Date"
          value={training.date}
          onChange={dateInputChanged}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTrainingToCustomer;

