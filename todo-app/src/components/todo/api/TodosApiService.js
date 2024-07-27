import { axiosClient } from "./ApiClient";

export const retrieveTodosForUserApi = (username) =>
  axiosClient.get(`/users/${username}/todos`);

export const deleteTodoApi = (username, id) =>
  axiosClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoApi = (username, id) =>
  axiosClient.get(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username, id, body) =>
  axiosClient.put(`/users/${username}/todos/${id}`, body);

export const createTodoApi = (username, body) =>
  axiosClient.post(`/users/${username}/todos`, body);
