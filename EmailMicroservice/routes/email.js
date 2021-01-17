const Router = require('express').Router()

const { sendNotificationEmail } = require('../utils')

Router.post('/', async (req, res) => {
  const { username, email } = req.body
  try {
    await sendNotificationEmail(email, username)

    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ success: false })
  }
})

module.exports = Router