const Router = require('express').Router()

const { sendRequest } = require('../http-client')
const { verifyAndDecodeToken, answersArrayToTestObject } = require('../utils')

const IO_SERVICE_HOST = process.env.IO_SERVICE_HOST || 'localhost'
const EMAIL_SERVICE_HOST = process.env.EMAIL_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  console.info('Forwarding request for getting all challenges ...')

  const token = req.headers.authorization.split(' ')[1]
  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/challenges/`,
    params: {
      userId: decoded.data.id
    }
  }

  const response = await sendRequest(options)

  res.json(
    response.map(challenge => ({
      ...challenge,
      originalTest: answersArrayToTestObject(challenge.originalTest),
      opponentTest: answersArrayToTestObject(challenge.opponentTest)
    }))
  )
})

Router.post('/', async (req, res) => {
  const { originalTestId, challengedUserId, opponentUsername, opponentEmail } = req.body

  console.info('Forwarding request for creating new challenge ...')

  const token = req.headers.authorization.split(' ')[1]

  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/challenges/`,
    method: 'POST',
    data: {
      userId: decoded.data.id,
      originalTestId,
      challengedUserId
    }
  }

  const response = await sendRequest(options)

  const emailOptions = {
    url: `http://${EMAIL_SERVICE_HOST}:3005/api/email/`,
    method: 'POST',
    data: {
      username: opponentUsername,
      email: opponentEmail
    }
  }

  await sendRequest(emailOptions)

  res.json(response)
})

Router.post('/', async (req, res) => {
  const { originalTestId, challengedUserId } = req.body

  console.info('Forwarding request for creating new challenge ...')

  const token = req.headers.authorization.split(' ')[1]

  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/challenges/`,
    method: 'POST',
    data: {
      userId: decoded.data.id,
      originalTestId,
      challengedUserId
    }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.patch('/', async (req, res) => {
  const { testId, challengeId } = req.body

  console.info('Forwarding request for creating new challenge ...')

  const token = req.headers.authorization.split(' ')[1]

  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/challenges/`,
    method: 'PATCH',
    data: {
      userId: decoded.data.id,
      testId,
      challengeId
    }
  }

  const response = await sendRequest(options)

  res.json(response)
})

module.exports = Router