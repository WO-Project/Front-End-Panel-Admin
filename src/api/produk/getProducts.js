import { useEffect, useState } from "react";

import { api } from "../../configs/apiConfig";

export const getProducts = (url = "products") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(url)
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [deleteToggle]);

  const deleteProduct = (id) => {
    setLoading(true);
    const deleted = api
      .delete(url + "/destroy/" + id)
      .then((res) => {
        setDeleteToggle(!deleteToggle);
        return res.data.success;
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    return deleted;
  };

  return { data, error, deleteProduct, loading };
};
