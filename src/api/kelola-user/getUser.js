import { api } from "../../configs/apiConfig";
import { useEffect, useState } from "react";

export const getUsers = (url = "users") => {
  const [data, setData] = useState(null);
  const [type, setType] = useState(null);
  const [error, setError] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(false)

  useEffect(() => {
    api
      .get(url)
      .then(res => {
        setData(res.data.data.users)
        setType(res.data.data.types)
      })
      .catch(err => setError(err))
  }, [deleteToggle])

  const deleteUser = async (id) => {
    const deleted = api
      .delete(url + '/destroy/' + id)
      .then(res => {
        setDeleteToggle(!deleteToggle)
        return res
      })
      .catch(err => setError(err))

    return deleted
  }

  return { data, type, error, deleteUser };
};
