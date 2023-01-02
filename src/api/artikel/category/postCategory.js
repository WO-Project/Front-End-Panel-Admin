import { api } from "../../../configs/apiConfig";

export const postArticleCategory = async (values) => {
  const response = await api.post("article-categories/store", values)
    .then((res) => res)
    .catch((err) => err);

  return response
}
