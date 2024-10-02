import ReactECharts from 'echarts-for-react';

const ProgressBarChart = () => {
  const option = {
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.1],
      axisLabel: {
        formatter: '{value}',
      },
    },
    yAxis: {
      type: 'category',
      data: ['Entire Org'],
      axisLabel: {
        formatter: '{value}',
        margin: 20,
      },
    },
    series: [
      {
        type: 'bar',
        data: [700000], // The actual value for the progress bar
        barWidth: 60,
        itemStyle: {
          normal: {
            color: '#87CEFA',
          },
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '${c}', // Display value inside bar
          fontSize: 16,
          color: '#000',
        },
      },
    ],
    grid: {
      left: '5%',
      right: '10%',
      top: '10%',
      bottom: '10%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        return `Target: $10,000.00<br/>Achieved: $${params[0].value}`;
      },
    },
    markLine: {
      data: [
        {
          name: 'Target',
          xAxis: 10000, // The target value
        },
      ],
      lineStyle: {
        color: '#000', // Target line color
        type: 'solid',
      },
      label: {
        formatter: 'Target: $10,000.00',
        position: 'start',
        fontSize: 14,
      },
    },
  };

  return (
    <div className='w-[100%] h-[200px]'>
      <ReactECharts option={option} style={{ height: 200 }} />
    </div>
  );
};

export default ProgressBarChart;