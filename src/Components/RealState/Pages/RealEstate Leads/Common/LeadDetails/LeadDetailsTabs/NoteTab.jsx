
//---------------------------- MUI Imports ----------------------------
import {  Typography} from "@mui/material";


const NoteTab = () => {


  return (
    <div className="flex min-h-screen flex-col gap-3 py-3">
    
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

export default NoteTab;
