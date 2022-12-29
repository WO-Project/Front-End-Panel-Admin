import { useEffect, useState } from "react";
import { api } from "../../configs/apiConfig";

export const getOneUser = (id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("users/" + id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(() => false));
  }, []);

  return { data, error, loading };
};
