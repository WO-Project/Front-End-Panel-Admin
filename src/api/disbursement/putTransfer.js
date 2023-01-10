import { api } from "../../configs/apiConfig";

export const putTransfer = async (values, id) => {
  const response = await api
    .post(`commission-disbursement/transfer/${id}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data.success);

  return response;
};
