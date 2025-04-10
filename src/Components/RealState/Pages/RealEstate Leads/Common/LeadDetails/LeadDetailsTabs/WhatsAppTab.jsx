
//---------------------------- MUI Imports ----------------------------
import { Select, MenuItem, Typography } from "@mui/material";

//------------------------------------ React Icon ----------------------------

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppTab = () => {


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
     
      {/*--------------------------------------------- WhatsApp Info Cards -------------------------------------------*/}
      <div className="flex flex-col items-start justify-between gap-6 rounded-md p-4 shadow-md">
        {/* ------------------------------------ Info Box -------------------------- */}
        <div className="flex items-start justify-start gap-4">
          <FaWhatsapp className="text-2xl text-gray-400" />
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
           Dear Customer, this is a gentle reminder for your visit today at xyz at 01:14 PM -
          </Typography>
        </div>
        {/* Heading */}
        <div className="flex flex-col gap-3">
          <span className="text-xl text-gray-400 font-semibold">To : </span>
          <span className="text-xl  font-semibold">+913764587345</span>
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

export default WhatsAppTab;
