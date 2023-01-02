import { useData, create, getDetail, update } from "../apiTemplate";

export const useCommisionData = () => useData("commissions");

export const useCommisionDetail = (id) => getDetail("commissions", id);

export const createCommision = (value) => create("commissions", value);

export const updateCommision = (id, value) => update("commissions", id, value);
