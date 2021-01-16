const Router = require('express').Router()

const { sendRequest } = require('../http-client')

const QUIZZES_SERVICE_HOST = process.env.QUIZZES_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { count, categories } = req.query

  console.info(`Forwarding request for get questions set ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/questions/`,
    params: {
      count,
      categories
    },
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.get('/categories', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  console.info(`Forwarding request for get categores ...`)

  const getCategoriesRequest = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/questions/categories`,
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(getCategoriesRequest)

  res.json(response)
})

module.exports = Router
