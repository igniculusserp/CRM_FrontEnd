import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

export default function LeadDetails() {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
        <Typography className="">Lead Details</Typography>
    <div className="flex border items-center rounded-md overflow-hidden bg-white w-fit max-[400px]:w-full">
      <TextField
        placeholder="Search..."
        size="small"
        value={query}
        onChange={handleSearch}
        className="w-full sm:w-96"
        sx={{
          "& fieldset": { border: "none" }, // Removes border
          backgroundColor: "white",
        }}
      />
      <div className="flex items-center justify-center bg-cyan-500 p-3 px-4 cursor-pointer rounded-md">
        <AiOutlineSearch className="text-white text-xl" />
      </div>
    </div>
  </div>
  );
}
