import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IpBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="ip" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#ffc658" name="Clics par IP" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IpBarChart;
