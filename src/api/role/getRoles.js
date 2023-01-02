import { useEffect, useState } from 'react'
import { api } from "../../configs/apiConfig";

export const getRoles = (url = 'access-menus') => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [deleteToggle, setDeleteToggle] = useState(false)

  useEffect(() => {
    api
      .get(url)
      .then(res => setData(res.data.data))
      .catch(err => setError(err))
  }, [deleteToggle])

  const deleteRole = async (id) => {
    const deleted = api
      .delete(url + '/destroy/' + id)
      .then(res => {
        setDeleteToggle(!deleteToggle)
        return res
      })
      .catch(err => setError(err))

    return deleted
  }

  return { data, error, deleteRole }
}
