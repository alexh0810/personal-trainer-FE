import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { groupBy, mapValues, sumBy } from 'lodash';




const ActivityChart  = (props) => {

  const data = props.data;

    return (
    <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="value" fill="#8884cd8"/>
        </BarChart>
        </ResponsiveContainer>
    )
}

export default ActivityChart;
