import { api } from '../../configs/apiConfig'

export const putTransfer = async (values, id) => {
  const response = await api.post(`commission-disbursement/transfer/${id}`, values)
    .then(res => res.data.success)
    .catch(err => err)

  return response
}