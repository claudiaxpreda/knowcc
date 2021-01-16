const Router = require('express').Router()

const { sendRequest } = require('../http-client')

const QUIZZES_SERVICE_HOST = process.env.QUIZZES_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  console.info(`Forwarding request for creating getting user challenges ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/challenges/`,
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.post('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  const { originalTestId, challengedUserId } = req.body

  console.info(`Forwarding request for creating new challenge ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/challenges/`,
    method: 'POST',
    data: {
      originalTestId,
      challengedUserId
    },
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.patch('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { testId, challengeId } = req.body

  console.info(`Forwarding request for updating a challenge ...`)

  const options = {
    url: `http://${QUIZZES_SERVICE_HOST}:3004/api/challenges/`,
    method: 'PATCH',
    data: {
      testId,
      challengeId
    },
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await sendRequest(options)

  res.json(response)
})

module.exports = Router
