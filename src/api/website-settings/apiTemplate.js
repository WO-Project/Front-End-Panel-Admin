import { useEffect, useState } from "react";
import { api } from "../../configs/apiConfig";

const METHOD_ID = {
  GET_ALL_DATA: "getAll",
  GET_DETAIL: "getDetail",
  DESTROY_DATA: "destroy",
  UPDATE_DATA: "update",
  CREATE_DATA: "create",
  CREATE_RESOURCES: "createResources",
};

export const useData = (url) => {
  const [data, setData] = useState([{}]);
  const [changed, setChanged] = useState(true);
  const [error, setError] = useState({
    getAll: null,
    destroy: null,
    update: null,
    create: null,
    createResources: null,
  });
  const [loading, setLoading] = useState({
    getAll: true,
    destroy: false,
    update: false,
    create: false,
    createResources: false,
  });

  const generateApi = (methodId, id = null, value = null) => {
    setLoading((prev) => ({ ...prev, [methodId]: true }));
    setError({ ...error, [methodId]: null });

    let req;
    switch (methodId) {
      case METHOD_ID.GET_ALL_DATA:
        req = api.get(url);
        break;
      case METHOD_ID.CREATE_DATA:
        setChanged(false);
        req = api.post(`${url}/store`, value);
        break;
      case METHOD_ID.CREATE_RESOURCES:
        setChanged(false);
        req = api.post(`${url}/store`, value, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        break;
      case METHOD_ID.UPDATE_DATA:
        setChanged(false);
        req = api.put(`${url}/update/${id}`, value);
        break;
      case METHOD_ID.DESTROY_DATA:
        setChanged(false);
        req = api.delete(`${url}/destroy/${id}`);
        break;
      default:
        throw "methodId may be wrong!";
    }

    req =
      methodId === METHOD_ID.GET_ALL_DATA
        ? req.then((d) => {
            setData(d.data.data);
            return d;
          })
        : req.then((d) => {
            setChanged(true);
            setChanged(true);
            return d;
          });

    return req
      .catch((e) => setError({ ...error, [methodId]: e }))
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

  const getAll = () => {
    return generateApi(METHOD_ID.GET_ALL_DATA);
  };

  const destroy = (id) => {
    return generateApi(METHOD_ID.DESTROY_DATA, id);
  };

  const update = (id, data) => {
    return generateApi(METHOD_ID.UPDATE_DATA, id, data);
  };

  const create = (value) => {
    return generateApi(METHOD_ID.CREATE_DATA, null, value);
  };

  const createResources = (value) => {
    return generateApi(METHOD_ID.CREATE_RESOURCES, null, value);
  };

  return {
    data,
    error,
    loading,
    method: { getAll, destroy, update, create, createResources },
  };
};
