import { api } from '../../configs/apiConfig'

export const putCostumer = async (values, id) => {
  const response = await api
    .put("customers/update/" + id, values)
    .then(res => res.data.success)
    .catch(err => err)

  return response
}