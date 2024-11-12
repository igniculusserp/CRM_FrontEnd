import { useState } from 'react';
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

const data = [
  { name: 'Conversation', value: 500 },
  { name: 'FollowUp', value: 300 },
  { name: 'Inpipeline', value: 500 },
];

const BottomChart = ({ text, color }) => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterDropdownText, setFilterDropdownText] = useState('6 Months');

  // TOGGLE FILTER DATE DROPDOWN
  const toggleFilterDropdown = () => {
    setFilterDropdown(!filterDropdown);
  };

  const handleFilterDropdown = (name) => {
    setFilterDropdownText(name);
    setFilterDropdown(!filterDropdown);
    setText((prev) => ({
      ...prev,
      [name]: name,
    }));
  };

  const filterData = [
    { id: 1, name: '3 months' },
    { id: 1, name: '6 months' },
    { id: 1, name: '1 years' },
  ];

  return (
    <div className="w-full h-60 py-9 px-4 bg-white rounded shadow-lg">
      <div className="flex items-center justify-between mt-[-.8rem]">
        <h2 className="text-lg font-semibold mb-[2px]">{text}</h2>
        {/* ------------ FILTER DROPDOWN START -------------- */}
        <div
          className="relative"
          onClick={toggleFilterDropdown}
          onMouseLeave={() => setFilterDropdown(false)}
        >
          <button
            className="py-2 px-4 border rounded-md  flex justify-between items-center min-w-40 max-w-44 truncate"
            id="filter"
            type="button"
          >
            {filterDropdownText}
            <FaAngleDown className="ml-2 text-gray-900" />
          </button>
          {filterDropdown && (
            <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
              <ul className="py-2 text-sm text-gray-700">
                {filterData.map(({ id, name }) => (
                  <li
                    key={id}
                    className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                    onClick={() => handleFilterDropdown(name)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* ------------ FILTER DROPDOWN END -------------- */}
      </div>
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