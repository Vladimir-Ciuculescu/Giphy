import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getItemsApi } from "../services/api";
import DeleteItemModal from "./DeleteItemModal";
import ItemsTable from "./ItemsTable";
import OptionsBar from "./OptionsBar";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);

  useEffect(() => {
    const getItems = async () => {
      const { data } = await getItemsApi({});

      setItems(data);
    };

    getItems();
  }, []);

  const handleData = (e) => {
    setItems(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openDeleteModal = (id) => {
    console.log(id);
    setIdToDelete(id);
    setOpen(true);
  };

  return (
    <Container maxWidth={false} sx={{ width: "85%", mt: 6 }}>
      <Grid container direction="column" rowGap={4}>
        <Grid item xs={12} md={12} lg={12} sx={{ background: "#4a148c" }}>
          <Typography
            sx={{
              fontSize: 25,
              pl: 10,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Items table
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <OptionsBar handleData={handleData} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <ItemsTable items={items} openDeleteModal={openDeleteModal} />
        </Grid>
        {items.length === 0 && (
          <Grid item xs={12} md={12} lg={12}>
            <Typography sx={{ textAlign: "center" }}>
              There are no results found !
            </Typography>
          </Grid>
        )}
      </Grid>
      <DeleteItemModal
        itemId={idToDelete}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default HomePage;
