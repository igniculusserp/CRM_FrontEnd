import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//------------------Local Import---------------------
import Basics from "./Basics";
import Projects from "./Projects";
import Tower from "./Tower";
import FLoorPlan from "./FLoorPlan";
import Units from "./Units";
import ResaleUnits from "./ResaleUnits";

function TabPanel({ value, index, children }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ height: "calc(100vh - 140px)" }}
    >
      {value === index && (
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            py: 3,
            px: 1,
            my: 1,
            "&::-webkit-scrollbar": { display: "none" }, // For Chrome, Safari
            "-ms-overflow-style": "none", // For IE and Edge
            "scrollbar-width": "none", // For Firefox
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// PropTypes validation
TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default function InventoryTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="bold tabs example"
        variant="scrollable"
        scrollButtons="auto"
        className="rounded-lg bg-cyan-100 !font-semibold !text-black"
        sx={{
          "& .MuiTab-root": {
            fontWeight: "bold",
            color: "black",
            minWidth: "100px", // Ensures each tab has space to expand
          },
          "& .Mui-selected": {
            color: "black",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#04A8CB",
            height: "4px",
            borderRadius: "5px",
          },
        }}
      >
        <Tab label="Basics" />
        <Tab label="Projects" />
        <Tab label="Project Towers" />
        <Tab label="Floor Plans" />
        <Tab label="Units" />
        <Tab label="Resale Units" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Basics />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Projects />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tower />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FLoorPlan />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Units />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ResaleUnits />
      </TabPanel>
    </Box>
  );
}
