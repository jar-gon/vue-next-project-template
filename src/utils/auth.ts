import appConfig from '@/appConfig'
function login(): void {
  const domain = appConfig.AUTH_DOMAIN ? appConfig.AUTH_DOMAIN : ''
  window.location.href = `${domain}/#/login?redirectUrl=${encodeURIComponent(location.href)}`
}

function logout(): void {
  window.location.href = '/logout'
}

export default {
  login,
  logout,
}
