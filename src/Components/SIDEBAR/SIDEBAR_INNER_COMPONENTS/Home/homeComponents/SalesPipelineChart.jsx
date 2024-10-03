import { FaAngleDown } from 'react-icons/fa';
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

// Example data
const data = [
  { month: 'Jan', prospecting: 200, proposal: 300, negotiation: 100 },
  { month: 'Feb', prospecting: 250, proposal: 200, negotiation: 150 },
  { month: 'Mar', prospecting: 150, proposal: 400, negotiation: 200 },
  { month: 'Apr', prospecting: 280, proposal: 250, negotiation: 180 },
  { month: 'May', prospecting: 180, proposal: 300, negotiation: 220 },
  { month: 'Jun', prospecting: 320, proposal: 240, negotiation: 270 },
  { month: 'Jul', prospecting: 200, proposal: 150, negotiation: 120 },
];

const SalesPipelineChart = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-thin text-left mb-4">Sales Pipeline</h2>
        <div className="flex items-center gap-3">
            <div className='flex items-center gap-1'>
                <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                <span>Prospecting</span>
            </div>
            <div className='flex items-center gap-1'>
                <div className="w-3 h-3 rounded-sm bg-cyan-500"></div>
                <span>Proposal</span>
            </div>
            <div className='flex items-center gap-1'>
                <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
                <span>Negotiation</span>
            </div>
            <button className='py-2 px-4 bg-white border border-gray-600 text-gray-700 flex items-center justify-between gap-2 rounded-md'>
            <span>6 months</span>
            <span>
                <FaAngleDown />
            </span>
            </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Bars for different stages */}
          <Bar dataKey="prospecting" fill="#8884d8" barSize={20} />
          <Bar dataKey="proposal" fill="#82ca9d" barSize={20} />
          <Bar dataKey="negotiation" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesPipelineChart;
