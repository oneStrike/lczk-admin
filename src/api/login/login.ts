import kRequest from '../index'
import type { ILogin } from './types'

const api = {
  login: '/admin/login'
}

export function loginAPI(params: ILogin) {
  return kRequest.post({
    url: api.login,
    params: params
  })
}
