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
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import {
  addItemApi,
  assignCategoryApi,
  editItemApi,
  getAllCategoriesApi,
} from "../services/api";
import { AppContext } from "../App";

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

const ItemModal = () => {
  const { modalMode, item, setOpenModal, openModal, items, setItems } =
    useContext(AppContext);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    if (modalMode === "edit") {
      setId(item.id);
      setName(item.name);
      setPrice(item.price);
      setMaterial(item.material);
      setSize(item.size);
      setDescription(item.description);
      setCategory(item.categories.map((cat) => cat.name));
      setSerialNumber(item.items_details.serial_number);
      setLotNumber(item.items_details.lot_number);
      setImageLink(item.image_link);
    } else {
      clearForm();
    }
  }, [openModal, modalMode]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const { data } = await getAllCategoriesApi();
    setCategoryList(data);
  };

  const handleChange = (e) => {
    setCategory(e);
  };

  const clearForm = () => {
    setName("");
    setPrice("");
    setMaterial("");
    setSize("");
    setDescription("");
    setCategory([]);
    setSerialNumber("");
    setLotNumber("");
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
    setOpenModal(false);
  };

  const editItem = async () => {
    const item = {
      id,
      name,
      price,
      material,
      size,
      description,
      image_link: imageLink,
      serial_number: serialNumber,
      lot_number: lotNumber,
    };
    await editItemApi(id, item);
    clearForm();
    setOpenModal(false);
  };

  const cancel = () => {
    clearForm();
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onClose={cancel}>
      <DialogTitle>
        {modalMode === "edit" ? "Edit item" : "Add a new item"}
      </DialogTitle>
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

        <Grid item md={12} mb={2}>
          <Textarea
            placeholder="Add item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        {modalMode === "edit" && (
          <Grid container>
            <Grid item md={12} mb={2}>
              <Select
                multiple
                value={category}
                onChange={(e) => handleChange(e.target.value)}
              >
                {categoryList.map((cat) => (
                  <MenuItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md={12} mb={2}>
              <Textarea
                placeholder="Serial number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </Grid>

            <Grid item md={12}>
              <Textarea
                placeholder="Lot number"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>Cancel</Button>
        {modalMode === "edit" ? (
          <Button onClick={editItem}>Save</Button>
        ) : (
          <Button onClick={addItem}>Add</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ItemModal;
