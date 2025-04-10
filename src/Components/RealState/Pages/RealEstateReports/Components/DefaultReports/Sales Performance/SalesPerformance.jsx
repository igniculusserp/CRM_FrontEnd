import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
//------------------Local Import---------------------
import LeadStatisticsAgainstSales from "./AllComponents/LeadStatisticsAgainstSales";
import UsersTargetAnalysis from "./AllComponents/UsersTargetAnalysis";
import ConductedSiteVisit from "./AllComponents/ConductedSiteVisit";
import FollowUpsChart from "./AllComponents/FollowUpsChart";
import BookingChart from "./AllComponents/BookingChart";
import LeadsReassigment from "./AllComponents/LeadsReassigment";
import UserTrackingDetails from "./AllComponents/UserTrackingDetails";

function TabPanel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
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

const SalesPerformance = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <Typography className="!text-xl !font-bold">Sales Performance</Typography>
      <div className="rounded-lg bg-white p-3 shadow-sm">
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
            <Tab label="Lead Statistics Against Sales" />
            <Tab label="Users Target Analysis" />
            <Tab label="Site Visit By Sales" />
            <Tab label="Conducted Site Visit By Stages" />
            <Tab label="Follow Ups" />
            <Tab label="Booking" />
            <Tab label="Leads Reassigment" />
            <Tab label="Untouched Attempts" />
            <Tab label="User Tracking Details" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <LeadStatisticsAgainstSales />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UsersTargetAnalysis />
          </TabPanel>
          <TabPanel value={value} index={2}>
            3
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ConductedSiteVisit />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <FollowUpsChart />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <BookingChart />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <LeadsReassigment />
          </TabPanel>
          <TabPanel value={value} index={7}>
            8
          </TabPanel>
          <TabPanel value={value} index={8}>
            <UserTrackingDetails />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default SalesPerformance;
