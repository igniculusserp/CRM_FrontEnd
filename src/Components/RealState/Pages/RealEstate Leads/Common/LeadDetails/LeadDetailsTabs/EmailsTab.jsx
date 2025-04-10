import { useState } from "react";
//---------------------------- MUI Imports ----------------------------
import { Select, Menu, MenuItem, Typography, IconButton } from "@mui/material";

//------------------------------------ React Icon ----------------------------
import { SlEnvolope } from "react-icons/sl";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

const EmailsTab = () => {
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
          <MenuItem value="Stage">Sub Filter</MenuItem>
          <MenuItem value="Project1">Project 1</MenuItem>
          <MenuItem value="Project2">Project 2</MenuItem>
        </Select>
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
     
    </div>
  );
};

export default EmailsTab;
