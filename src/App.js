import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TrainingCalendar from './components/Calendar';
import CustomerTable from './components/CustomerTable';
import TrainingTable from './components/TrainingTable';
import NavBar from './components/NavBar';
import Activities from './components/Activities';





function App() {
  return (
    <Router>
       <div className="App">
         <NavBar />
         <Switch>
           <Route path="/customers" component={CustomerTable}>
           </Route>
           <Route path="/trainings" component={TrainingTable}>
           </Route>
           <Route path="/calendar" component={TrainingCalendar}>
           </Route>
           <Route path="/chart" component={Activities}></Route>
         </Switch>
    </div>
    </Router>
  )
}

export default App;
