import { useData, create, getDetail, update } from "../apiTemplate";

export const useKuponData = () => useData("vouchers");

export const useKuponDetail = (id) => getDetail("vouchers", id);

export const createKupon = (value) => create("vouchers", value);

export const updateKupon = (id, value) => update("vouchers", id, value);
