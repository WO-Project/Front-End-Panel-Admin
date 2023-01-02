import { useEffect, useState } from "react";
import { api } from "../configs/apiConfig";

const METHOD_ID = {
  GET_ALL_DATA: "getAll",
  GET_DETAIL: "getDetail",
  DESTROY_DATA: "destroy",
  UPDATE_DATA: "update",
  CREATE_DATA: "create",
};

export const useData = (base_url) => {
  const [data, setData] = useState([{}]);
  const [detailData, setDetailData] = useState({});
  const [changed, setChanged] = useState(true);
  const [error, setError] = useState({
    getAll: null,
    getDetail: null,
    destroy: null,
    update: null,
    create: null,
  });
  const [loading, setLoading] = useState({
    getAll: true,
    getDetail: false,
    destroy: false,
    update: false,
    create: false,
  });

  const generateApi = (methodId, id = null, value = null) => {
    setLoading((prev) => ({ ...prev, [methodId]: true }));
    setError({ ...error, [methodId]: null });

    let req;
    switch (methodId) {
      case METHOD_ID.GET_ALL_DATA:
        req = api.get(base_url);
        break;
      case METHOD_ID.GET_DETAIL:
        req = api.get(`${base_url}/${id}`);
        break;
      case METHOD_ID.CREATE_DATA:
        setChanged(false);
        req = api.post(`${base_url}/store`, value);
        break;
      case METHOD_ID.UPDATE_DATA:
        setChanged(false);
        req = api.put(`${base_url}/update/${id}`, value);
        break;
      case METHOD_ID.DESTROY_DATA:
        setChanged(false);
        req = api.delete(`${base_url}/destroy/${id}`);
        break;
      default:
        throw "methodId may be wrong!";
    }

    switch (methodId) {
      case METHOD_ID.GET_ALL_DATA:
        req = req.then((d) => {
          setData(d.data.data);
          return d;
        });
        break;
      case METHOD_ID.GET_DETAIL:
        req = req.then((d) => {
          setDetailData(d.data.data);
          return d;
        });
        break;
      default:
        req = req.then((d) => {
          setChanged(true);
          return d;
        });
        break;
    }

    return req
      .catch((e) => setError({ ...error, [methodId]: e?.response }))
      .finally(() =>
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, [methodId]: false }));
        }, 0)
      );
  };

  useEffect(() => {
    if (changed) {
      generateApi(METHOD_ID.GET_ALL_DATA);
    }
  }, [changed]);

  const method = {
    getAll: () => {
      return generateApi(METHOD_ID.GET_ALL_DATA);
    },

    getDetail: (id) => {
      return generateApi(METHOD_ID.GET_DETAIL, id);
    },

    destroy: (id) => {
      return generateApi(METHOD_ID.DESTROY_DATA, id);
    },

    update: (id, data) => {
      return generateApi(METHOD_ID.UPDATE_DATA, id, data);
    },

    create: (value) => {
      return generateApi(METHOD_ID.CREATE_DATA, null, value);
    },
  };

  return {
    data,
    error,
    loading,
    method,
  };
};

// ===================
// independence method
// ===================

export const getDetail = (base_url, id) => {
  const [data, setData] = useState();
  const [err, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get(`${base_url}/${id}`)
      .then((r) => setData(r.data.data))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setLoading(() => false));
  }, []);

  const refetch = () => {
    setLoading(true);

    api
      .get(`${base_url}/${id}`)
      .then((r) => setData(r.data.data))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setLoading(() => false));
  };

  return { data, err, loading, refetch };
};

export const create = async (base_url, value) => {
  return await api
    .post(`${base_url}/store`, value)
    .then((r) => r)
    .catch((e) => e);
};

export const update = async (base_url, id, value) => {
  return await api
    .put(`${base_url}/update/${id}`, value)
    .then((r) => r)
    .catch((e) => e);
};
