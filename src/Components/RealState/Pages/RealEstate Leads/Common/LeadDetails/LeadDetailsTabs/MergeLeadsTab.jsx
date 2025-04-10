
//---------------------------- MUI Imports ----------------------------
import { Select, MenuItem } from "@mui/material";

const MergeLeadsTab = () => {
 

  return (
    <div className="flex min-h-screen flex-col gap-3 py-3">
      {/*------------------------------ Filter ------------------------ */}
      <div className="flex">
        <Select
          value="Stage"
          className="!bg-white !shadow-md"
          sx={{ height: 45 }}
        >
          <MenuItem value="Stage">Lead Filter</MenuItem>
          <MenuItem value="Project1">Project 1</MenuItem>
          <MenuItem value="Project2">Project 2</MenuItem>
        </Select>
      </div>
    
     
    </div>
  );
};

export default MergeLeadsTab;
