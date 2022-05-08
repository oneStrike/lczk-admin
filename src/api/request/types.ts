import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IResponseData {
  code: number
  data?: object | unknown[] | string | number
  status: number
  message: string
}

export interface IRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptor?: {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: unknown) => unknown
    responseInterceptor?: (responseRes: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (error: unknown) => unknown
  }
}
