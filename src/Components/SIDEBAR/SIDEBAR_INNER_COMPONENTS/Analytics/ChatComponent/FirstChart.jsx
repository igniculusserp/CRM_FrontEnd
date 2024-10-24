import {
  Line,
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
  { name: 'Khusi Rana', salesRevenue: 13000, salesVolume: 9000 },
  { name: 'Rajat', salesRevenue: 15000, salesVolume: 12000 },
  { name: 'Suyash', salesRevenue: 14000, salesVolume: 10000 },
  { name: 'Rajesh', salesRevenue: 8000, salesVolume: 7000 },
  { name: 'Rajesh', salesRevenue: 12000, salesVolume: 9000 },
  { name: 'Suyash', salesRevenue: 13000, salesVolume: 10000 },
  { name: 'Rajat', salesRevenue: 10000, salesVolume: 8000 },
  { name: 'Khusi Rana', salesRevenue: 18000, salesVolume: 15000 },
  { name: 'Suyash', salesRevenue: 15000, salesVolume: 12000 },
  { name: 'Rajat', salesRevenue: 17000, salesVolume: 13000 },
  { name: 'Rajesh', salesRevenue: 16000, salesVolume: 11000 },
  { name: 'Rajat', salesRevenue: 12000, salesVolume: 8000 },
];

const FirstChart = ({ text }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg bg-white w-full h-auto">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">{ text }</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-blue-500"></div>
            <h1>Sales Revenue</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-cyan-500"></div>
            <h1>Sales Volume</h1>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="1 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salesVolume" fill="#29b6f6" />
          <Line
            type="monotone"
            dataKey="salesRevenue"
            stroke="#29b6f6"
            strokeWidth={5}
            dot={false}
            fillOpacity={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirstChart;