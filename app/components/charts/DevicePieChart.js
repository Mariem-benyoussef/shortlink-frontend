import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DevicePieChart({ data }) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ device, clicks }) => `${device}: ${clicks}`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="clicks"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend 
        payload={data.map((entry, index) => ({
          id: entry.device,
          type: "square",
          value: entry.device,
          color: COLORS[index % COLORS.length]
        }))}
      />
    </PieChart>
  );
}