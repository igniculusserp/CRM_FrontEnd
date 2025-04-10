import { useState } from "react";
import {
  TextField,
  Chip,
  Box,
  Typography,
  Button,
} from "@mui/material";

const FLoorPlan = () => {
  //------------------------------------------------------ All States --------------------------------------------------------
  const [cost, setCost] = useState([]);
  const [type, setType] = useState([]);
  const [subType, setSubType] = useState([]);
  const [category, setCategory] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);
  const [bedRoom, setBedRoom] = useState([]);
  const [regions, setRegions] = useState([]);
  
  const [inputValues, setInputValues] = useState({
    cost:"",
    type:"",
    subType:"",
    category:"",
    bathrooms:"",
    bedRoom:"",
    regions:"",

  });

  //-------------------------------------------------------- Handle Enter For Add Options -------------------------------------------
  const handleKeyDown = (e, key, setState, state) => {
    if (e.key === "Enter" && inputValues[key].trim()) {
      const newTag = inputValues[key].trim();
      if (!state.includes(newTag)) {
        setState([...state, newTag]);
      }
      setInputValues({ ...inputValues, [key]: "" });
      e.preventDefault();
    }
  };
  //-------------------------------------------------------- Handle Delete For Add Options -------------------------------------------

  const handleDelete = (tagToDelete, setState, state) => {
    setState(state.filter((tag) => tag !== tagToDelete));
  };

  const renderSection = (title, state, setState, key) => (
    <Box
      elevation={3}
      className="flex flex-col gap-3 rounded-xl p-5"
      sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.16)" }}
    >
      <Typography className="mb-2">{title}</Typography>
      <Box className="flex h-auto w-full flex-wrap items-center gap-2 rounded-lg border border-gray-300 p-2">
        {state.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleDelete(tag, setState, state)}
            className="bg-blue-500 text-white"
          />
        ))}
        <TextField
          placeholder="Type"
          variant="standard"
          value={inputValues[key]}
          onChange={(e) =>
            setInputValues({ ...inputValues, [key]: e.target.value })
          }
          onKeyDown={(e) => handleKeyDown(e, key, setState, state)}
          InputProps={{ disableUnderline: true }}
          className="flex-1"
        />
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        className="flex w-full flex-col gap-8 rounded-lg p-5"
        sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.16)" }}
      >
        {/* -------------------------------------------------------- Add Options ------------------------------------------- */}

        {renderSection("Unit Configuration Costs", cost, setCost, "cost")}
        {renderSection("Unit Configuration Type", type, setType, "type")}
        {renderSection("Unit Sub Type", subType, setSubType, "subType")}
        {renderSection("Unit Category", category, setCategory, "category")}
        {renderSection("Unit Configuration Bathrooms", bathrooms, setBathrooms, "bathrooms")}
        {renderSection("Unit Configuration Bedrooms", bedRoom, setBedRoom, "bedRoom")}
        {renderSection("Unit Configuration Regions", regions, setRegions, "regions")}
        
     

        {/*------------------------------------------------------- Save Button -------------------------------------------------*/}
        <div className="text-right">
          <Button variant="contained" className="!bg-cyan-500 text-white">
            Save
          </Button>
        </div>
      </Box>
    </>
  );
};

export default FLoorPlan;
