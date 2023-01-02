import axios from "axios";

const {
  NODE_ENV,
  REACT_APP_API_PROD,
  REACT_APP_API_DEV,
  REACT_APP_ASSETS_PROD,
  REACT_APP_ASSETS_DEV,
} = process.env;

const token = localStorage.getItem("token");

const config = {
  baseURL: NODE_ENV === "production" ? REACT_APP_API_PROD : REACT_APP_API_DEV,
  timeout: 10000,
  headers: { Authorization: token },
};

export const api = axios.create(config);

export const asset = (asset) =>
  `${
    NODE_ENV === "production" ? REACT_APP_ASSETS_PROD : REACT_APP_ASSETS_DEV
  }${asset}`;
