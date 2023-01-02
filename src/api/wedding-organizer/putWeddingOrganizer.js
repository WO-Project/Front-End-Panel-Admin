import { api } from '../../configs/apiConfig'

export const putWeddingOrganizer = async (values, id) => {
  const response = await api.put('wedding-organizers/update/' + id, values)
    .then(res => res)
    .catch(err => err)

  return response
}