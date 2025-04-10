import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//------------------Local Import---------------------
import ListSiteVist from "./ListSiteVist";
import ListTask from "./ListTask";
import ListFollowUp from "./ListFollowUp";

function TabPanel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ height: "calc(100vh - 38px)"}}>
      {value === index && (
        <Box
          sx={{
            overflow: "auto",
            py: 3,
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

export default function ListTabs() {
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
        className="rounded-lg !border px-2 py-1 !font-semibold !text-black !shadow-lg"
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
        <Tab label="Site Visits" />
        <Tab label="Follow Ups" />
        <Tab label="Tasks" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ListSiteVist />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListFollowUp />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ListTask />
      </TabPanel>
    </Box>
  );
}
