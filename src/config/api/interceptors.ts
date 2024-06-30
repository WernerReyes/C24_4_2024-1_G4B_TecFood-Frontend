import axios, { AxiosInstance } from "axios";
import daysjs from "dayjs";
import type { LoginUserResponse } from "@/infraestructure/services";
import { errorMessage, getEnvs, getStorage } from "@/presentation/utilities";
import { JwtPayload, jwtDecode } from "jwt-decode";

const { VITE_API_URL } = getEnvs();

let token = getStorage<string>("token") ? getStorage<string>("token") : null;

const axiosInstanceForTokenRenewal = axios.create({
  baseURL: VITE_API_URL,
});

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  //* Token refresh interceptor
  axiosInstance.interceptors.request.use(async (req) => {
    if (!token)
      token = getStorage<string>("token") ? getStorage<string>("token") : null;

    if (token) {
      const user = jwtDecode<JwtPayload>(token);

      const isExpired = daysjs.unix(user.exp!).diff(daysjs()) < 1;
      if (!isExpired) {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
      }

      const { data } =
        await axiosInstanceForTokenRenewal.post<LoginUserResponse>(
          `/auth/renovate-token?expiredToken=${token}`,
        );
      token = data.token;
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.error(error);
      if (!error.response) {
        const message = "Error Server, please try again later";
        errorMessage([message]);
        return Promise.reject({
          status: 500,
          message,
        });
      }

      const errorMsg = error.response.data.error;
      if (errorMsg) {
        errorMessage([errorMsg]);
      }
      return Promise.reject(error.response.data);
    },
  );
};
