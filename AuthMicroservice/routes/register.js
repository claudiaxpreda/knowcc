const Router = require('express').Router()
const bcryptjs = require('bcryptjs')

const { query } = require('../data')

Router.post('/', async (req, res) => {
  const { username, password, email } = req.body

  const salt = await bcryptjs.genSalt(5)
  const hashPassword = await bcryptjs.hash(password, salt)

  try {
    await query(
      `INSERT INTO users (username, password, email) VALUES ('${username}', '${hashPassword}', '${email}')`
    )

    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ success: false, error: e })
  }
})

module.exports = Router