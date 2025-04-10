import { useState } from "react";
import {
  TextField,
  Chip,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button, MenuItem, InputAdornment
} from "@mui/material";

const Units = () => {
  //------------------------------------------------------ All States --------------------------------------------------------
  const [seller, setSeller] = useState([]);
  const [band, setBand] = useState([]);
  const [facing, setFacing] = useState([]);
  const [unitCosts, setUnitCosts] = useState([]);
  const [postedBy, setPostedBy] = useState([]);
  const [bedrooms, setBedrooms] = useState([]);
  const [available, setAvailable] = useState([]);

  const [inputValues, setInputValues] = useState({
    seller: "",
    band: "",
    facing: "",
    unitCosts: "",
    postedBy: "",
    bedrooms: "",
    available: "",
  });
  const [timeoutValue, setTimeoutValue] = useState(1);
  const [selectedDay, setSelectedDay] = useState('');

  //------------------------------------------------------- Handle Time out Change ------------------------------------------
  const handleTimeoutChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTimeoutValue(isNaN(value) ? 0 : value);
  };
//--------------------------------------------------------- Handle Day Change event---------------------------------------------
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

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

        {renderSection("Unit Seller Type", seller, setSeller, "seller")}
        {renderSection("Unit Band", band, setBand, "band")}
        {renderSection("Unit Facing", facing, setFacing, "facing")}
        {renderSection("Project Unit Costs", unitCosts, setUnitCosts, "unitCosts")}
        {renderSection("Unit Posted By", postedBy, setPostedBy, "postedBy")}
        {renderSection("Unit Configuration Bedrooms", bedrooms, setBedrooms, "bedrooms")}
        {renderSection("Reasons To Mark Unit Available", available, setAvailable, "available")}

        {/* --------------------------------------------- Check Box ----------------------------------------------------- */}
        <Box className="flex flex-col gap-5">
          <FormControlLabel
            className="flex items-start justify-start"
            control={<Checkbox />}
            label={
              <Typography className="font-semibold text-black">
                Show lead details {" "}
                <span className="text-gray-400">
                  (for non-available units)
                </span>
              </Typography>
            }
          />
        </Box>
        <Box className="flex flex-col gap-5">
          <FormControlLabel
            className="flex items-start justify-start"
            control={<Checkbox />}
            label={
              <Typography className="font-semibold text-black">
                Show sales details {" "}
                <span className="text-gray-400">
                  (for non-available units)
                </span>
              </Typography>
            }
          />
        </Box>
        {/* -------------------------------------------- Time Out Section ----------------------------------------------------- */}
        <div className="flex gap-4 w-full">
      {/* Hold Timeout */}
      <div className="flex flex-col w-1/2">
        <label className="text-lg font-medium mb-1">Hold Timeout</label>
        <TextField
          variant="outlined"
          value={timeoutValue}
          type="number"
          onChange={handleTimeoutChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{height:"50px"}}>
                <span className="bg-gray-200 px-4 py-4 rounded-l-xl" >After</span>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '15px', // Custom border radius
              paddingLeft:"0px !important"
            }
          }}
          className="!w-full"
        />
      </div>

      {/* Day */}
      <div className="flex flex-col w-1/2">
        <label className="text-lg font-medium mb-1">Day</label>
        <TextField
          select
          value={selectedDay}
          onChange={handleDayChange}
          placeholder="Entrez votre prénom"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '15px' // Custom border radius
            }
          }}
          className="!w-full"
        >
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
        </TextField>
      </div>
    </div>

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

export default Units;
