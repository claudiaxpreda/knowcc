const jwt = require('jsonwebtoken')

const options = {
  issuer: process.env.JWT_ISSUER || 'knowcc'
}

const generateToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'aaa', options)

    return token
  } catch (err) {
    console.trace(err)
  }
}

const verifyAndDecodeData = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'aaa', options)

    return decoded
  } catch (err) {
    console.trace(err)
  }
}

module.exports = {
  generateToken,
  verifyAndDecodeData
}
