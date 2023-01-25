import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../App";

const CategoryModal = () => {
  const { openCategoryModal, setOpenCategoryModal } = useContext(AppContext);

  return (
    <Dialog
      maxWidth={false}
      PaperProps={{
        sx: {
          minHeight: "50vh",
          maxHeight: "50vh",
          width: "30%",
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
          adaw
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenCategoryModal(false)}>Cancel</Button>
        <Button onClick={() => setOpenCategoryModal(false)}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;
