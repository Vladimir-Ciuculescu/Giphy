import { Box, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const OptionsBar = ({ handleData }) => {
  const [name, setName] = useState("");

  const handlePress = async (e) => {
    //If Enter key pressed
    if (e.keyCode === 13) {
      await searchItems();
    }
  };

  const searchItems = async () => {
    const { data } = await axios.get("/items", {
      params: { ...(name ? { name } : {}) },
    });
    handleData(data);
  };

  return (
    <Box sx={{ display: "fkex", flexDirection: "row" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handlePress}
          enter
          placeholder="Name"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Serial number"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Lot number"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
};

export default OptionsBar;
