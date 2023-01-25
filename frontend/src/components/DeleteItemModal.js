import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteItemApi } from "../services/api";

const DeleteItemModal = ({ open, handleClose, itemId }) => {
  const deleteItem = async () => {
    await deleteItemApi(itemId);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemModal;
