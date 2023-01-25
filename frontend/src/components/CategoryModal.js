import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { addCategoryApi, getCategoriesApi } from "../services/api";
import Textarea from "@mui/joy/Textarea";

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

  const addCategory = async () => {
    const category = {
      name: name,
      description: description,
    };

    await addCategoryApi(category);
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
      onClose={() => setOpenCategoryModal(false)}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Categories</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          //ref={descriptionElementRef}
          tabIndex={-1}
        >
          <List>
            {categories.map((category) => (
              <ListItem>
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
