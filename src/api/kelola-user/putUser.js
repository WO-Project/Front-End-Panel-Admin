import { api } from '../../configs/apiConfig'

export const putUser = async (values, id) => {
  const response = await api.put('users/update/' + id, values)
    .then(res => res)
    .catch(err => err)

  return response
}