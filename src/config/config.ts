const dev = {
  BASE_URL: '/foo',
  TIMEOUT: 5000
}

const prod = {
  BASE_URL: '/foo',
  TIMEOUT: 5000
}
const K_ENV = import.meta.env.PROD ? prod : dev
export default K_ENV
