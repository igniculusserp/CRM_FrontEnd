//---------------------------- MUI Imports ----------------------------
import { Typography, Select, MenuItem } from "@mui/material";

const FollowupsTab = () => {
  return (
    <div className="flex min-h-screen flex-col gap-3 py-3">
      {/*------------------------------ Filter ------------------------ */}
      <div className="flex gap-3">
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
      {/* -------------------------------------------- No Record ------------------------- */}
      <div className="flex min-h-40 items-center justify-center">
        <Typography className="!text-md !font-thin !text-gray-400">
          No records to show
        </Typography>
      </div>
    </div>
  );
};

export default FollowupsTab;
