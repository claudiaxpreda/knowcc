const Router = require('express').Router()

const { sendRequest } = require('../http-client')

const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || 'localhost'

Router.post('/register', async (req, res) => {
  console.log('Sending data for a new registration ...')

  const postRegisterRequest = {
    url: `http://${AUTH_SERVICE_HOST}:3001/api/register`,
    method: 'POST',
    data: {
      ...req.body
    }
  }

  try {
    const data = await sendRequest(postRegisterRequest)

    res.json({ ...data })
  } catch (e) {
    res.json({ success: false })
  }
})

Router.get('/login', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  console.log('Checking user authentication status ...')

  const getLoginRequest = {
    url: `http://${AUTH_SERVICE_HOST}:3001/api/login`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }

  const data = await sendRequest(getLoginRequest)

  res.json({ ...data })
})

Router.post('/login', async (req, res) => {
  const postLoginRequest = {
    url: `http://${AUTH_SERVICE_HOST}:3001/api/login`,
    method: 'POST',
    data: {
      ...req.body
    }
  }

  try {
    const data = await sendRequest(postLoginRequest)

    res.cookie('token', data.token, { httpOnly: true })
    res.json({ ...data })
  } catch (e) {
    console.log(e.response.status)
    res.status(e.response.status).json({ success: false })
  }
})


module.exports = Router