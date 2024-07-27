import { axiosClient } from "./ApiClient";

export const retrieveHellowWorldBean = () =>
  axiosClient.get("/hello-world-bean");

export const retrieveHellowWorldBeanPathVariable = (pathVariable, token) =>
  axiosClient.get(`/hello-world/path-variable/${pathVariable}`, {});
