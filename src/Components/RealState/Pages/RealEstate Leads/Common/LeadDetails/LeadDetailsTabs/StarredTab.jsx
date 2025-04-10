
//---------------------------- MUI Imports ----------------------------
import {  Typography } from "@mui/material";


const StarredTab = () => {
 

  return (
    <div className="flex min-h-screen flex-col gap-3 py-3">
        {/* -------------------------------------------- No Record ------------------------- */}
        <div className="min-h-40 flex justify-center items-center">
        <Typography className="!text-gray-400 !text-md !font-thin">No records to show</Typography>
        </div>
    </div>
  );
};

export default StarredTab;
