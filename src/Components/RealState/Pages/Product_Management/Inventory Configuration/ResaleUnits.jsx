import { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
  Typography,
} from "@mui/material";

export default function ResaleUnits() {
    const [selectedRole, setSelectedRole] = useState("");
    const handleRoleSelect = (role) => setSelectedRole(role);

    const Data = [
        { label: 'Hide project in filter for resale unit' },
        { label: 'Hide project tower for resale unit' },
        { label: 'Hide address1 for resale unit' },
       ];
  return (
    <div className="flex flex-col gap-8">
      {/*------------------------------------------------------ Checkbox Section ---------------------------------------*/}
      <Paper elevation={0} className="rounded-lg p-5 flex flex-col gap-5"
        sx={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.16)' 
          }}>
        {Data.map((item, index) => (
          <FormControlLabel
            key={index}
            className=" flex justify-start items-start"
            control={<Checkbox />}
            label={
              <Typography className="font-semibold text-black">
                {item.label}{" "}

              </Typography>
            }
          />
        ))}
      </Paper>


      {/*-------------------------------------------------- Roles Section ----------------------------------------------*/}
      <Paper
        elevation={3}
        className="rounded-lg p-5 flex flex-col gap-4"
        sx={{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.16)',
        }}
      >
        <Typography className="mb-2">Available to roles</Typography>

        <div className="flex gap-3">
          {["Sale", "Pre Resale", "Manager"].map((role) => (
            <Button
              key={role}
              variant={selectedRole === role ? "contained" : "outlined"}
              color={selectedRole === role ? "primary" : "black"}
              onClick={() => handleRoleSelect(role)}
              className={`!border-black ${
                selectedRole === role
                  ? "!bg-cyan-500 !text-white"
                  : "!text-black"
              }`}
            >
              {role}
            </Button>
          ))}
        </div>
      </Paper>

      {/*------------------------------------------------------- Save Button -------------------------------------------------*/}
      <div className="text-right">
        <Button variant="contained" className="!bg-cyan-500 text-white">
          Save
        </Button>
      </div>
    </div>
  );
}
