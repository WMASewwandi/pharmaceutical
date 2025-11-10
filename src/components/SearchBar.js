"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const sampleProducts = [
  "Wireless Earbuds",
  "Smartwatch",
  "Yoga Mat",
  "Sneakers",
  "Coffee Grinder",
  "Laptop Sleeve",
  "Scented Candles",
  "Smart Cart",
  "Gaming Mouse",
  "Bluetooth Speaker",
];

export default function SearchBar({ fullWidth = true }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      freeSolo
      options={sampleProducts}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      inputValue={inputValue}
      onInputChange={(e, newInput) => setInputValue(newInput)}
      sx={{ minWidth: 220, width: fullWidth ? "100%" : 360 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search products, brands..."
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}


