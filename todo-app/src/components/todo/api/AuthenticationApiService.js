import { axiosClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) =>
  axiosClient.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });

// export const executeJwtAuthenticationService = (username, password) => {
//   console.log(username, password);
//   axiosClient.post("/authenticate", { username, password });
// };

export const executeJwtAuthenticationService = (username, password) =>
  axiosClient.post(`/authenticate`, { username, password });
