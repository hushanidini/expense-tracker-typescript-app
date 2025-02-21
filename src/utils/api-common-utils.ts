import axios, { AxiosError } from "axios";

export class ApiRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiRequestError";
  }
}

// handle errors
export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      return axiosError.response.data;
    } else if (axiosError.request) {
      return axiosError.request;
    } else {
      return axiosError.message;
    }
  } else {
    console.error("Non-Axios error:", error);
    return error;
  }
};
