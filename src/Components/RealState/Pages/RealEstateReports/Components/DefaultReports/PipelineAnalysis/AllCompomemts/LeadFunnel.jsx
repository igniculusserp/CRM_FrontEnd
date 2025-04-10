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
  { name: "Opportunity", Total: 4 },
  { name: "Booked", Total: 6 },
  { name: "RNR", Total: 8 },
  { name: "Site Visit", Total: 8 },
  { name: "RNRR", Total: 8 },
  { name: "In Negotiation", Total: 8 },
];

// ✅ Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-md border bg-white p-2 shadow-md">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index}>
            {entry.name}: {entry.value} Leads
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
    }),
  ),
};

// Custom X-Axis Tick Component
const CustomXAxisTick = ({ x, y, payload }) => {
  const lead = leadsData.find((lead) => lead.name === payload.value);
  if (!lead) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" fontSize={12} fill="#333">
        <tspan x="0" dy="0.8em">
          {lead.name} {lead.Total}
        </tspan>
      </text>
    </g>
  );
};

CustomXAxisTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

const LeadFunnel = () => {
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
      {/* Main Chart */}
      <Paper
        elevation={1}
        className="flex flex-col gap-6 rounded-xl border p-4"
      >
        {/* Header */}
        <Box className="flex items-center justify-between gap-2">
          <Typography variant="h6" className="!font-semibold">
            Lead Funnel
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
              <XAxis
                dataKey="name"
                tick={<CustomXAxisTick />}
                tickLine={false}
                interval={0}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  top: "-30px",
                  left: 20,
                  position: "absolute",
                }}
              />
              <Bar dataKey="Total" fill="#4F46E5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Modal for Large View */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute left-1/2 top-1/2 flex w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-white p-6 shadow-lg">
          <Typography variant="h6" className="font-semibold">
            Lead Funnel
          </Typography>

          {/* Large Chart */}
          <div
            ref={chartRef}
            className="rounded-lg bg-white bg-opacity-75 p-4 shadow-md"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={leadsData} barSize={30}>
                <XAxis
                  dataKey="name"
                  tick={<CustomXAxisTick />}
                  tickLine={false}
                  interval={0}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Total" fill="#4F46E5" radius={[10, 10, 0, 0]} />
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

export default LeadFunnel;
