import { PieChart, Pie, Cell } from 'recharts';

const data = [
  {
    name: 'Small Business',
    value: 1650,
    color: '#FF6B6B',
    change: 424,
    increase: true,
  },
  {
    name: 'Enterprise',
    value: 350,
    color: '#FFD66B',
    change: 24,
    increase: true,
  },
  {
    name: 'Enterprise',
    value: 350,
    color: '#5A9BFC',
    change: 24,
    increase: false,
  },
];

const COLORS = data.map((entry) => entry.color);

const CustomerSegmentationChart = () => {
  const totalValue = 2.758;

  return (
    <div className="flex flex-col items-center relative">
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      <div className="absolute text-center top-14 bottom-8">
        <p>Total</p>
        <p className="text-2xl font-semibold">{totalValue.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CustomerSegmentationChart;