import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Conversation', value: 500 },
  { name: 'FollowUp', value: 300 },
  { name: 'Inpipeline', value: 500 },
];

const BottomChart = ({ text, color }) => {
  return (
    <div className="w-full h-60 p-6 bg-white rounded shadow-lg">
      <h2 className="text-lg font-semibold mb-[2px]">{ text }</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 10, left: 45, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BottomChart;