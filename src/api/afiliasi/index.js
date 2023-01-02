import { useData, getDetail, create, update } from "../apiTemplate";

export const useAffiliatesData = () => useData("affiliates");

export const useAffiliatesDetail = (id) => getDetail("affiliates", id);

export const createAffiliates = (value) => create("affiliates", value);

export const updateAffiliates = (id, value) => update("affiliates", id, value);

export const detailAffiliates = (id) => getDetail("affiliates", id);
