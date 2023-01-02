import { api } from "../../../configs/apiConfig";

import { useState, useEffect } from "react";

export const getArticleCategories = () => {
  const [data, setData] = useState([{}]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorDestroy, setErrorDestroy] = useState(null);
  const [loadingDestroy, setLoadingDestroy] = useState(true);
  const [dataChangedToggle, setDataChangedToggle] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/article-categories")
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [dataChangedToggle]);

  const refetch = () => {
    setLoading(true);
    api
      .get("/article-categories")
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const destroy = (id) => {
    setLoadingDestroy(true);

    api
      .delete(`/article-categories/destroy/${id}`)
      .catch((err) => setErrorDestroy(err))
      .finally(() => setLoadingDestroy(() => false));

    dataChangedToggle
      ? setDataChangedToggle(false)
      : setDataChangedToggle(true);
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
