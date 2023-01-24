import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Textarea from "@mui/joy/Textarea";

const AddItemModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new item</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Add new item with all necessary info
        </DialogContentText>

        <Grid mb={2} container direction="row" columnGap={4}>
          <Grid item>
            <TextField label="Name" />
          </Grid>
          <Grid item>
            <TextField label="Price" />
          </Grid>
        </Grid>

        <Grid mb={2} container direction="row" columnGap={4}>
          <Grid item>
            <TextField label="Material" />
          </Grid>
          <Grid item>
            <TextField label="Size" />
          </Grid>
        </Grid>

        <Grid container direction="row" columnGap={6}>
          <Grid item md={12}>
            <Textarea placeholder="Add item description" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;
