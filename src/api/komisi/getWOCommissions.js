import { api } from "../../configs/apiConfig";

import { useState, useEffect } from "react";

export const getWOCommissions = (url = "commission-history") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    setLoading(() => true);
    api
      .get(`${url}/wo-history`)
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(() => false));
  }, [deleteToggle]);

  const refetch = () => {
    api
      .get(url)
      .then((res) => setData(res.data.data.data))
      .catch((err) => setError(err));
  };

  const deletePesanan = (id) => {
    const isDeleted = api
      .delete(`${url}/destroy/${id}`)
      .then((res) => {
        setDeleteToggle(!deleteToggle);
        return res.data?.success;
      })
      .catch((err) => setError(err));

    return isDeleted;
  };

  return { data, error, refetch, deletePesanan, loading };
};
