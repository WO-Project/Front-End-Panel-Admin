import { api } from '../../configs/apiConfig'

export const putProduct = async (form, id) => {
  const response = await api.put('products/update/' + id, form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
  )
    .then(res => res.data.success)
    .catch(err => err)

  return response
}