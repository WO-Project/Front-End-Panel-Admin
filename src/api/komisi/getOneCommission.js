import { api } from "../../configs/apiConfig";
import { useState, useEffect } from "react";

export const getOneCommission = (id, url = "commission-history") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`${url}/${id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(() => false));
  }, []);

  return { data, error, loading };
};
