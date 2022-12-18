import { getDetail, update } from "../apiTemplate";

export const useUserDetail = (id) => getDetail("users", id);

export const updateUser = (id, data) => update("users", id, data);
