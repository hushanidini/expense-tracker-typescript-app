import axios from "axios";

export const httpGet = (url: string, params?: object) => {
  return axios.get(url, { params });
};

export const httpPost = <T>(url: string, data?: T) => {
  return axios.post(url, data);
};

export const httpPut = <T>(url: string, data: T) => {
  return axios.put(url, data);
};

export const httpPatch = <T>(url: string, data: T) => {
  return axios.patch(url, data);
};

export const httpDelete = (url: string, params?: object) => {
  return axios.delete(url, { params });
};
