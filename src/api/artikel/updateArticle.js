import { api } from "../../configs/apiConfig";

export const updateArticle = (values, id) =>
  api
    .post(`/articles/update/${id}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res)
    .catch((err) => err.response.data.message);
