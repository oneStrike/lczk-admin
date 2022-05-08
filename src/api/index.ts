import KRequest from '@/api/request/request'
import K_ENV from '@/config/config'
import { userStore } from '@/store/module/user'
import { ElMessage } from 'element-plus'
import type { IResponseData } from '@/api/request/types'
const token = userStore().token

const kRequest = new KRequest<IResponseData>({
  baseURL: K_ENV.BASE_URL,
  timeout: K_ENV.TIMEOUT,
  interceptor: {
    requestInterceptor: (config) => {
      config.headers = { token }
      return config
    },
    responseInterceptor: (res) => {
      if (!res.data.code) {
        ElMessage({
          message: '加载失败！',
          type: 'error'
        })
      }
      return res
    }
  }
})

export default kRequest
