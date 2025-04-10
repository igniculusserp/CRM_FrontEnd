import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//------------------Local Import---------------------
import ActivityTab from "./ActivityTab";
import StarredTab from "./StarredTab";
import NoteTab from "./NoteTab";
import CallsTab from "./CallsTab";
import SiteVisit from "./SiteVisit";
import FeedTab from "./FeedTab";
import FollowupsTab from "./FollowupsTab";
import EmailsTab from "./EmailsTab";
import WhatsAppTab from "./WhatsAppTab";
import MergeLeadsTab from "./MergeLeadsTab";

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

export default function LeadDetailsTabs() {
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
        className="rounded-lg !border bg-cyan-100 !font-semibold !text-black !shadow-lg"
        sx={{
          "& .MuiTab-root": {
            fontWeight: "bold",
            minWidth: "0px",
            color: "black",
            padding: "12px 10px",
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
        <Tab label="Activity" />
        <Tab label="Starred" />
        <Tab label="Notes" />
        <Tab label="Calls" />
        <Tab label="Site Visit" />
        <Tab label="Feed" />
        <Tab label="Followups" />
        <Tab label="Emails" />
        <Tab label="Whatsapp" />
        <Tab label="Merge Leads" />

      </Tabs>

      <TabPanel value={value} index={0}>
        <ActivityTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StarredTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NoteTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CallsTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SiteVisit />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <FeedTab />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <FollowupsTab />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <EmailsTab />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <WhatsAppTab />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <MergeLeadsTab />
      </TabPanel>
    </Box>
  );
}
