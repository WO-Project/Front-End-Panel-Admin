import { api } from '../../configs/apiConfig'

export const postWeddingOrganizer = (values) => {
  const response = api.post('wedding-organizers/store', values)
    .then(res => res)
    .catch(err => err)

  return response
}