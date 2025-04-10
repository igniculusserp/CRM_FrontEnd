import { useState } from "react";

import { Box, Select, MenuItem, Typography } from "@mui/material";
//----------------------- Local Imports --------------------------------
import CustomReports from "./Components/CustomReports/CustomReports";
import NewCustomReports from "./Components/NewCustomReports/NewCustomReports";
import PipelineAnalysis from "./Components/DefaultReports/PipelineAnalysis/PipelineAnalysis";
import SalesPerformance from "./Components/DefaultReports/Sales Performance/SalesPerformance";
import MarketingEffect from "./Components/DefaultReports/MarketingEffect/MarketingEffect";
import CallReports from "./Components/DefaultReports/CallReports/CallReports";
import InventorySummary from "./Components/DefaultReports/InventorySummary/InventorySummary";


export default function RealEstateReports() {
  //---------------------------------------- All States ---------------------------------
  const [selectedButton, setSelectedButton] = useState("Custom Reports");
  const [selectedReport, setSelectedReport] = useState("");

  return (
    <div className="flex h-fit flex-col gap-8 bg-gray-200 p-6">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="relative flex w-full gap-3 rounded-md bg-white p-2">
        {["Custom Reports", "New Custom Reports", "Default Reports"].map(
          (button) =>
            button === "Default Reports" ? (
              <Box key={button}>
                <Select
                  renderValue={() => "Default Reports"}
                  onChange={(e) => {
                    setSelectedReport(e.target.value);
                    setSelectedButton("Default Reports");
                  }}
                  displayEmpty
                  className={`rounded-md px-3 text-sm transition-all ${
                    selectedButton === "Default Reports"
                      ? "bg-cyan-500 text-white shadow-md" // Active styling
                      : "bg-gray-200 text-black hover:bg-cyan-400 hover:text-white" // Default styling
                  }`}
                  sx={{
                    width: "fit-content",
                    minWidth: 150,
                    borderRadius: "6px",
                    "& .MuiSelect-select": {
                      padding: "8px",
                      fontSize: "16px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  {/* <MenuItem value="Default Reports" disabled>
                    Default Reports
                  </MenuItem> */}
                  <MenuItem value="Pipeline Analysis">Pipeline Analysis</MenuItem>
                  <MenuItem value="Sales Performance">Sales Performance</MenuItem>
                  <MenuItem value="Marketing Effect">Marketing Effect</MenuItem>
                  <MenuItem value="Call Reports">Call Reports</MenuItem>
                  <MenuItem value="Inventory Summary">Inventory Summary</MenuItem>

                </Select>
              </Box>
            ) : (
              <Typography
                key={button}
                sx={{ width: "fit-content" }}
                className={`!flex cursor-pointer !items-center !justify-center rounded-md !px-3 !py-1 text-sm transition-all ${
                  selectedButton === button
                    ? "bg-cyan-500 text-white shadow-md"
                    : "bg-gray-200 text-black hover:bg-cyan-400 hover:text-white"
                }`}
                onClick={() => setSelectedButton(button)}
              >
                {button}
              </Typography>
            ),
        )}
      </Box>

      {/* --------------------------- Tabs Import Section ------------------------ */}
      {selectedButton === "Custom Reports" ? <CustomReports /> : ""}
      {selectedButton === "New Custom Reports" ? <NewCustomReports /> : ""}
      {selectedButton === "Default Reports" && selectedReport==="Pipeline Analysis" ? <PipelineAnalysis /> : ""}
      {selectedButton === "Default Reports" && selectedReport==="Sales Performance" ? <SalesPerformance /> : ""}
      {selectedButton === "Default Reports" && selectedReport==="Marketing Effect" ? <MarketingEffect /> : ""}
      {selectedButton === "Default Reports" && selectedReport==="Call Reports" ? <CallReports /> : ""}
      {selectedButton === "Default Reports" && selectedReport==="Inventory Summary" ? <InventorySummary /> : ""}




      {/* {selectedButton === "Completed" ? <CompleteTasks /> : ""} */}
      {/* {selectedButton === "Archived" ? <ArchivedTasks /> : ""} */}
    </div>
  );
}
