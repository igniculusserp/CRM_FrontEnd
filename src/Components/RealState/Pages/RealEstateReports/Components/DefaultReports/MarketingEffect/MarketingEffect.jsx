import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
//------------------Local Import---------------------
import CampaignInsights from "./Components/CampaignInsights";
import SiteVisitByCampaign from "./Components/SiteVisitByCampaign";
import LeadsReengaged from "./Components/LeadsReengaged";
import LeadLocationAnalysis from "./Components/LeadLocationAnalysis";


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

const MarketingEffect = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <Typography className="!text-xl !font-bold">Marketing Effect</Typography>
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
            <Tab label="Campaign Insights" />
            <Tab label="Site Visit By Campaign" />
            <Tab label="Leads re-engaged" />
            <Tab label="Lead Location Analysis" />

        
          </Tabs>

          <TabPanel value={value} index={0}>
            <CampaignInsights />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SiteVisitByCampaign />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LeadsReengaged />
          </TabPanel>
          <TabPanel value={value} index={3}>
           <LeadLocationAnalysis />
          </TabPanel>
         
        </Box>
      </div>
    </div>
  );
};

export default MarketingEffect;
