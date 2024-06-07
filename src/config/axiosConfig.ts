import axios, { AxiosResponse } from "axios";
import { NEXT_APP_API_URL } from "@/config";
import Cookies from "js-cookie";
import { ADEPTLINK_ACCESS_TOKEN } from "@/constant/cookies";

const axiosConfig = axios.create({
  // baseURL: `https://c72a-2405-4802-8031-7f90-9b82-51ed-fd13-3b74.ngrok-free.app/api/v1/`,
  baseURL: `${process.env.NEXT_APP_API_URL}/api/v1/`,

  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    // Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    if (config.headers) {
      if (
        !config.headers.Authorization &&
        Cookies.get(ADEPTLINK_ACCESS_TOKEN)
      ) {
        const accessToken = JSON.parse(
          Cookies.get(ADEPTLINK_ACCESS_TOKEN) as string
        );
        config.headers.Authorization = `Bearer ${accessToken}`;

        // const token = store.getState().auth.currentUser?.tokenData.token;
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
