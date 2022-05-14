import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IResponseData {
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  status: number
  msg: string
}

export type errorConfig = {
  code: string
  msg: string
  config: Omit<errorConfig, 'config'>[]
}

export interface IRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptError?: errorConfig
  interceptor?: {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: unknown) => unknown
    responseInterceptor?: (responseRes: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (error: unknown) => unknown
  }
}
