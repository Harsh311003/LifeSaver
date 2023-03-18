import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import { API } from "../config/backend";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.headers.set("Access-Control-Expose-Headers", "Content-Range");
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(`${API}`, httpClient);

export default dataProvider;
