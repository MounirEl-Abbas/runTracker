import {
  AreaChart as AChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <AChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="1 1 " />
        <XAxis dataKey="date" stroke="#a1a1a5" />
        <YAxis allowDecimals={false} stroke="#a1a1a5" />
        <Tooltip wrapperStyle={{ color: "#2cb1bc" }} />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AChart>
    </ResponsiveContainer>
  );
};
export default AreaChart;
