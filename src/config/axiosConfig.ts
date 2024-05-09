import axios, { AxiosResponse } from 'axios';
import { NEXT_APP_API_URL } from '@/config';

const axiosConfig = axios.create({
  // baseURL: `https://c72a-2405-4802-8031-7f90-9b82-51ed-fd13-3b74.ngrok-free.app/api/v1/`,
  baseURL: `${process.env.NEXT_APP_API_URL}/api/v1/`,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Accept': 'application/json'
  // },
});

axiosConfig.interceptors.request.use(
  function (config) {
    if (config.headers) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTIzODI1MzMsInN1YiI6ImUyOWE3YWNiLTYxNmItNGVjOC1hMzVjLTNhYmNlOGM2ZGNmNCJ9.4UtGlsEzbmopdVePiUzs6eO74gWJDX6VVOO3-Z2OSL8'
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
  },
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosConfig;