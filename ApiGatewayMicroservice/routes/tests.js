const Router = require('express').Router()

const { sendRequest } = require('../http-client')

const QUIZZES_SERVICE_HOST = process.env.QUIZZES_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { id } = req.query

  console.info(`Forwarding request for getting test by id ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/tests/`,
    params: {
      id
    },
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.post('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  console.info(`Forwarding request for creating new test ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/tests/`,
    method: 'POST',
    data: {},
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.post('/answers', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { testId, questionId, answer } = req.body

  console.info(`Forwarding request for adding a new answer ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/tests/answers`,
    method: 'POST',
    data: {
      testId,
      questionId,
      answer
    },
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

module.exports = Router