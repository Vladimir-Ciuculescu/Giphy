import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoriesApi,
} from "../services/api";
import Textarea from "@mui/joy/Textarea";
import CloseIcon from "@mui/icons-material/Close";

const CategoryModal = () => {
  const { openCategoryModal, setOpenCategoryModal } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await getCategoriesApi();
      setCategories(data);
    };
    if (openCategoryModal) {
      getCategories();
    } else {
      setCategories([]);
    }
  }, [openCategoryModal]);

  const clearForm = () => {
    setName("");
    setDescription("");
  };

  const addCategory = async () => {
    const category = {
      name: name,
      description: description,
    };

    const { data } = await addCategoryApi(category);

    setCategories((oldCategories) => [
      ...oldCategories,
      { ...category, id: data.identifiers[0].id },
    ]);

    clearForm();
  };

  const deleteCategory = async (id) => {
    await deleteCategoryApi(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  const closeModal = () => {
    setOpenCategoryModal(false);
    clearForm();
  };

  return (
    <Dialog
      maxWidth={false}
      PaperProps={{
        sx: {
          minHeight: "60vh",
          maxHeight: "60vh",
          width: "40%",
        },
      }}
      open={openCategoryModal}
      onClose={closeModal}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Categories</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <List>
            {categories.map((category) => (
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => deleteCategory(category.id)}
                    disableRipple
                    edge="end"
                    aria-label="delete"
                  >
                    <CloseIcon sx={{ color: "red" }} />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={category.name}
                  secondary={category.description}
                />
              </ListItem>
            ))}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <TextField
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <Textarea
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={addCategory}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;
