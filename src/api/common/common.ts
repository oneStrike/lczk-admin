import kRequest from '../index'

const api = {
  captcha: '/admin/captcha'
}

//获取验证码
export function getCaptchaAPI() {
  return kRequest.get({
    url: api.captcha,
    showLoading: false
  })
}
