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
