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
  const deletedItem = await axios.delete(`items/${id}`);
  return deletedItem;
};

export const getCategoriesApi = async () => {
  const categories = await axios.get("/categories");
  return categories;
};

export const addCategoryApi = async (category) => {
  const addedCategory = await axios.post("/categories/add", category);
  return addedCategory;
};

export const deleteCategoryApi = async (id) => {
  const deletedCategory = await axios.delete(`/categories/${id}`);

  return deletedCategory;
};

export const updateCategoryApi = async (id, data) => {
  const updatedCategory = await axios.put(`/categories/${id}`, data);
  return updatedCategory;
};

export const getAllCategoriesApi = async () => {
  const response = await axios.get("/categories");
  return response;
}