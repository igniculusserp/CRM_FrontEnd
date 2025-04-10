
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  [
    { name: "Name 1", value: 30, color: "#3498db" },
    { name: "Name 2", value: 45, color: "#1abc9c" },
    { name: "Name 3", value: 60, color: "#8e44ad" },
  ],
  [
    { name: "Prospect", value: 25, color: "#e67e22" },
    { name: "Incoming", value: 50, color: "#f1c40f" },
    { name: "Booked", value: 65, color: "#2ecc71" },
  ],
  [
    { name: "Project 1", value: 35, color: "#e74c3c" },
    { name: "Project 2", value: 55, color: "#9b59b6" },
    { name: "Project 3", value: 70, color: "#3498db" },
  ],
  [
    { name: "Source 1", value: 28, color: "#1abc9c" },
    { name: "Source 2", value: 47, color: "#2ecc71" },
    { name: "Source 3", value: 63, color: "#e74c3c" },
  ],
];

const BookingsBarChart = () => {
  const chartTitles = [
    "Lead By Sales",
    "Lead By Stage",
    "Lead By Interested Project(s)",
    "Lead By Interested Source(s)",
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {chartData.map((data, index) => (
        <div key={index} className="!rounded-3xl border bg-white  shadow-md">
            {/* Heading */}
          <div className="  p-4" style={{borderBottom:"1px solid gray"}}>
            <h2 className=" text-lg font-semibold">{chartTitles[index]}</h2>
          </div>
          {/* Chart Body */}
          <div className=" p-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} barSize={30}>
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: 'XYZ',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' },
                }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]} // Rounded bar corners
                shape={(props) => (
                  <rect
                    {...props}
                    fill={props.payload.color}
                    width={20} 
                    radius={[10, 10, 0, 0]} 
                    // rx="10"
        ry="10"
                  />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsBarChart;
