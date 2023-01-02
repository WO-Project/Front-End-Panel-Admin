import { api } from "../../../configs/apiConfig";

export const postProductCategory = async (values) => {
  const response = await api.post('product-categories/store', values)
    .then(res => res.data)
    .catch(err => err)

  return response
}