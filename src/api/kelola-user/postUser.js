import { api } from '../../configs/apiConfig'

export const postUser = async (values) => {
  const response = await api.post('users/store', values)
    .then(res => res)
    .catch(err => err)

  return response
}