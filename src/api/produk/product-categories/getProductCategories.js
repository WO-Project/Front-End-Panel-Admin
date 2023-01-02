import { api } from "../../../configs/apiConfig";

export const getProductCategories = async () => {
  const response = await api
    .get("product-categories")
    .then((res) => res.data.data)
    .catch((err) => err);

  return response;
};
