
//---------------------------- MUI Imports ----------------------------
import { Select, MenuItem, Typography,  } from "@mui/material";

//------------------------------------ React Icon ----------------------------

import { RiFileCopy2Line } from "react-icons/ri";

const FeedTab = () => {

  return (
    <div className="flex min-h-screen flex-col gap-3 py-3">
      {/*------------------------------ Filter ------------------------ */}
      <div className="flex">
        <Select
          value="Stage"
          className="!bg-white !shadow-md"
          sx={{ height: 45 }}
        >
          <MenuItem value="Stage">Sub Filter</MenuItem>
          <MenuItem value="Project1">Project 1</MenuItem>
          <MenuItem value="Project2">Project 2</MenuItem>
        </Select>
      </div>
      {/*--------------------------------------------- workflow  Info Cards -------------------------------------------*/}
      <div className="flex flex-col items-start justify-between gap-6 rounded-md p-4 shadow-md">
        {/* ------------------------------------ Info Box -------------------------- */}
        <div className="flex items-start justify-start gap-4">
          <RiFileCopy2Line className="text-2xl text-gray-400" />
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
           Lead Hotness was updated from 61 to 71 via a workflow trigger.
          </Typography>
        </div>        
        {/* Footer */}
        <div className="flex w-full items-center justify-between">
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
           Today at 12:16 PM | Generated via Workflow
          </Typography>
        
        </div>
      </div>
      
    </div>
  );
};

export default FeedTab;
