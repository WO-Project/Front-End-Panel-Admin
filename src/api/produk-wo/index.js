import { useData, getDetail, create, update } from "../apiTemplate";

export const useProdukWOData = () => useData("wedding-organizer-products");

export const useProdukWODetail = (id) =>
  getDetail("wedding-organizer-products", id);

export const createProdukWO = (value) =>
  create("wedding-organizer-products", value);

export const updateProdukWO = (id, value) =>
  update("wedding-organizer-products", id, value);

export const detailProdukWO = (id) =>
  getDetail("wedding-organizer-products", id);
