import { FaRupeeSign } from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Revenue', value: 45456 },
  { name: 'Sales', value: 8550 },
  { name: 'Views', value: 28550 },
];

const LeadSourceChart = () => {
  return (
    <>
      <div style={{ width: '100%', height: 300 }}>
        <h3 className="text-xl font-thin mb-1">Lead Source</h3>
        <div className="flex text-sm items-center justify-between gap-2">
          <div className="flex items-center flex-col">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-md"></div>
              <span className="text-md ">Total Revenue</span>
            </div>
            <p className="flex jusitify-center items-center text-xs  my-1">
              <FaRupeeSign />
              45,456.00 Rs
            </p>
          </div>
          <div className="flex items-center flex-col">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-md"></div>
              <span className="text-sm ">Total Sales</span>
            </div>
            <p className="flex jusitify-center items-center text-xs  my-1">
            <FaRupeeSign />
            45,456.00 Rs
          </p>
          </div>
          <div className="flex items-center flex-col">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-md"></div>
              <span className="text-sm ">Total Views</span>
            </div>
            <p className="flex jusitify-center items-center text-xs  my-1">
              <FaRupeeSign />
              45,456.00 Rs
            </p>
          </div>
        </div>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fillOpacity={0.3}
              fill="rgba(136, 132, 216, 0.5)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LeadSourceChart;
