
//---------------------------- MUI Imports ----------------------------
import {  Typography, Select,MenuItem } from "@mui/material";

//------------------------------------ React Icon ----------------------------

import { FaRegCalendarAlt } from "react-icons/fa";

const SiteVisit = () => {

 

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
      {/*--------------------------------------------- View Campaign Info Cards -------------------------------------------*/}
      <div className="flex flex-col items-start justify-between gap-6 rounded-md p-4 shadow-md">
        {/* ------------------------------------ Info Box -------------------------- */}
        <div className="flex items-start justify-start gap-4">
          <FaRegCalendarAlt className="text-2xl text-gray-400" />
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
            The Site visit is pending which was scheduled for xyz on 28/03/2025,
            01:14 PM by Amar Kumar.
          </Typography>
        </div>
        {/* Heading */}
        <div>
          <span className="text-xl font-semibold">View Campaign Info</span>
        </div>
        {/* Information */}
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">Last Note</span>
            <span className="font-semibold text-black">.......</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">Received on</span>
            <span className="font-semibold text-black">.......</span>
          </div>
        </div>
        {/* Footer */}
        <div className="flex w-full items-center justify-between">
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
            Today at 12:14 PM | Amar Kumar
          </Typography>
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
            Pending| Visit
          </Typography>
        </div>
      </div>
  
    </div>
  );
};

export default SiteVisit;
