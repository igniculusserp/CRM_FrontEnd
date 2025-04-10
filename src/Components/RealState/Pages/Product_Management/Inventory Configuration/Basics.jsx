import { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
  Typography,
} from "@mui/material";

export default function Basics() {
    const [selectedPropertyType, setSelectedPropertyType] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
  
    const handlePropertyTypeSelect = (type) => setSelectedPropertyType(type);
    const handleRoleSelect = (role) => setSelectedRole(role);

    const Data = [
        { label: 'Enable Inventory', note: 'This change cannot be reverted.' },
        { label: 'Enable Inventory For Third Party Integration', note: 'This change cannot be reverted. Please contact support if you want to enable it.' },
        { label: 'Enable New Booking Flow', note: 'This change cannot be reverted.' },
        { label: 'Allow inventory addition notification to users' },
        { label: 'Auto Enable Inventory for New Projects', note: 'Please contact support if you want to enable it.' },
        { label: 'Auto Calculate Carpet and Saleable Area' },
        { label: 'Enabled IPC', note: 'This change cannot be reverted.' },
        { label: 'Negotiation & Approvals', note: 'This change cannot be reverted.' },
        { label: 'Allow booking detail status automation after approval', note: 'This change is dependent on Negotiation & Approvals.' },
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
                <span className="text-gray-400">
                  ({item.note})
                </span>
              </Typography>
            }
          />
        ))}
      </Paper>

      {/*----------------------------------------- Property Types Section --------------------------------------*/}
      <Paper
        elevation={3}
        className="rounded-lg p-5 flex flex-col gap-4"
        sx={{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.16)',
        }}
      >
        <Typography className="mb-2">
          Allowed property types{" "}
          <span className="text-gray-400">
            (This change cannot be reverted. Resale units tab will be available once resale is saved here)
          </span>
        </Typography>

        <div className="flex gap-3">
          {["Sale", "Resale", "Rental"].map((type) => (
            <Button
              key={type}
              variant={selectedPropertyType === type ? "contained" : "outlined"}
              color={selectedPropertyType === type ? "primary" : "black"}
              onClick={() => handlePropertyTypeSelect(type)}
              className={`!border-black ${
                selectedPropertyType === type
                  ? "!bg-cyan-500 !text-white"
                  : "!text-black"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
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
