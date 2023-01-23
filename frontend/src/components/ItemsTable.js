import React, { useEffect, useState } from "react";
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
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";

const data = [
  {
    name: "bag",
    description: "A nice bag",
    price: 25,
    image_link: "3osxY7DmfDxTzQ0ZJ6",
    material: "smirghel",
    size: "medium",
  },
  {
    name: "chainsaw",
    description: "A nice bag",
    price: 25,
    image_link: "1rQUB4Q3upIlImE1yI",
    material: "smirghel",
    size: "medium",
  },
  {
    name: "old phone",
    description: "A nice bag",
    price: 25,
    image_link: "Vb4ifejsKiL2U",
    material: "smirghel",
    size: "medium",
  },
];

const giphyFetch = new GiphyFetch("ZZwspTwUirtTYIWRUtvgdijYFMZ1ZFc9");

const GifComponent = ({ id }) => {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    async function fetchGif() {
      const { data } = await giphyFetch.gif(id);
      setGif(data);
    }
    fetchGif();
  }, []);

  return gif && <Gif gif={gif} width={200} />;
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
            <GifComponent id={row.image_link} />
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
          {data.map((row, index) => (
            <Row row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
