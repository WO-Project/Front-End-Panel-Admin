import { api } from "../../configs/apiConfig";

export const postRole = async (values) => {
  const response = api
    .post("access-menus/store", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res)
    .catch((err) => err);

  return response
} 
