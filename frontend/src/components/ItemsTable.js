import React, { useContext, useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Gif } from "@giphy/react-components";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { AppContext } from "../App";
import { giphyFetch } from "../config/gifConfig";

const GifComponent = ({ id }) => {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    async function fetchGif() {
      const { data } = await giphyFetch.gif(id);
      setGif(data);
    }
    fetchGif();
  }, []);

  return gif && <Gif gif={gif} width={250} height={250} />;
};

const TableHeader = () => {
  return (
    <TableHead sx={{ background: "black" }}>
      <TableRow>
        <TableCell />
        <TableCell sx={{ color: "white" }}>Name</TableCell>
        <TableCell sx={{ color: "white" }} align="right">
          Description
        </TableCell>
        <TableCell sx={{ color: "white" }} align="right">
          Price $
        </TableCell>
        <TableCell sx={{ color: "white" }} align="right">
          Material
        </TableCell>
        <TableCell sx={{ color: "white" }} align="right">
          Size
        </TableCell>
        <TableCell sx={{ color: "white" }} align="right">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const Row = ({ row, index }) => {
  const {
    setOpenDeleteModal,
    setIdItemToDelete,
    setOpenModal,
    openModal,
    setModalMode,
    modalMode,
    setItem,
  } = useContext(AppContext);

  const openDeleteModal = (id) => {
    setIdItemToDelete(id);
    setOpenDeleteModal(true);
  };

  const openEditModal = (item) => {
    setOpenModal(true);
    setModalMode("edit");
    setItem(item);
  };

  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow
        sx={{
          background: index % 2 === 0 ? "#f5f4f4" : "#fefeff",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.material}</TableCell>
        <TableCell align="right">{row.size}</TableCell>
        <TableCell align="right">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",

              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <DeleteIcon
              onClick={() => openDeleteModal(row.id)}
              sx={{ color: "red", cursor: "pointer" }}
            />
            <CreateIcon
              onClick={() => openEditModal(row)}
              sx={{ color: "blue", cursor: "pointer" }}
            />
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <GifComponent id={row.image_link} />
              <Box
                sx={{
                  pl: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <Typography>
                  Serial number:{row.items_details.serial_number}
                </Typography>
                <Typography>
                  Lot number:{row.items_details.lot_number}
                </Typography>
                <Typography>
                  Category:
                  {row.categories.map((category) => category.name + " ")}
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const ItemsTable = ({ items }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHeader />
        <TableBody>
          {items.length !== 0 &&
            items.map((row, index) => <Row row={row} index={index} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
