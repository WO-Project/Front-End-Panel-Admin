import { api } from '../../configs/apiConfig'

export const postCustomer = async (values) => {
  const response = await api
    .post("customers/store", values)
    .then(res => res.data.success)
    .catch(err => err)

  return response
}