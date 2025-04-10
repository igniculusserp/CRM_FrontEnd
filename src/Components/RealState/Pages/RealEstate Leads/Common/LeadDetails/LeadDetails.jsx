import { useState } from "react";
// import PropTypes from "prop-types";

//---------------------------- MUI Imports ----------------------------
import {
  Typography,
  Divider,
  Select,
  MenuItem,
  Modal,
  Fade,
  Box,
} from "@mui/material";
//------------------------------------ React Icon ----------------------------
import { IoMdCloseCircleOutline } from "react-icons/io";
import MatchingProperties from "../MatchingProperties/MatchingProperties";
import LeadDetailsTabs from "./LeadDetailsTabs/LeadDetailsTabs";

const LeadDetails = () => {
  //------------------------------------------------ All States --------------------------------------------
  const [open, setOpen] = useState(false);
  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="bg-gray-200 p-6">
        <div className="flex w-full items-start justify-between gap-3 rounded-md border bg-gray-100 p-2 shadow-md">
          {/* Left Section */}
          <div className="w-3/5">
            <div className="flex min-h-screen flex-col gap-3 py-3">
              {/* Header Section */}
              <div className="flex items-center justify-between gap-4 rounded-md bg-white px-4 py-5 shadow-md">
                <Typography variant="h6" className="!font-bold">
                  Aanad Kumar
                </Typography>
                <div className="flex justify-between gap-6">
                  <div className="flex justify-between gap-3 rounded-md border">
                    <div className="rounded-md bg-blue-400 px-3 py-1 font-bold text-white">
                      0
                    </div>
                    <div className="py-1 pr-3 !font-semibold">Unit</div>
                  </div>
                  <div className="flex justify-between gap-3 rounded-md border">
                    <div className="rounded-md bg-blue-400 px-3 py-1 font-bold text-white">
                      0
                    </div>
                    <div className="py-1 pr-3 !font-semibold">Task</div>
                  </div>
                </div>
              </div>

              {/*--------------------------------------------- Basic Information Cards -------------------------------------------*/}
              <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-white p-4 shadow-md">
                {/* Header */}
                <div className="flex w-full items-center justify-between gap-4">
                  {/* Stage */}
                  <Select
                    value="Stage"
                    className="!bg-white !shadow-md"
                    sx={{ height: 45 }}
                  >
                    <MenuItem value="Stage">Stage & Status</MenuItem>
                    <MenuItem value="Project1">Project 1</MenuItem>
                    <MenuItem value="Project2">Project 2</MenuItem>
                  </Select>
                  {/* Button */}
                  <div className="flex w-full flex-wrap justify-end gap-3">
                    {/* Save Button */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md transition-all hover:bg-cyan-600 md:w-auto">
                      <span>Save</span>
                    </button>

                    {/* Cancel Button */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-300 px-4 py-2 text-black shadow-md transition-all hover:bg-gray-100 md:w-auto">
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
                <Divider className="my-2 w-full" />
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
              </div>

              {/*------------------------------------------ Requirements Information Section ----------------------------------*/}
              <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-white p-4 shadow-md">
                {/* Header */}
                <div className="flex w-full items-center justify-between gap-4">
                  {/* Heading */}
                  <div>
                    <span className="text-xl font-semibold">Requirement</span>
                  </div>
                  {/* Button */}
                  <div className="flex w-full flex-wrap justify-end gap-3">
                    {/* Similar Find Button */}
                    <button
                      onClick={() => setOpen(true)}
                      className="flex w-full items-center justify-center rounded-md border bg-gray-100 px-6 py-1 text-sm text-gray-500 shadow-md transition-all hover:bg-cyan-200 md:w-auto"
                    >
                      <span>Show Matching Properties</span>
                    </button>
                  </div>
                </div>
                <Divider className="my-2 w-full" />
                {/* Information */}
                <div className="grid w-full grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Configuration</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Property Type</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                </div>
              </div>

              {/*------------------------------------------ Task Information Section ----------------------------------------------*/}
              <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-white p-4 shadow-md">
                {/* Header */}
                <div className="flex w-full items-center justify-between gap-4">
                  {/* Heading */}
                  <div>
                    <span className="text-xl font-semibold">Task</span>
                  </div>
                  {/* Button and Drop Down */}

                  <div className="flex w-full flex-wrap justify-end gap-3">
                    {/* Add Task Button */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md transition-all hover:bg-cyan-600 md:w-auto">
                      <span>Add Task</span>
                    </button>

                    {/* Cancel Button */}
                    <Select
                      value="Stage"
                      className="!bg-white !shadow-md"
                      sx={{ height: 45 }}
                    >
                      <MenuItem value="Stage">Open</MenuItem>
                      <MenuItem value="Project1">Project 1</MenuItem>
                      <MenuItem value="Project2">Project 2</MenuItem>
                    </Select>
                  </div>
                </div>
                <Divider className="my-2 w-full" />
                {/* Information */}
                <div className="grid w-full grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Configuration</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Property Type</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                </div>
              </div>

              {/*------------------------------------------ Booking Information Section ----------------------------------------------*/}
              <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-white p-4 shadow-md">
                {/* Header */}
                <div className="flex w-full items-center justify-between gap-4">
                  {/* Heading */}
                  <div>
                    <span className="text-xl font-semibold">Booking</span>
                  </div>
                </div>
                <Divider className="my-2 w-full" />
                {/* Information */}
                <div className="grid w-full grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Configuration</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Property Type</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                </div>
              </div>

              {/*------------------------------------------ Interested Projects Information Section ----------------------------------------------*/}
              <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-white p-4 shadow-md">
                {/* Header */}
                <div className="flex w-full items-center justify-between gap-4">
                  {/* Heading */}
                  <div>
                    <span className="whitespace-nowrap text-xl font-semibold">
                      Interested Projects
                    </span>
                  </div>
                  {/* Button and Drop Down */}
                  <div className="flex w-full flex-wrap justify-end gap-3">
                    {/* Cancel Button */}
                    <Select
                      value="Stage"
                      className="!bg-white !shadow-md"
                      sx={{ height: 45 }}
                    >
                      <MenuItem value="Stage">Oldest First</MenuItem>
                      <MenuItem value="Project1">Project 1</MenuItem>
                      <MenuItem value="Project2">Project 2</MenuItem>
                    </Select>
                  </div>
                </div>
                <Divider className="my-2 w-full" />
                {/* Information */}
                <div className="grid w-full grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Configuration</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Property Type</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                </div>
                {/* Units of Interest */}
                <div className="flex w-full flex-col gap-2">
                  <span className="text-gray-400">Units of Interest</span>
                  <div className="w-full rounded-md border p-3">
                    {/* Information */}
                    <div className="grid w-full grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-400">Configuration</span>
                        <span className="font-semibold text-black">
                          .......
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-400">Property Type</span>
                        <span className="font-semibold text-black">
                          .......
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*------------------------------------------ Campaign Responses  Information Section ----------------------------------------------*/}
              <div className="flex flex-col items-center justify-between gap-6 rounded-md bg-white p-4 shadow-md">
                {/* Header */}
                <div className="flex w-full items-center justify-between gap-4">
                  {/* Heading */}
                  <div>
                    <span className="whitespace-nowrap text-xl font-semibold">
                      Campaign Responses (1)
                    </span>
                  </div>
                  {/* Button and Drop Down */}
                  <div className="flex w-full flex-wrap justify-end gap-3">
                    {/* Cancel Button */}
                    <Select
                      value="Stage"
                      className="!bg-white !shadow-md"
                      sx={{ height: 45 }}
                    >
                      <MenuItem value="Stage">Oldest First</MenuItem>
                      <MenuItem value="Project1">Project 1</MenuItem>
                      <MenuItem value="Project2">Project 2</MenuItem>
                    </Select>
                  </div>
                </div>
                <Divider className="my-2 w-full" />
                {/* Information */}
                <div className="grid w-full grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Configuration</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Property Type</span>
                    <span className="font-semibold text-black">.......</span>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------- View Profile Button --------------------------------------------------------- */}
              <div className="flex w-full justify-end pt-6">
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md transition-all hover:bg-cyan-600 md:w-auto">
                  <span>View Profile</span>
                </button>
              </div>
              {/* ---------------------------- Preview Modal -------------------------- */}
              {/* Modal for Inventory Configuration */}
              <Modal open={open} onClose={handleClose} closeAfterTransition>
                <Fade in={open}>
                  <Box className="absolute right-0 top-0 h-full w-full rounded-t-xl bg-white px-2 py-4 sm:w-3/4 sm:px-3 md:w-2/3">
                    <div className="flex items-center justify-between rounded-md bg-cyan-500 px-4 py-2 !text-white shadow-sm">
                      <Typography>
                        Search Properties for Anand Kumar Lead ID #(1234)
                      </Typography>
                      <IoMdCloseCircleOutline
                        color="white"
                        className="cursor-pointer"
                        onClick={handleClose}
                      />
                    </div>

                    <div className="max-h-[90vh] overflow-y-auto bg-white">
                      <MatchingProperties />
                    </div>
                  </Box>
                </Fade>
              </Modal>
            </div>
          </div>
          {/* Right Section */}
          <div className="w-2/5">
            <div className="flex min-h-screen flex-col gap-3 py-3">
              {/* Header Section */}
              <div className="grid grid-cols-2 gap-3 rounded-md bg-white px-4 py-2 shadow-md">
                <Typography className="!text-base !font-semibold">
                  Documents
                </Typography>
                <Typography className="!text-base !font-semibold">
                  View Secondary Sales
                </Typography>
                <Typography className="!text-base !font-semibold">
                  Merge Leads
                </Typography>
                <Typography className="!text-base !font-semibold">
                  Reassign Lead
                </Typography>
              </div>
              {/* Lead Activities Overview Section */}
              <div className="flex flex-col gap-5 rounded-md bg-white px-4 py-4 shadow-md">
                <Typography className="!whitespace-nowrap !text-xl !font-semibold">
                  Lead Activities Overview
                </Typography>
                {/* Activities Section */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 ">
                    <Typography className="!whitespace-nowrap !text-lg !text-gray-400 !font-thin">
                      Site Visits Conducted
                    </Typography>
                    <Typography className="!whitespace-nowrap !text-lg !font-semibold">
                      0
                    </Typography>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Typography className="!whitespace-nowrap !text-lg !text-gray-400 !font-thin">
                    Outgoing Not Answered Calls
                    </Typography>
                    <Typography className="!whitespace-nowrap !text-lg !font-semibold">
                      0
                    </Typography>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Typography className="!whitespace-nowrap !text-lg !text-gray-400 !font-thin">
                    Outgoing Answered Calls
                    </Typography>
                    <Typography className="!whitespace-nowrap !text-lg !font-semibold">
                      0
                    </Typography>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Typography className="!whitespace-nowrap !text-lg !text-gray-400 !font-thin">
                    Incoming Not Answered Calls
                    </Typography>
                    <Typography className="!whitespace-nowrap !text-lg !font-semibold">
                      0
                    </Typography>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Typography className="!whitespace-nowrap !text-lg !text-gray-400 !font-thin">
                    Incoming Answered Calls 
                    </Typography>
                    <Typography className="!whitespace-nowrap !text-lg !font-semibold">
                      0
                    </Typography>
                  </div>

                </div>
              </div>
               {/*  Activities Tabs Section */}
               <div className="flex flex-col gap-5 rounded-md bg-white px-4 py-4 shadow-md">
                <LeadDetailsTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
