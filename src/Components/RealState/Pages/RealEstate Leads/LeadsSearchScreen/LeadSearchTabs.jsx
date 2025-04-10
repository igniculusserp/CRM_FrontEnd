import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//------------------- MUI Imports ----------------
import {
  Box,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LeadDetails from "./LeadDetails";
import LeadDelete from "./LeadDelete";
import ModifyLeadsStage from "./ModifyLeadsStage";


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


export default function LeadSearchTabs() {
    const navigate = useNavigate();

   //--------------------------------------- Set Business Type --------------------------------------------
   const [businessType, setBusinessType] = useState("");

   useEffect(() => {
     const storedType = localStorage.getItem("businessType") || "";
     setBusinessType(storedType);
   }, []);

   //--------------------------------------- Handle Tabs ------------------------------------------
     const [value, setValue] = useState(0);
   
     const handleChange = (event, newValue) => {
       setValue(newValue);
     };

  return (
    <div className="flex h-full flex-col gap-6 bg-gray-200 p-6 max-[400px]:p-1 max-[400px]:py-4">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="flex w-full gap-3 rounded-md bg-white p-2">
        <Typography
          sx={{ width: "fit-content" }}
       className="rounded-md !bg-cyan-500 px-3 py-1 text-sm !text-white cursor-pointer"
        >
          Search
        </Typography>
        <Typography
          sx={{ width: "fit-content" }}   
             className="rounded-md !bg-gray-200 px-3 py-1 text-sm !text-black cursor-pointer hover:!bg-cyan-400 hover:!text-white"
             onClick={() => {
              navigate(`/panel/${businessType}/leads`);
            }}
        >
          All Leads
        </Typography>
      </Box>
     {/* ----------------------------------------- Tabs ----------------------------------- */}
     <Box className="p-3 bg-white rounded-lg shadow-md ">
 <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="bold tabs example"
        variant="scrollable"
        scrollButtons="auto"
        className="rounded-lg  px-2 bg-cyan-100 !font-semibold !text-black"
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
        {/* Tabs Heading */}
        <Tab label="Lead Details" />
        <Tab label="Lead Delete" />
        <Tab label="Change Stage Of Leads" />
      </Tabs>
{/* Tabs Data */}
      <TabPanel value={value} index={0}> 
        <LeadDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LeadDelete />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ModifyLeadsStage />
      </TabPanel>
     
    </Box>
    </Box>
    </div>
  );
}
