const { sendRequest } = require('../http-client')

const verifyAndDecodeToken = async (token) => {
  const postVerifyRequest = {
    url: `http://localhost:3001/api/verify`,
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