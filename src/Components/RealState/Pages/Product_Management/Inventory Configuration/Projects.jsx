import { useState } from "react";
import {
  TextField,
  Chip,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const Projects = () => {
  //------------------------------------------------------ All States --------------------------------------------------------
  const [projectStage, setProjectStage] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [transactionType, setTransactionType] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [approvedBanks, setApprovedBanks] = useState([]);
  const [suitableFor, setSuitableFor] = useState([]);
  const [parking, setParking] = useState([]);
  const [security, setSecurity] = useState([]);
  const [association, setAssociation] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [approval, setApproval] = useState([]);
  const [elevators, setElevators] = useState([]);

  const [inputValues, setInputValues] = useState({
    stage: "",
    type: "",
    transaction: "",
    status: "",
    banks: "",
    suitable: "",
    parking: "",
    security: "",
    association: "",
    inventory: "",
    approval: "",
    elevators: "",
  });
  const [fields, setFields] = useState([{ title: "", description: "" }]);
  //------------------------------------------ Handle Add Field --------------------------------

  const handleAddField = () => {
    setFields([...fields, { title: "", description: "" }]);
  };
  //------------------------------------------ Handle Input Field --------------------------------
  const handleInputChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
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

        {renderSection("Project Stage", projectStage, setProjectStage, "stage")}
        {renderSection("Project Type", projectType, setProjectType, "type")}
        {renderSection(
          "Project Transaction Type",
          transactionType,
          setTransactionType,
          "transaction",
        )}
        {renderSection(
          "Project Status",
          projectStatus,
          setProjectStatus,
          "status",
        )}
        {renderSection(
          "Approved Banks",
          approvedBanks,
          setApprovedBanks,
          "banks",
        )}
        {renderSection("Suitable For", suitableFor, setSuitableFor, "suitable")}
        {renderSection("Parking", parking, setParking, "parking")}
        {renderSection("Security", security, setSecurity, "security")}
        {renderSection(
          "Project Associaction Type",
          association,
          setAssociation,
          "association",
        )}
        {renderSection(
          "Inventory Image Type",
          inventory,
          setInventory,
          "inventory",
        )}
        {renderSection("Approval", approval, setApproval, "approval")}
        {renderSection("Elevators", elevators, setElevators, "elevators")}
        {/* --------------------------------------------- Check Box ----------------------------------------------------- */}
        <Box className="flex flex-col gap-5">
          <FormControlLabel
            className="flex items-start justify-start"
            control={<Checkbox />}
            label={
              <Typography className="font-semibold text-black">
                Allow editing amenities on project{" "}
                <span className="text-gray-400">
                  (This change cannot be reverted.)
                </span>
              </Typography>
            }
          />
        </Box>
        {/* --------------------------------------------  Title and Dec ----------------------------------------------------- */}
        <Box
          elevation={3}
          className="flex flex-col gap-3 rounded-xl p-5"
          sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.16)" }}
        >
          <Typography className="mb-2">Amenities</Typography>

          <Box className="flex w-full flex-col gap-4">
            <Box className="grid grid-cols-2 gap-4">
              <Typography className="!text-sm">Title</Typography>
              <Typography className="!text-sm">Description</Typography>
            </Box>

            {fields.map((field, index) => (
              <Box key={index} className="grid grid-cols-2 gap-4">
                <TextField
                  placeholder="Title"
                  variant="outlined"
                  value={field.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  InputProps={{ classes: { root: "rounded-xl" } }}
                />
                <TextField
                  placeholder="Description"
                  variant="outlined"
                  value={field.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                  InputProps={{ classes: { root: "rounded-xl" } }}
                />
              </Box>
            ))}

            <button
              className="!mt-4 flex max-w-fit !rounded-xl border border-cyan-500 !bg-white p-3 !text-cyan-500"
              onClick={handleAddField}
            >
              Add Amenity Configuration
            </button>
          </Box>
        </Box>

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

export default Projects;
