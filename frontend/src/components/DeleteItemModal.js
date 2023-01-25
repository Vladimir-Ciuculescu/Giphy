import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../App";
import { deleteItemApi } from "../services/api";

const DeleteItemModal = () => {
  const {
    openDeleteModal,
    setOpenDeleteModal,
    idItemToDelete,
    setItems,
    items,
  } = useContext(AppContext);

  const deleteItem = async () => {
    await deleteItemApi(idItemToDelete);
    setOpenDeleteModal(false);

    setItems(items.filter((item) => item.id !== idItemToDelete));
  };

  return (
    <Dialog
      open={openDeleteModal}
      onClose={() => setOpenDeleteModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this item ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          By agrreeing, you allow us to delete this row from table and all its
          info from database
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteItem}>Delete</Button>
        <Button onClick={() => setOpenDeleteModal(false)} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemModal;
