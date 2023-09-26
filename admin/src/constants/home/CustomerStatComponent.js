import React, { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MyStore } from "../../context/myStore";
import GroupsIcon from '@mui/icons-material/Groups';
const CustomerStatComponent = ({ data, dataKey }) => {
  const {users} = useContext(MyStore)
  return (
    <div className="customerStatComponent">
      <h2>Statistique des utilisateurs</h2>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="blue" />
          <Line type="monotone" dataKey={dataKey} stroke="blue" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      <p style={{margin:20}}>Nombres d'utilisateurs  <GroupsIcon style={{color:'red', margin:10}}/>  {users.length}  </p>
    </div>
  );
};

export default CustomerStatComponent;
