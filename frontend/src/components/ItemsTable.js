import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const createRow = (name, description, price, image_link, material, size) => {
  return {
    name,
    description,
    price,
    image_link,
    material,
    size,
  };
};

const rows = [
  createRow(
    "chair",
    "a wooden chair",
    24.56,
    "https://giphy.com/embed/xTiTnwkIFg4M7ru2NW",
    "canepa",
    "medium"
  ),
  createRow(
    "chair",
    "a wooden chair",
    24.56,
    "https://giphy.com/embed/xTiTnwkIFg4M7ru2NW",
    "canepa",
    "medium"
  ),
  createRow(
    "chair",
    "a wooden chair",
    24.56,
    "https://giphy.com/embed/xTiTnwkIFg4M7ru2NW",
    "canepa",
    "medium"
  ),
  createRow(
    "chair",
    "a wooden chair",
    24.56,
    "https://giphy.com/embed/xTiTnwkIFg4M7ru2NW",
    "canepa",
    "medium"
  ),
];

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Name</TableCell>
        <TableCell align="right">Description</TableCell>
        <TableCell align="right">Price $</TableCell>
        <TableCell align="right">Material</TableCell>
        <TableCell align="right">Size</TableCell>
      </TableRow>
    </TableHead>
  );
};

const Row = ({ row, index }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: index % 2 === 0 ? "#f5f4f4" : "#fefeff",
          },
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
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography>Information to display</Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const ItemsTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHeader />
        <TableBody>
          {rows.map((row, index) => (
            <Row row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
