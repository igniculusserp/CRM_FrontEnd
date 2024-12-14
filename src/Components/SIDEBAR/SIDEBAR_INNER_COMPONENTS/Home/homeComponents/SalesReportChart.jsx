import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { tenant_base_url, protocal_url } from '../../../../../Config/config';
import { getHostnamePart } from '../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl';
import axios from 'axios';

const SalesReportChart = ({ businessType, totalBrokerage }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [targetAchieved, setTargetAchieved] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    // Fetching details and calculating current week only once on mount
    getDetails();
    setCurrentWeek(getCurrentWeek());
  }, []);

  const getDetails = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/targetreports/byusertoken`,
        config
      );
      if (response.status === 200) {
        const Details = response.data.data.totalTarget;
        setTargetAchieved(Details);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Get the current week number within the current month
  const getCurrentWeek = () => {
    const date = new Date();
    const currentDate = date.getDate(); // Get the current day of the month
    const currentMonth = date.getMonth(); // Get the current month (0-indexed)

    // Calculate the starting date of the current month
    const startOfMonth = new Date(date.getFullYear(), currentMonth, 1);
    const startDay = startOfMonth.getDay(); // Day of the week the month starts

    // Calculate the offset of the first week
    const adjustedStartDate = currentDate + startDay;
    
    // Calculate the current week in the current month
    return Math.ceil(adjustedStartDate / 7);
  };

  const brokerage = totalBrokerage / 4;
  const traget = targetAchieved / 4;

  // Data for Brokerage
  const brokerageData = [
    { name: 'Week Start', target: 0, targetAchieved: 0 },
    {
      name: 'First Week',
      target: brokerage * 1,
      targetAchieved: currentWeek >= 1 ? traget * 1 : null,
    },
    {
      name: 'Second Week',
      target: brokerage * 2,
      targetAchieved: currentWeek >= 2 ? traget * 2 : null,
    },
    {
      name: 'Third Week',
      target: brokerage * 3,
      targetAchieved: currentWeek >= 3 ? traget * 3 : null,
    },
    {
      name: 'Fourth Week',
      target: brokerage * 4,
      targetAchieved: currentWeek >= 4 ? traget * 4 : null,
    },
  ];

  // Data for Income/Expense (non-Brokerage)
  const incomeExpenseData = [
    { time: '01:00', income: 250, expenses: 93 },
    { time: '02:00', income: 200, expenses: 100 },
    { time: '03:00', income: 180, expenses: 110 },
    { time: '04:00', income: 250, expenses: 150 },
    { time: '05:00', income: 250, expenses: 150 },
  ];

  // Select data based on businessType
  const data = businessType === 'Brokerage' ? brokerageData : incomeExpenseData;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-thin text-left mb-4">Sales Report</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#8884d8] rounded-sm"></div>
            <span>{businessType === 'Brokerage' ? 'Target' : 'Income'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#82ca9d] rounded-sm"></div>
            <span>{businessType === 'Brokerage' ? 'Target Achieved' : 'Expenses'}</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey={businessType === 'Brokerage' ? 'name' : 'time'} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />

          {/* Area for Target or Income */}
          <Area
            type="monotone"
            dataKey={businessType === 'Brokerage' ? 'target' : 'income'}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorIncome)"
            strokeWidth={3}
            dot={{ stroke: '#8884d8', strokeWidth: 2, fill: '#8884d8' }}
            activeDot={{ r: 6 }}
          />

          {/* Area for Target Achieved or Expenses */}
          <Area
            type="monotone"
            dataKey={businessType === 'Brokerage' ? 'targetAchieved' : 'expenses'}
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorExpenses)"
            strokeWidth={3}
            dot={{ stroke: '#82ca9d', strokeWidth: 2, fill: '#82ca9d' }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

SalesReportChart.propTypes = {
  businessType: PropTypes.string.isRequired,
  totalBrokerage: PropTypes.number.isRequired,
};

export default SalesReportChart;
