import { useState } from "react";
//---------------------------- MUI Imports ----------------------------
import { Select, Menu, MenuItem, Typography, IconButton } from "@mui/material";

//------------------------------------ React Icon ----------------------------
import { SlEnvolope } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { RiFileCopy2Line } from "react-icons/ri";

const ActivityTab = () => {
  //------------------------------------------------ All States --------------------------------------------

  // State for menu anchor and selected row
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Open menu
  const handleMenuOpen = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Handle menu option click
  const handleMenuClick = (option) => {
    console.log(`Selected: ${option}`, selectedRow);
    handleMenuClose();
  };

  return (
    <div className="flex min-h-screen flex-col gap-3 py-3">
      {/*------------------------------ Filter ------------------------ */}
      <div className="flex">
        <Select
          value="Stage"
          className="!bg-white !shadow-md"
          sx={{ height: 45 }}
        >
          <MenuItem value="Stage">Filter</MenuItem>
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
      {/*--------------------------------------------- Site visit reminder  Cards -------------------------------------------*/}
      <div className="flex flex-col items-start justify-between gap-6 rounded-md p-4 shadow-md">
        {/* Heading */}
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlEnvolope className="text-xl text-gray-400" />
            <span className="text-xl font-semibold">
              Site visit reminder : Xyz
            </span>
          </div>
          <div>
            <IconButton onClick={(event) => handleMenuOpen(event)}>
              <PiDotsThreeOutlineVerticalLight size={24} />
            </IconButton>
            {/* MUI Menu Component */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={() => handleMenuClick("Preview")}>
                Read More
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("Details")}>
                Event View
              </MenuItem>
            </Menu>
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
            outgoing| delivered
          </Typography>
        </div>
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
      {/*--------------------------------------------- Site Visit Confirmation Cards -------------------------------------------*/}
      <div className="flex flex-col items-start justify-between gap-6 rounded-md p-4 shadow-md">
        {/* Heading */}
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlEnvolope className="text-xl text-gray-400" />
            <span className="text-xl font-semibold">
            Site Visit Confirmation
            </span>
          </div>
          <div>
            <IconButton onClick={(event) => handleMenuOpen(event)}>
              <PiDotsThreeOutlineVerticalLight size={24} />
            </IconButton>
            {/* MUI Menu Component */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={() => handleMenuClick("Preview")}>
                Read More
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("Details")}>
                Event View
              </MenuItem>
            </Menu>
          </div>
        </div>
        {/* Footer */}
        <div className="flex w-full items-center justify-between">
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
            Today at 1:12 PM | Generated via Workflow | lead
          </Typography>
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
            outgoing | Queued
          </Typography>
        </div>
      </div>
      {/*--------------------------------------------- Call Done Cards -------------------------------------------*/}
      <div className="flex flex-col items-start justify-between gap-6 rounded-md p-4 shadow-md">
        {/* Heading */}
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
      
            <span className="text-xl font-semibold">
            Call Done
            </span>
          </div>
          
        </div>
        {/* Footer */}
        <div className="flex w-full items-center justify-between">
          <Typography
            className="!font-thin !text-gray-400"
            sx={{ fontSize: "11px" }}
          >
          Today at 1:12 PM | Amar Kumar
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
