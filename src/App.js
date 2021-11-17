import React from 'react';
import './App.css';
import Customerlist from './components/customer';
import Traininglist from './components/training';
import AppBar from '@mui/material/AppBar'; 
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <Router>
       <div className="App">
         <Link to="/">Home</Link>
         <Link to="/customers">Customer</Link>
          <Link to="/trainings">Trainings</Link>
         <Switch>
           <Route path="/customers" component={Customerlist}>
           </Route>
           <Route path="/trainings" component={Traininglist}>
             <Traininglist/>
           </Route>
         </Switch>
    </div>
    </Router>
   
  );
}

export default App;
