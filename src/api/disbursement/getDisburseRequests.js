import { api } from "../../configs/apiConfig";

import { useState, useEffect } from "react";

export const getDisburseRequests = (url = "commission-disbursement") => {
  const [data, setData] = useState([{}]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    setError(() => false);
    setLoading(() => true);

    api
      .get(`${url}/requests`)
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

  const deleteRequests = (id) => {
    const isDeleted = api
      .delete(`${url}/destroy/${id}`)
      .then((res) => {
        setDeleteToggle(!deleteToggle);
        return res.data?.success;
      })
      .catch((err) => setError(err));

    return isDeleted;
  };

  return { data, error, refetch, deleteRequests, loading };
};
