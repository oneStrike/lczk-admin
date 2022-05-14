import KRequest from '@/api/request/request'
import K_ENV from '@/config/config'
import type { IResponseData } from '@/api/request/types'

const interceptError = {
  code: 'code',
  msg: 'msg',
  config: [
    {
      code: '-1001',
      msg: '请求错误'
    }
  ]
}

const kRequest = new KRequest<IResponseData>({
  baseURL: K_ENV.BASE_URL,
  timeout: K_ENV.TIMEOUT,
  interceptError
})

export default kRequest
