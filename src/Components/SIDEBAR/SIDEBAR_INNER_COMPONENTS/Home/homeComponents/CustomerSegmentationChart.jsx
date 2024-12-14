import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';

const data = [
  {
    name: 'Small Business',
    value: 1650,
    color: '#2563eb',
    change: 424,
    increase: true,
  },
  {
    name: 'Enterprise',
    value: 350,
    color: '#fdba74',
    change: 24,
    increase: true,
  },
  {
    name: 'Company',
    value: 350,
    color: '#ef4444',
    change: 24,
    increase: false,
  },
];

const data1 = [
  {
    name: 'Company',
    value: 350,
    color: '#ef4444',
    change: 24,
    increase: false,
  },
];

const CustomerSegmentationChart = ({ totalBrokerage, businessType }) => {
  const activeData = businessType === "Brokerage" ? data1 : data;

  return (
    <div className="flex flex-col items-center relative">
      <PieChart width={160} height={160}>
        <Pie
          data={activeData}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {activeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

      <div className="absolute text-center top-14 bottom-8">
        <p>Total</p>
        <p className="text-2xl font-semibold">{totalBrokerage}</p>
      </div>
    </div>
  );
};

CustomerSegmentationChart.propTypes = {
  totalBrokerage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  businessType: PropTypes.string.isRequired,
};

export default CustomerSegmentationChart;
