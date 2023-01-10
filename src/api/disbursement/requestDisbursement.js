import { api } from "../../configs/apiConfig";

export const requestDisbursement = async (value) => {
  return await api
    .post("commission-disbursement/disbursement-request", value)
    .then((response) => response)
    .catch((error) => error.response);
};
