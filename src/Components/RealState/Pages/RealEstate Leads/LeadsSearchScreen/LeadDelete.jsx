import { useState } from "react";
import { TextField, Typography } from "@mui/material";

export default function LeadDelete() {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
        <Typography className="">Lead Delete</Typography>
    <div className="flex flex-col gap-6">
      <TextField
        placeholder="Search..."
        size="small"
        value={query}
        onChange={handleSearch}
        className="w-full sm:w-96"
      />
  {/* Buyer Button */}
          <button
            className="flex w-fit items-center justify-center gap-2 rounded-lg px-4 py-2 bg-cyan-500 text-white shadow-md" 
          >
            <span>Delete Leads</span>
          </button>
    </div>
  </div>
  );
}
