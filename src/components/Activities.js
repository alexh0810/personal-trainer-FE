import ActivityChart from "./ActivityChart";
import React, { useState, useEffect } from 'react';
import { groupBy, mapValues, sumBy } from 'lodash';

const Activities = () => {
    const [chartData, setChartData] = useState([]);
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then((response) => response.json())
        .then((data) => calculateDuration(data))
        .then((data) => setChartData(data))
        .catch((err) => console.error(err));
    }

     const calculateDuration = (trainings) => {
    const trainingByActivity = groupBy(trainings, 'activity');
    console.log(trainingByActivity);
    const activityObj = {}
    for (const key in trainingByActivity) {
        activityObj[key] = sumBy(trainingByActivity[key], 'duration');
    }
    console.log(activityObj);

    const data = [];
    for (const key in activityObj) {
        const obj = {name: key, value: activityObj[key]}
        data.push(obj)
    }
    
    console.log(data)
  
    return (
        <div>
            <ActivityChart chartData={data} />
        </div>

    )

     }

     export default Activities; 