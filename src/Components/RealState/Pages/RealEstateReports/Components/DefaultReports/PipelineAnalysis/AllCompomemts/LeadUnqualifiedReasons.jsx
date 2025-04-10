import { useState, useRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography, Paper, Divider, Button, Modal } from "@mui/material";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";
//--------------------- React Icon --------------------
import { MdCloudDownload } from "react-icons/md";

const leadsData = [
  {
    name: "Amar",
    newLeads: 3,
    opportunity: 2,
    totalLeads: 5,
    percentage: "1.33%",
  },
  {
    name: "Rahul Singh",
    newLeads: 4,
    opportunity: 0,
    totalLeads: 2,
    percentage: "0.67%",
  },
  {
    name: "Priya Sharma",
    newLeads: 6,
    opportunity: 0,
    totalLeads: 9,
    percentage: "3.00%",
  },
  {
    name: "Sneha Verma",
    newLeads: 8,
    opportunity: 0,
    totalLeads: 10,
    percentage: "3.33%",
  },
];

// ✅ Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-md border bg-white p-2 shadow-md">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index}>
            {entry.name}: {entry.value} Leads ({entry.payload.percentage})
          </p>
        ))}
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      payload: PropTypes.shape({
        percentage: PropTypes.string,
      }),
    }),
  ),
};

// Custom X-Axis Tick Component (for multiline labels)
const CustomXAxisTick = ({ x, y, payload }) => {
  const lead = leadsData.find((lead) => lead.name === payload.value);
  if (!lead) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" fontSize={12} fill="#333">
        <tspan x="0" dy="0.8em">
          {lead.name}
        </tspan>
        <tspan x="0" dy="1.2em">
          (Total: {lead.totalLeads}/50)
        </tspan>
        <tspan x="0" dy="1.2em">
          ({lead.percentage})
        </tspan>
      </text>
    </g>
  );
};

// ✅ PropTypes validation for ESLint
CustomXAxisTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

const LeadUnqualifiedReasons = () => {
  const [open, setOpen] = useState(false);
  const chartRef = useRef(null);

  // Function to capture and download the chart
  const handleDownload = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "LeadFunnelChart.png";
        link.click();
      });
    }
  };
  return (
    <>
      <Paper
        elevation={1}
        className="flex flex-col gap-6 rounded-xl border p-4"
      >
        {/* Header */}
        <Box className="flex items-center justify-between gap-2">
          <Typography variant="h6" className="!font-semibold">
            Lead Unqualified Reasons
          </Typography>
          <Button
            className="!rounded-lg !px-8 hover:bg-cyan-500 hover:text-white"
            sx={{ border: "1px solid gray" }}
            onClick={() => setOpen(true)}
          >
            View
          </Button>
        </Box>

        <Divider />

        {/* Chart Container */}
        <Box className="mt-5 flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsData} barSize={20}>
              {/* X-Axis with Custom Tick */}
              <XAxis
                dataKey="name"
                tick={<CustomXAxisTick />}
                tickLine={false}
                interval={0} // Show all labels
              />

              {/* Side Scale */}
              <YAxis />

              {/* ToolTip */}
              <Tooltip content={<CustomTooltip />} />

              {/* Label */}
              <Legend
                wrapperStyle={{
                  top: "-30px",
                  left: 20,
                  position: "absolute",
                }}
              />

              <Bar dataKey="newLeads" fill="#4F46E5" radius={[10, 10, 0, 0]} />
              <Bar
                dataKey="opportunity"
                fill="#06B6D4"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      {/* Modal for Large View */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute left-1/2 top-1/2 flex w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-white p-6 shadow-lg">
          <Typography variant="h6" className="font-semibold">
            Lead Unqualified Reasons
          </Typography>

          {/* Large Chart */}
          <div
            ref={chartRef}
            className="rounded-lg bg-white bg-opacity-75 p-4 shadow-md"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={leadsData} barSize={30}>
                {/* X-Axis with Custom Tick */}
                <XAxis
                  dataKey="name"
                  tick={<CustomXAxisTick />}
                  tickLine={false}
                  interval={0} // Show all labels
                />

                {/* Side Scale */}
                <YAxis />

                {/* ToolTip */}
                <Tooltip content={<CustomTooltip />} />

                {/* Label */}
                <Legend
                  wrapperStyle={{
                    top: "-30px",
                    left: 20,
                    position: "absolute",
                  }}
                />

                <Bar
                  dataKey="newLeads"
                  fill="#4F46E5"
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey="opportunity"
                  fill="#06B6D4"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Buttons */}
          <Box className="mt-4 flex justify-end gap-4">
            <Button
              variant="contained"
              onClick={handleDownload}
              className="!gap-3 !rounded-lg !bg-white !px-8 !text-cyan-700 hover:bg-cyan-500 hover:text-white"
              sx={{ border: "1px solid gray" }}
            >
              <MdCloudDownload />
              Download
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              className="!rounded-lg"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LeadUnqualifiedReasons;
