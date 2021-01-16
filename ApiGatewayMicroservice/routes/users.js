const Router = require('express').Router()

const { sendRequest } = require('../http-client')

const QUIZZES_SERVICE_HOST = process.env.QUIZZES_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { keyword } = req.query

  console.info(`Forwarding request for getting list of users containing '${keyword}' keyword ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/users/`,
    params: {
      keyword
    },
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

module.exports = Router