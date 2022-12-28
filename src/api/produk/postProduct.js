
import { api } from "../../configs/apiConfig";

export const postProduct = async (form) => {
  const response = await api.post('products/store', form, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
    .then(res => res.data.success)
    .catch(err => false)

  return response
}