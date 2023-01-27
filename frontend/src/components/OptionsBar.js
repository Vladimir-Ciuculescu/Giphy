import { Box, Button, InputBase } from "@mui/material";
import React, { useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { getItemsApi } from "../services/api";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../App";

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const OptionsBar = () => {
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [lotNumber, setLotNumber] = useState("");

  const {
    openModal,
    setOpenModal,
    setModalMode,
    setOpenCategoryModal,
    setItems,
  } = useContext(AppContext);

  const handlePress = async (e) => {
    //If Enter key pressed
    if (e.keyCode === 13) {
      await searchItems();
      clearFields();
    }
  };

  const clearFields = () => {
    setName("");
    setSerialNumber("");
    setLotNumber("");
  };

  const handleChange = (label, e) => {
    switch (label) {
      case "name":
        setName(e);
        break;
      case "serial_number":
        setSerialNumber(e);
        break;
      case "lot_number":
        setLotNumber(e);
        break;
      default:
        return;
    }
  };

  const searchItems = async () => {
    const params = {
      name: name,
      serial_number: serialNumber,
      lot_number: lotNumber,
    };
    const { data } = await getItemsApi(params);
    setItems(data);
  };

  const openAddModal = () => {
    setOpenModal(true);
    setModalMode("add");
  };

  return (
    <Box sx={{ display: "fkex", flexDirection: "row", gap: 2 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
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
          value={serialNumber}
          onChange={(e) => handleChange("serial_number", e.target.value)}
          onKeyDown={handlePress}
          placeholder="Serial number"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={lotNumber}
          onChange={(e) => handleChange("lot_number", e.target.value)}
          onKeyDown={handlePress}
          placeholder="Lot number"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Button
        onClick={openAddModal}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add a new item
      </Button>

      <Button
        onClick={() => setOpenCategoryModal(true)}
        sx={{ ml: 4 }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add a new category
      </Button>
    </Box>
  );
};

export default OptionsBar;
