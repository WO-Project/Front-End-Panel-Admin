import { api } from "../../configs/apiConfig";

export const deletePesanan = async (id) => {
  const response = await api.delete(`sales-order-items/destroy/${id}`)
    .then(res => res.data.success)
    .catch(err => err)

  return response
}