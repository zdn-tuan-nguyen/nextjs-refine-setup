import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  timeout: 10000,
});

declare module "axios" {
  interface AxiosRequestConfig {
    skipAuth?: boolean;
    isFormData?: boolean;
    customHeaders?: Record<string, string>;
  }
}

interface RequestOptions extends AxiosRequestConfig {
  skipAuth?: boolean;
  isFormData?: boolean;
  customHeaders?: Record<string, string>;
}

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const requestConfig = config as RequestOptions;

    if (requestConfig.isFormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    if (requestConfig.customHeaders) {
      Object.assign(config.headers, requestConfig.customHeaders);
    }

    if (!requestConfig.skipAuth) {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    // const customError = {
    //   ...error,
    //   message: error.response?.data?.message || error.message,
    // };

    return Promise.reject(error);
  }
);

export const api = {
  get: (url: string, config?: RequestOptions) => axiosInstance.get(url, config),

  post: (url: string, data?: any, config?: RequestOptions) => {
    if (data instanceof FormData) {
      config = {
        ...config,
        headers: { ...config?.headers, "Content-Type": "multipart/form-data" },
      };
    }
    return axiosInstance.post(url, data, config);
  },

  put: (url: string, data?: any, config?: RequestOptions) =>
    axiosInstance.put(url, data, config),

  delete: (url: string, config?: RequestOptions) =>
    axiosInstance.delete(url, config),

  uploadFile: (url: string, formData: FormData, config?: RequestOptions) =>
    axiosInstance.post(url, formData, config),

  downloadFile: (url: string, config?: RequestOptions) =>
    axiosInstance.get(url, {
      ...config,
      responseType: "blob",
    }),

  public: {
    get: (url: string, config?: RequestOptions) =>
      axiosInstance.get(url, { ...config, skipAuth: true }),

    post: (url: string, data?: any, config?: RequestOptions) =>
      axiosInstance.post(url, data, { ...config, skipAuth: true }),
  },
};

export default axiosInstance;
