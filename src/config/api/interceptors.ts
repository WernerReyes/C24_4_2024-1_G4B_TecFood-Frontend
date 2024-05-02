import axios, { AxiosInstance } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import daysjs from "dayjs";
import { getEnvs, SonnerManager } from "@/utilities";

let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")!)
  : null;

const baseURL = getEnvs().VITE_API_URL;

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  //* Token refresh interceptor
  axiosInstance.interceptors.request.use(async (req) => {
    if (token) {
      const user = jwtDecode<JwtPayload>(token);
      const isExpired = daysjs.unix(user.exp!).diff(daysjs()) < 1;
      if (!isExpired) {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
      }

      const response = await axios.post(`${baseURL}/auth/refresh-token`, {
        refresh: token.refresh,
      });

      token = response.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (!error.response) {
        return Promise.reject({
          status: 500,
          message: "Error Server, please try again later",
        });
      }

      SonnerManager.error(error.response.data.message ?? "No hay errores");
      return Promise.reject(error.response.data);
    },
  );
};
