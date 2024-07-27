// 1. create a context

import { createContext, useState, useContext } from "react";
import React from "react";
import {
  executeBasicAuthenticationService,
  executeJwtAuthenticationService,
} from "../api/AuthenticationApiService";
import { axiosClient } from "../api/ApiClient";
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    // const baToken = "Basic " + window.btoa(username + ":" + password);

    try {
      // const response = await executeBasicAuthenticationService(baToken);

      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      console.log(response);
      const jwt = `Bearer ${response.data.token}`;
      if (response.status === 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(jwt);

        axiosClient.interceptors.request.use((config) => {
          console.log("intereotor");
          config.headers.Authorization = jwt;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (e) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
