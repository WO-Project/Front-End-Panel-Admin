import { api } from '../../configs/apiConfig'

export const putBride = async (values, id) => {
  const response = await api.put('brides/update/' + id, values)
    .then(res => res)
    .catch(err => err)

  return response
}