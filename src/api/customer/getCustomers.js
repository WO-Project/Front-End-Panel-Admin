import { useEffect, useState } from 'react'
import { api } from '../../configs/apiConfig'

export const getCustomers = (url = 'customers') => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [deleteToggle, setDeleteToggle] = useState(null)

  useEffect(() => {
    api.get(url)
      .then(res => setData(res.data.data))
      .catch(err => setError(err))
  }, [deleteToggle])

  const deleteCustomer = async (id) => {
    const deleted = await api.delete(url + '/destroy/' + id)
      .then(res => {
        setDeleteToggle(!deleteToggle)
        return res.data.success
      })
      .catch(err => setError(err))

    return deleted
  }

  return { data, error, deleteCustomer }
}
