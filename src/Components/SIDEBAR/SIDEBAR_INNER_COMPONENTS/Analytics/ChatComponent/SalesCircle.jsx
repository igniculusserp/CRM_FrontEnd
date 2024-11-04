
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from 'recharts';

const SalesCircle = ({ todaysGrowthPercentage, color }) => {
  const [growthCircle, setGrowthCircle] = useState(0); 

  useEffect(() => {
    // Check the todaysGrowthPercentage
    if (todaysGrowthPercentage >= 100) {
      setGrowthCircle(100);
    } else if (todaysGrowthPercentage < 0) {
      setGrowthCircle(Math.abs(todaysGrowthPercentage)); 
    } else {
      setGrowthCircle(todaysGrowthPercentage);
    }
  }, [todaysGrowthPercentage]);

  // Data for the pie chart
  const data = [
    { name: 'Growth', value: growthCircle }, 
    { name: 'Remaining', value: 100 - growthCircle } 
  ];

  // Define colors based on the provided color prop
  const COLORS = color === "green" ? ["green", "#EBF8FF"] : ["red", "#FFCCCC"]; 

  return (
    <PieChart width={80} height={80}>
      <Pie
        data={data}
        dataKey="value"
        startAngle={360}
        endAngle={0}
        innerRadius={25}
        outerRadius={38} 
        paddingAngle={0}
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default SalesCircle;
