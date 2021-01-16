const Router = require('express').Router()
const bcryptjs = require('bcryptjs')

const { query } = require('../data')
const { generateToken, verifyAndDecodeData } = require('../utils')

Router.get('/', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  let data

  try {
    data = await verifyAndDecodeData(token)

    if (!data) {
      res.status(403).json({ success: false, error: 'Invalid token' })
    }
  } catch (e) {
    console.trace(e)
    res.status(403).json({ success: false, error: 'Invalid token' })
  }

  try {
    const users = await query(
      `SELECT * FROM users WHERE username = '${data.username}'`
    )

    if (users.length === 1) {
      res.json({ success: true })
    } else {
      res.status(403).json({ success: false, error: 'Invalid token' })
    }

  } catch (e) {
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
})

Router.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await query(
      `SELECT * FROM users WHERE username = '${username}'`
    )

    if (user.length === 0) {
      res.status(404).json({ success: false })
    } else {
      const isOk = await bcryptjs.compare(password, user[0].password)

      if (!isOk) {
        res.status(404).json({ success: false })
      } else {
        const token = await generateToken({
          id: user[0].id,
          username: user[0].username
        })

        res.json({ success: true, token })
      }

    }

  } catch (e) {
    res.status(500).json({ success: false })
  }
})

module.exports = Router