const { sendRequest } = require('../http-client')

const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || 'localhost'

const verifyAndDecodeToken = async (token) => {
  const postVerifyRequest = {
    url: `http://${AUTH_SERVICE_HOST}:3001/api/verify`,
    method: 'POST',
    data: {
      token
    }
  }

  const decoded = await sendRequest(postVerifyRequest)

  return decoded
}

module.exports = {
  verifyAndDecodeToken
}
