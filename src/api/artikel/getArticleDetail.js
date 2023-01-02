import { api } from "../../configs/apiConfig";

import { useState, useEffect } from "react";

export const getArticleDetail = (id) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`articles/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const refetch = () => {
    setLoading(true);
    api
      .get(`articles/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return { data, error, loading, refetch };
};
