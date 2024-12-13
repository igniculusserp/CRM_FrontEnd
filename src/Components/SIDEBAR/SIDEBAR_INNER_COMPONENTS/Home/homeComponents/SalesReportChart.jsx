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

const SalesReportChart = ({ businessType }) => {
  console.log(businessType, 'Inside Chart');

  // Example data
  const data = [
    businessType === 'Brokerage'
      ? { name: 'Shubham', target: 0, targetAchieved: 1000 }
      : { time: '01:00', income: 250, expenses: 93 },
    businessType === 'Brokerage'
      ? { name: 'Shreyash', target: 50000, targetAchieved: 2000 }
      : { time: '01:00', income: 200, expenses: 100 },
    businessType === 'Brokerage'
      ? { name: 'Niranjan', target: 50000, targetAchieved: 20000 }
      : { time: '01:00', income: 180, expenses: 110 },
    businessType === 'Brokerage'
      ? { name: 'Nitin', target: 50000, targetAchieved: 40000 }
      : { time: '01:00', income: 250, expenses: 150 },
    businessType === 'Brokerage'
      ? { name: 'Manish', target: 50000, targetAchieved: 11000 }
      : { time: '01:00', income: 205, expenses: 93 },
    businessType === 'Brokerage'
      ? { name: 'Tarun', target: 50000, targetAchieved: 8000 }
      : { time: '01:00', income: 105, expenses: 93 },
    businessType === 'Brokerage'
      ? { name: 'Jaya', target: 50000, targetAchieved: 90000 }
      : { time: '01:00', income: 195, expenses: 93 },
  ];

  return (
    <>
      {businessType === "Brokerage" ? (
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-thin text-left mb-4">Sales Report</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8884d8] rounded-sm"></div>
                <span>Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#82ca9d] rounded-sm"></div>
                <span>Target Achieved</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                {/* Gradient for Incomes */}
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                {/* Gradient for Expenses */}
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="name"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorIncome)"
                strokeWidth={3}
                dot={{ stroke: '#8884d8', strokeWidth: 2, fill: '#8884d8' }}
                activeDot={{ r: 6 }}
              />
              {/* Area for Incomes */}
              <Area
                type="monotone"
                dataKey="target"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorIncome)"
                strokeWidth={3}
                dot={{ stroke: '#8884d8', strokeWidth: 2, fill: '#8884d8' }}
                activeDot={{ r: 6 }}
              />

              {/* Area for Expenses */}
              <Area
                type="monotone"
                dataKey="targetAchieved"
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
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-thin text-left mb-4">Sales Report</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8884d8] rounded-sm"></div>
                <span>Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#82ca9d] rounded-sm"></div>
                <span>Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                {/* Gradient for Incomes */}
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                {/* Gradient for Expenses */}
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />

              {/* Area for Incomes */}
              <Area
                type="monotone"
                dataKey="income"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorIncome)"
                strokeWidth={3}
                dot={{ stroke: '#8884d8', strokeWidth: 2, fill: '#8884d8' }}
                activeDot={{ r: 6 }}
              />

              {/* Area for Expenses */}
              <Area
                type="monotone"
                dataKey="expenses"
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
      )}
    </>
  );
};

export default SalesReportChart;