import {
  errorMessage,
  getStorage,
  removeStorage,
} from "@/presentation/utilities";
import { AxiosInstance } from "axios";
import daysjs from "dayjs";
import { JwtPayload, jwtDecode } from "jwt-decode";

let token = getStorage<string>("token") ? getStorage<string>("token") : null;

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
      removeStorage("token");
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
