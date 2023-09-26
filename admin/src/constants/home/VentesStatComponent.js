import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const VentesStatComponent = ({data, dataKey}) => {
    return (
        <div className='ventStatComponent'>
            <h2>statistiques des Offres</h2>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="blue" />
          <Line type="monotone" dataKey={dataKey} stroke="blue" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
        </div>
    );
}

export default VentesStatComponent;
