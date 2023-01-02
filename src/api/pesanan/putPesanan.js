import { api } from '../../configs/apiConfig'

export const putPesanan = async (values, id) => {
  const response = await api.put(`sales-order-items/update/${id}`, values)
    .then(res => res.data.success)
    .catch(err => err)

  return response
}