import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { addItemApi } from "../services/api";

const sizes = [
  {
    value: "small",
    label: "small",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "large",
    label: "large",
  },
];

const AddItemModal = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");

  const clearForm = () => {
    setName("");
    setPrice(null);
    setMaterial("");
    setSize("");
    setDescription("");
    setImageLink("");
  };

  const addItem = async () => {
    const item = {
      name,
      price,
      material,
      size,
      description,
      image_link: imageLink,
    };
    await addItemApi(item);
    clearForm();
    handleClose();
  };

  const cancel = () => {
    clearForm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>Add new item</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Add new item with all necessary info
        </DialogContentText>

        <Grid mb={2} container direction="row" columnGap={4}>
          <Grid item>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid mb={2} container direction="row" columnGap={4}>
          <Grid item>
            <TextField
              label="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </Grid>
          <Grid item sx={{ display: "flex", width: "46%" }}>
            <TextField
              label="Size"
              select
              sx={{ width: "100%" }}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {sizes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid item md={12} mb={2}>
          <Textarea
            placeholder="Giphy id"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
        </Grid>

        <Grid item md={12}>
          <Textarea
            placeholder="Add item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={addItem}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;
