import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  InputBase,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import { CgAsterisk } from "react-icons/cg";
import { main_base_url } from "../../../../../../../../../../Config/config";

export default function PersonalDetails() {
  const [countryCodes, setCountryCodes] = useState([]);
  const [filteredCountryCodes, setFilteredCountryCodes] = useState([]);
  const [searchQueryCode, setSearchQueryCode] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  const [timeZones, setTimeZones] = useState([]);
  const [filteredTimeZones, setFilteredTimeZones] = useState([]);
  const [searchQueryZone, setSearchQueryZone] = useState("");

  const [selectedAlternateCode, setSelectedAlternateCode] = useState("");
  const [searchQueryAlternateCode, setSearchQueryAlternateCode] = useState("");

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    alternatePhone: "",
    email: "",
    timeZone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (e) => {
    setSelectedCode(e.target.value);
  };

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const res = await axios.get(`${main_base_url}/Users/getCountryCode`);
        const formatted = res.data.map((code) => ({
          value: code.mobilePrefix,
          label: code.mobilePrefix,
          img: code.flagUrl,
          countryName: code.countryName,
        }));
        setCountryCodes(formatted);
        setFilteredCountryCodes(formatted);
      } catch (err) {
        console.error("Error fetching country codes:", err);
      }
    };
    fetchCountryCodes();

    // Load time zones
    const loadTimeZones = () => {
      const zones =
        typeof Intl?.supportedValuesOf === "function"
          ? Intl.supportedValuesOf("timeZone")
          : [
              "Asia/Kolkata",
              "America/New_York",
              "Europe/London",
              "Asia/Dubai",
              "America/Los_Angeles",
            ]; // fallback
      setTimeZones(zones);
      setFilteredTimeZones(zones);
    };
    loadTimeZones();
  }, []);

  useEffect(() => {
    setFilteredCountryCodes(
      countryCodes.filter((code) =>
        code.countryName.toLowerCase().includes(searchQueryCode.toLowerCase()),
      ),
    );
  }, [searchQueryCode, countryCodes]);

  useEffect(() => {
    setFilteredTimeZones(
      timeZones.filter((zone) =>
        zone.toLowerCase().includes(searchQueryZone.toLowerCase()),
      ),
    );
  }, [searchQueryZone, timeZones]);

  return (
    <Box className="flex w-full flex-col gap-4">
      {/* First Name */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            First Name
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <InputBase
            name="firstName"
            placeholder="Enter First Name"
            value={formValues.firstName}
            onChange={(e) => {
              if (/^[a-zA-Z]*$/.test(e.target.value)) handleChange(e);
            }}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>

      {/* Last Name */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Last Name
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <InputBase
            name="lastName"
            placeholder="Enter Last Name"
            value={formValues.lastName}
            onChange={(e) => {
              if (/^[a-zA-Z]*$/.test(e.target.value)) handleChange(e);
            }}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>

      {/* Phone Number */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Phone Number
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <Box className="border-r border-gray-300 bg-white px-3">
            <FormControl>
              <Select
                value={selectedCode}
                onChange={handleCountryCodeChange}
                displayEmpty
                renderValue={(selected) => {
                  const code = countryCodes.find((c) => c.label === selected);
                  return selected ? (
                    <div className="flex items-center gap-2">
                      {code?.img && (
                        <img
                          src={code.img}
                          alt="flag"
                          className="h-4 w-5"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <span>{code?.label}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Code</span>
                  );
                }}
                variant="standard"
                disableUnderline
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              >
                <ListSubheader disableSticky>
                  <input
                    type="text"
                    placeholder="Search Country"
                    value={searchQueryCode}
                    onChange={(e) => setSearchQueryCode(e.target.value)}
                    className="w-full rounded border px-2 py-1 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </ListSubheader>
                {filteredCountryCodes.map((item, idx) => (
                  <MenuItem key={idx} value={item.label}>
                    <div className="flex items-center gap-2">
                      {item.img && (
                        <img
                          src={item.img}
                          alt="flag"
                          className="h-4 w-5"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <span>{item.label}</span> -{" "}
                      <span className="text-sm text-gray-500">
                        {item.countryName}
                      </span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <InputBase
            name="contactNo"
            placeholder="Enter mobile number"
            value={formValues.contactNo}
            onChange={(e) => {
              if (/^\d{0,15}$/.test(e.target.value)) handleChange(e);
            }}
            onBlur={() => {
              if (
                formValues.contactNo.length < 8 ||
                formValues.contactNo.length > 15
              ) {
                alert("Mobile number must be between 8 to 15 digits.");
              }
            }}
            inputProps={{ inputMode: "numeric", pattern: "\\d*" }}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>

      {/* Email */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Email
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <InputBase
            name="email"
            placeholder="Enter Email"
            value={formValues.email}
            onChange={(e) => {
              if (/^[a-zA-Z0-9@._-]*$/.test(e.target.value)) handleChange(e);
            }}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>

      {/* Alternate Phone */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Alternate Phone
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <Box className="border-r border-gray-300 bg-white px-3">
            <FormControl>
              <Select
                value={selectedAlternateCode}
                onChange={(e) => setSelectedAlternateCode(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  const code = countryCodes.find((c) => c.label === selected);
                  return selected ? (
                    <div className="flex items-center gap-2">
                      {code?.img && (
                        <img
                          src={code.img}
                          alt="flag"
                          className="h-4 w-5"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <span>{code?.label}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Code</span>
                  );
                }}
                variant="standard"
                disableUnderline
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              >
                <ListSubheader disableSticky>
                  <input
                    type="text"
                    placeholder="Search Country"
                    value={searchQueryAlternateCode}
                    onChange={(e) =>
                      setSearchQueryAlternateCode(e.target.value)
                    }
                    className="w-full rounded border px-2 py-1 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </ListSubheader>
                {filteredCountryCodes
                  .filter((item) =>
                    item.countryName
                      .toLowerCase()
                      .includes(searchQueryAlternateCode.toLowerCase()),
                  )
                  .map((item, idx) => (
                    <MenuItem key={idx} value={item.label}>
                      <div className="flex items-center gap-2">
                        {item.img && (
                          <img
                            src={item.img}
                            alt="flag"
                            className="h-4 w-5"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        )}
                        <span>{item.label}</span> -{" "}
                        <span className="text-sm text-gray-500">
                          {item.countryName}
                        </span>
                      </div>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <InputBase
            name="alternatePhone"
            placeholder="Enter alternate number"
            value={formValues.alternatePhone}
            onChange={(e) => {
              if (/^\d{0,15}$/.test(e.target.value)) handleChange(e);
            }}
            onBlur={() => {
              if (
                formValues.alternatePhone.length < 8 ||
                formValues.alternatePhone.length > 15
              ) {
                alert("Alternate number must be between 8 to 15 digits.");
              }
            }}
            inputProps={{ inputMode: "numeric", pattern: "\\d*" }}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>

      {/* Time Zone */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Time Zone
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="overflow-hidden rounded-md border border-gray-300 px-3 py-2">
          <FormControl fullWidth>
            <Select
              value={formValues.timeZone}
              onChange={handleChange}
              name="timeZone"
              displayEmpty
              variant="standard"
              disableUnderline
              renderValue={(selected) =>
                selected ? (
                  selected
                ) : (
                  <span className="text-gray-400">Select Time Zone</span>
                )
              }
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              <ListSubheader disableSticky>
                <input
                  type="text"
                  placeholder="Search Time Zone"
                  value={searchQueryZone}
                  onChange={(e) => setSearchQueryZone(e.target.value)}
                  className="w-full rounded border px-2 py-1 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </ListSubheader>
              {filteredTimeZones.map((zone, idx) => (
                <MenuItem key={idx} value={zone}>
                  {zone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </label>
    </Box>
  );
}
