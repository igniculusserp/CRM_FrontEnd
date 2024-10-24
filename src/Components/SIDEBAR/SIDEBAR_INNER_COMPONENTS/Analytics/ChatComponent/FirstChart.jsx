import {
  LineChart,
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
  { name: 'Khusi Rana', salesVolume: 8000, salesRevenue: 12000 },
  { name: 'Rajat', salesVolume: 7000, salesRevenue: 9000 },
  { name: 'Suyash', salesVolume: 10000, salesRevenue: 14000 },
  { name: 'Rajesh', salesVolume: 5000, salesRevenue: 10000 },
  { name: 'Rajat', salesVolume: 9000, salesRevenue: 11000 },
  { name: 'Khusi Rana', salesVolume: 12000, salesRevenue: 15000 },
  { name: 'Suyash', salesVolume: 6000, salesRevenue: 13000 },
  { name: 'Rajat', salesVolume: 11000, salesRevenue: 9000 },
  { name: 'Rajesh', salesVolume: 5000, salesRevenue: 11000 },
  { name: 'Rajat', salesVolume: 7000, salesRevenue: 10000 },
];

const FirstChart = () => {
  return (
    <div className="bg-white py-4 px-4 rounded-md shadow-lg">
      <ResponsiveContainer
        width="95%"
        height={250}
        className="ml-[-1.5rem] mb-[-1.4rem] h-10 w-10 rounded-md"
      >
        <BarChart data={data} className='rounded-md'>
          <CartesianGrid strokeDasharray="1 3" className='rounded-md z-10' />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salesVolume" fill="#34d399" radius={[10, 10, 10, 10]} />
        </BarChart>
        <LineChart data={data} width="100%" className="mt-[-17.4rem] ml-12">
          <CartesianGrid strokeDasharray="3 3" className='z-0' />
          <Tooltip />
          <Legend className='hidden' />
          <Line
            type="monotone"
            dataKey="salesRevenue"
            stroke="#6366f1"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirstChart;