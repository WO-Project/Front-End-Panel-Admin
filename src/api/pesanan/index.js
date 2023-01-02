import { api } from "../../configs/apiConfig";

import { useState, useEffect } from "react";

export const getOrders = () => {
  const [data, setData] = useState([{}])
  const [error, setError] = useState(null)
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    api
      .get("sales-order-items")
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
  }, [deleteToggle])

  const refetch = () => {
    api
      .get("sales-order-items")
      .then((res) => setData(res.data.data.data))
      .catch((err) => setError(err));
  }

  const deletePesanan = (id) => {
    const isDeleted = api.delete(`sales-order-items/destroy/${id}`)
    .then(res => {
      setDeleteToggle(!deleteToggle)
      return res.data?.success
    })
    .catch(err => setError(err))

    return isDeleted
  }

  return { data, error, refetch, deletePesanan }
}