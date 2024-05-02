import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getEnvs } from "@/utilities";
import { setupInterceptors } from "./interceptors";

type ResponseData<T> = {
  data: T;
  status: number;
  statusText: string;
};

type Methods = "GET" | "POST" | "PUT" | "DELETE";

const baseURL = getEnvs().VITE_API_URL;

export const httpRequest = async <T>(
  url: string,
  method: Methods,
  data?: any,
  options?: AxiosRequestConfig,
): Promise<ResponseData<T>> => {
  try {
    const response: AxiosResponse<T> = await axios(`${baseURL}${url}`, {
      method,
      ...options,
      data,
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    throw error;
  }
};

setupInterceptors(axios);
