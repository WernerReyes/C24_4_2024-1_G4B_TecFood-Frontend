import { errorMessage, getEnvs } from "@/presentation/utilities";
import axios, { AxiosInstance } from "axios";
import daysjs from "dayjs";
import { jwtDecode, JwtPayload } from "jwt-decode";

let token = localStorage.getItem("token")
  ? localStorage.getItem("token")
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

      const response = await axios.get(`${baseURL}/auth/revalidate-token`);
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
        const message = "Error Server, please try again later";
        errorMessage([message]);
        return Promise.reject({
          status: 500,
          message,
        });
      }
      errorMessage([error.response.data.error]);
      return Promise.reject(error.response.data);
    },
  );
};
