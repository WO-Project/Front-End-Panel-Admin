import { api } from '../../configs/apiConfig'

export const postBride = async (values) => {
  const response = await api.post('brides/store', values)
    .then(res => res)
    .catch(err => err)

  return response
}