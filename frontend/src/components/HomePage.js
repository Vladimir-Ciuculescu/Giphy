import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CollapsibleTable from "./ItemsTable";
import OptionsBar from "./OptionsBar";

const HomePage = () => {
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
          <CollapsibleTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
