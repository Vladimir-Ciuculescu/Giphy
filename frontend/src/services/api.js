import axios from "axios";

export const getItemsApi = async (params) => {
  const { name, serial_number, lot_number } = params;
  const response = await axios.get("/items", {
    params: {
      ...(name ? { name } : {}),
      ...(serial_number ? { serial_number } : {}),
      ...(lot_number ? { lot_number } : {}),
    },
  });
  return response;
};

export const addItemApi = async (item) => {
  const addedItem = await axios.post("/items/add", item);
  return addedItem;
};

export const editItemApi = async (id,item) => {
  const editedItem = await axios.put(`/items/${id}`, item);
  return editedItem;
};

export const deleteItemApi = async (id) => {
  const response = await axios.delete(`items/${id}`);
  return response;
};

export const getAllCategoriesApi = async () => {
  const response = await axios.get("/categories");
  return response;
}