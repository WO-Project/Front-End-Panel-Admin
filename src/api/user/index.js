import { useState } from "react";
import { api } from "../../configs/apiConfig";
import { getDetail, update } from "../apiTemplate";

export const useUserDetail = (id) => getDetail("users", id);

export const updateUser = (id, data) => update("users", id, data);

export const updatePw = async (id, data) =>
  await api
    .put(`users/update-password/${id}`, data)
    .then((data) => data)
    .catch((error) => error);
