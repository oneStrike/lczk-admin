import type { AxiosInstance } from 'axios'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { ElLoading } from 'element-plus'
import type { IRequestConfig } from '@/api/request/types'

const DEFAULT_SHOW_LOADING = true

class KRequest<T> {
  instance: AxiosInstance
  interceptor?: IRequestConfig['interceptor']
  showLoading?: IRequestConfig['showLoading']
  loading?: LoadingInstance

  constructor(config: IRequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptor
    this.showLoading = config.showLoading ?? DEFAULT_SHOW_LOADING

    this.instance.interceptors.request.use((config) => {
      if (this.showLoading) {
        this.loading = ElLoading.service({
          text: 'Loading...',
          lock: true,
          background: 'rgba(0,0,0,0.5)'
        })
      }
      return config
    })
    this.instance.interceptors.response.use((res) => {
      this.loading?.close()
      return res
    })

    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    )
  }

  request(config: IRequestConfig): Promise<T> {
    if (config.interceptor?.requestInterceptor) {
      config = config.interceptor.requestInterceptor(config)
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res)
          }
          resolve(res.data as T)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get(config: IRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'get' })
  }

  post(config: IRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'post' })
  }
}

export default KRequest
