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
  await axios.post("/items/add", item);
};

export const editItemApi = async (id, item, categories) => {
  await axios.put(`/items/${id}`, { item, categories });
};

export const deleteItemApi = async (id) => {
  await axios.delete(`items/${id}`);
};

export const getCategoriesApi = async () => {
  return await axios.get("/categories");
};

export const addCategoryApi = async (category) => {
  return await axios.post("/categories/add", category);
};

export const deleteCategoryApi = async (id) => {
  await axios.delete(`/categories/${id}`);
};

export const updateCategoryApi = async (id, data) => {
  await axios.put(`/categories/${id}`, data);
};

export const getAllCategoriesApi = async () => {
  return await axios.get("/categories");
};

export const assignCategoryApi = async (ids) => {
  await axios.put("/items", ids);
};
