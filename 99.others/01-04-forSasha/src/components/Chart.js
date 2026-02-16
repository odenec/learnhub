import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Chart() {
  const data = [
    { name: "Jan", sales: 4000, expenses: 2400 },
    { name: "Feb", sales: 3000, expenses: 1398 },
    { name: "Mar", sales: 2000, expenses: 9800 },
    { name: "Apr", sales: 2780, expenses: 3908 },
    { name: "May", sales: 1890, expenses: 4800 },
    { name: "Jun", sales: 2390, expenses: 3800 },
  ];

  return (
    <div style={{ width: 600, height: 300 }}>
      <h3>Продажи и расходы</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
export default Chart;
