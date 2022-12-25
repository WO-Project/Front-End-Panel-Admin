import { api } from "../../configs/apiConfig";

import { useState, useEffect } from "react";

export const getArticles = () => {
  const [data, setData] = useState([{}]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataChangedToggle, setDataChangedToggle] = useState(false);
  const [errorDestroy, setErrorDestroy] = useState(null);
  const [loadingDestroy, setLoadingDestroy] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("articles")
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(() => false));
  }, [dataChangedToggle]);

  const refetch = () => {
    setLoading(true);
    api
      .get("articles")
      .then((res) => setData(res.data.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(() => false));
  };

  const destroy = (id) => {
    setLoadingDestroy(true);
    api
      .delete(`/articles/destroy/${id}`)
      .catch((err) => setError(err))
      .finally(() => setLoadingDestroy(() => false));

    setDataChangedToggle(!dataChangedToggle);
  };

  return {
    data,
    error,
    errorDestroy,
    loading,
    loadingDestroy,
    refetch,
    destroy,
  };
};
