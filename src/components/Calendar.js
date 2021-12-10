import React, { useState, useEffect } from 'react'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";




const TrainingCalendar = props => {
    const localizer = momentLocalizer(moment)
     const [trainings, setTrainings] = useState([]);
    useEffect(() => fetchData(), []);
    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
          .then((response) => response.json())
          .then((data) => setTrainings(data))
          .catch((err) => console.error(err));
      }

    
        const eventList = trainings.map(event => ({
          id: event.id,
          title: `${event.activity} \ ${event.customer.firstname} ${event.customer.lastname}`,
          start: moment(event.date).toDate(), 
          end: moment(event.date).add(event.duration, 'minutes').toDate()}))

          console.log(eventList);
    
    return(
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        defaultDate={new Date()}
        startAccessor="start"
        endAccessor="end"
      />
    </div>

)
    }    



export default TrainingCalendar;