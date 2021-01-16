const Router = require('express').Router()

const { sendRequest } = require('../http-client')
const { verifyAndDecodeToken } = require('../utils')

const IO_SERVICE_HOST = process.env.IO_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  const { count, categories } = req.query

  console.info(`Forwarding request for getting a questions set ...`)

  const token = req.headers.authorization.split(' ')[1]
  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/questions/`,
    params: {
      userId: decoded.data.id,
      count,
      categories
    }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.get('/categories', async (req, res) => {
  console.info(`Forwarding request for getting all categories ...`)

  const token = req.headers.authorization.split(' ')[1]
  await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/questions/categories`
  }

  const response = await sendRequest(options)

  res.json(response)
})

module.exports = Router