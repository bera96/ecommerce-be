import axios from "axios";
import { axiosConfig } from "../config/axios.config";
import { requestInterceptor, requestErrorInterceptor } from "../interceptors/request.interceptor";
import {
  responseInterceptor,
  responseErrorInterceptor,
} from "../interceptors/response.interceptor";

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    ...axiosConfig,
  });

  instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

  instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

  return instance;
};

// API instances
export const authApi = createAxiosInstance("http://localhost:3000/api/auth/login");
export const productsApi = createAxiosInstance(import.meta.env.VITE_PRODUCTS_API_URL);
