import { useEffect, useState } from "react";
import { api } from "../../../configs/apiConfig";

export const contacts = () => {
  const [data, setData] = useState([{}]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);

  const resetControlFlowState = () => {
    setError("");
    setLoading(true);
  };

  useEffect(() => {
    resetControlFlowState();

    api
      .get("terms-conditions")
      .then((d) => setData(d.data.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [changed]);

  return { data, error, loading };
};
