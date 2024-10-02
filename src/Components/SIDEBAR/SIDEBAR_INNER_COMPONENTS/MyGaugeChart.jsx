import { PieChart, Pie, Cell } from 'recharts';

export default function MyGaugeChart() {
  // Data for the gauge chart
  const data = [{ value: 10 }, { value: 90 }];

  const COLORS = ['#85C1E9', '#E9ECEF'];

  return (
    <div style={{ textAlign: 'center' }}>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={90}
          outerRadius={130}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      {/* Needle */}
      <div
        style={{
          position: 'relative',
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '80px solid #6C757D',
          transform: 'rotate(88deg)',
          marginBottom: '-230px',
          margin: '-120px 0 auto',
          left: '143px',
          bottom: '71px'
        }}
      />
      {/* Label */}
      <div
        style={{ textAlign: 'center', marginTop: '-110px', marginLeft: '200px' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
          Target: 1000
        </span>
      </div>
    </div>
  );
}
