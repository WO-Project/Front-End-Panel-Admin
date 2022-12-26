import { useEffect, useState } from "react";

import { api } from "../../configs/apiConfig";

function factoryFetcher(url) {
  return () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      setError("");

      api
        .get(url)
        .then((d) => setData(d.data.data))
        .catch((e) => setError(e))
        .finally(() => setLoading(() => false));
    }, []);

    return { data, error, loading };
  };
}

// export const getCount = useData("dashboard/counts");
// export const getBestSelling = useData("dashboard/best-selling");
// export const getLatestOrder = useData("dashboard/last-order");

export const getCount = factoryFetcher("dashboard/counts");
export const getBestSelling = factoryFetcher("dashboard/best-selling");
export const getLatestOrder = factoryFetcher("dashboard/last-order");
