const Router = require('express').Router()

const { sendRequest } = require('../http-client')
const { verifyAndDecodeToken } = require('../utils')

const IO_SERVICE_HOST = process.env.IO_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  const { keyword, id } = req.query

  try {
    const token = req.headers.authorization.split(' ')[1]
    await verifyAndDecodeToken(token)

    const options = {
      url: `http://${IO_SERVICE_HOST}:3003/api/users/`,
      params: {
        keyword,
        id
      }
    }

    const response = await sendRequest(options)

    res.json(response)
  } catch (e) {
    console.log(e)
    res.status(500).json({ success: false })
  }
})

module.exports = Router