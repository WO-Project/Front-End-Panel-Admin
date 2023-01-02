import { api } from '../../../configs/apiConfig'

export const putProductCategory = async (values, id) => {
  const response = await api.put('product-categories/update/' + id, values)
    .then(res => res.data.success)
    .catch(err => err)

  return response
}