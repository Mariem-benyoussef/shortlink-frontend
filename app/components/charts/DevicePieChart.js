import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DevicePieChart = ({ data }) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Ensure data is defined and not empty before trying to render
  if (!data || data.length === 0) {
    return <div>No data available</div>;  // Show fallback if no data
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="screenPageViews"
          nameKey="deviceCategory"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DevicePieChart;
