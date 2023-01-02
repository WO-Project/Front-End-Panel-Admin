import { api } from "../../configs/apiConfig";

export const postArticle = (values) =>
  api
    .post("/articles/store", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res)
    .catch((err) => err.response.data.message);
