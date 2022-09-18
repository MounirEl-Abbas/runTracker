import {
  BarChart as BChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="5 5 " />
        <XAxis dataKey="date" stroke="#a1a1a5" />
        <YAxis allowDecimals={false} stroke="#a1a1a5" />
        <Tooltip
          wrapperStyle={{ color: "#2cb1bc" }}
          cursor={{ fill: "#434344", opacity: 0.5 }}
        />
        <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
      </BChart>
    </ResponsiveContainer>
  );
};
export default BarChart;
