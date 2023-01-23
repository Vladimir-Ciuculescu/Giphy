import axios from "axios";

export const getItemsApi = async () => {
  const { data } = await axios.get("/items");

  return data;
};
