import { useState } from "react";

import { Box, Select, MenuItem, Modal, Fade, Typography } from "@mui/material";

//---------------------------- React Icon -------------------------------
import { IoMdCloseCircleOutline } from "react-icons/io";

//----------------------- Local Imports --------------------------------
import NewTask from "./Components/NewTask";
import AllTasks from "./Components/AllTasks";
import OpenTasks from "./Components/OpenTasks";
import CompleteTasks from "./Components/CompleteTasks";
import ArchivedTasks from "./Components/ArchivedTasks";
import AddTask from "./AddTasks/AddTask";

export default function Tasks() {
  //---------------------------------------- All States ---------------------------------
  const [selectedButton, setSelectedButton] = useState("New Task");
  const [open, setOpen] = useState(false);

  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setOpen(false);

  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="relative flex w-full gap-3 rounded-md bg-white p-2">
        {["New Task", "All", "Open", "Completed", "Archived"].map((button) => (
          <>
            <Box
              key={button}
              sx={{ width: "fit-content" }}
              className={`cursor-pointer rounded-md px-3 py-1 text-sm transition-all ${
                selectedButton === button
                  ? "bg-cyan-500 text-white shadow-md"
                  : "bg-gray-200 text-black hover:bg-cyan-400 hover:text-white"
              }`}
              onClick={() => setSelectedButton(button)}
            >
              {button}
              <Box></Box>
            </Box>
          </>
        ))}
      </Box>
      {/* ----------------------------------------- Buttons --------------------------------- */}
      <Box className="flex flex-wrap justify-between gap-5">
        {/* Columns Button */}
        <div className="flex w-full gap-3 md:w-auto">
          {/* All Leads */}
          <Select
            value="Leads"
            className="w-full !rounded-md !bg-white !shadow-md"
            sx={{ height: 42 }}
          >
            <MenuItem value="Leads">All</MenuItem>
            <MenuItem value="Project1">Project 1</MenuItem>
            <MenuItem value="Project2">Project 2</MenuItem>
          </Select>
        </div>

        {/* New Invoice Button */}
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md hover:bg-cyan-600 md:w-auto"
        >
          <span>Add Task</span>
        </button>
      </Box>
      {/* --------------------------- Tabs Import Section ------------------------ */}
      {selectedButton === "New Task" ? <NewTask /> : ""}
      {selectedButton === "All" ? <AllTasks /> : ""}
      {selectedButton === "Open" ? <OpenTasks /> : ""}
      {selectedButton === "Completed" ? <CompleteTasks /> : ""}
      {selectedButton === "Archived" ? <ArchivedTasks /> : ""}
      {/* ---------------------------- Preview Modal -------------------------- */}
      {/* Modal for Inventory Configuration */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box className="absolute right-0 top-0 h-full w-full rounded-t-xl bg-white px-2 py-4 sm:w-3/4 sm:px-3 md:w-2/3">
            <div className="flex items-center justify-between rounded-md bg-cyan-500 px-4 py-2 !text-white shadow-sm">
              <Typography>New Task</Typography>
              <IoMdCloseCircleOutline
                color="white"
                className="cursor-pointer"
                onClick={handleClose}
              />
            </div>

            <div className="max-h-[90vh] overflow-y-auto bg-white">
              <AddTask />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
