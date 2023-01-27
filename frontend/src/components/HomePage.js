import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { getItemsApi } from "../services/api";
import CategoryModal from "./CategoryModal";
import DeleteItemModal from "./DeleteItemModal";
import ItemModal from "./ItemModal";
import ItemsTable from "./ItemsTable";
import OptionsBar from "./OptionsBar";

const HomePage = () => {
  const { items, setItems } = useContext(AppContext);

  useEffect(() => {
    const getItems = async () => {
      const { data } = await getItemsApi({});
      setItems(data);
    };

    getItems();
  }, []);

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
          <OptionsBar />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <ItemsTable items={items} />
        </Grid>
        {items.length === 0 && (
          <Grid item xs={12} md={12} lg={12}>
            <Typography sx={{ textAlign: "center" }}>
              There are no results found !
            </Typography>
          </Grid>
        )}
      </Grid>
      <DeleteItemModal />
      <CategoryModal />
      <ItemModal />
    </Container>
  );
};

export default HomePage;
