import {
  Avatar,
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
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
} from "../services/api";
import Textarea from "@mui/joy/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";

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
    getCategories();
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
      { ...category, id: data.id },
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

  const CategoryItem = ({ category }) => {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [isEdit, setIsEdit] = useState(false);

    const handlePress = async (e) => {
      if (e.keyCode === 13) {
        const payload = {
          name: name,
          description: description,
        };

        await updateCategoryApi(category.id, payload);
        setIsEdit(false);
      }
    };

    return (
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
        <ListItemAvatar>
          <IconButton disableRipple onClick={() => setIsEdit(true)}>
            <CreateIcon sx={{ color: "blue" }} />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={
            isEdit ? (
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handlePress}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ border: "none" }}
              />
            ) : (
              name
            )
          }
          secondary={
            isEdit ? (
              <TextField
                value={description}
                onKeyDown={handlePress}
                onChange={(e) => setDescription(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ border: "none" }}
              />
            ) : (
              description
            )
          }
        />
      </ListItem>
    );
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
            {categories.map((category, index) => (
              <CategoryItem category={category} />
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
