import { useState, useEffect } from "react";

import { api } from "../../configs/apiConfig";

import { message } from "antd";

export const useRichEditorData = (url) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState({
    get: null,
    update: null,
  });
  const [loading, setLoading] = useState(false);
  const [updatedSuccess, setUpdatedSucess] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get(`${url}/1`)
      .then((d) => setValue(d.data.data.description))
      .catch((e) => setError((prev) => ({ ...prev, get: e })))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (error.update) {
      message.error(`Gagal menyimpan perubahan!`, 3);
    }
  }, [error.update]);

  useEffect(() => {
    if (updatedSuccess) {
      message.success(`Berhasil menyimpan perubahan!`, 3);
    }
  }, [updatedSuccess]);

  const update = () => {
    setUpdatedSucess(false);
    setLoading(true);

    api
      .put(`${url}/update/1`, {
        description: value,
        status: 1,
        wedding_organizer_id: 0,
      })
      .then(() => setUpdatedSucess(true))
      .catch((e) => setError((prev) => ({ ...prev, update: e })))
      .finally(() => setLoading(false));
  };

  return {
    data: { value, setValue },
    error,
    loading,
    method: {
      update,
    },
  };
};
