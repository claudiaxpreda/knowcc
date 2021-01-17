const Router = require('express').Router()

const { getUsersByKeyword, getUserById } = require('./services.js')

Router.get('/', async (req, res) => {
  const { keyword, id } = req.query

  try {
    if (keyword) {
      const users = await getUsersByKeyword(keyword)

      res.json({ users })
    } else {
      if (id) {
        const users = await getUserById(id)

        res.json({ users })
      }
    }

  } catch (e) {
    res.status(500).json({ success: false })
  }

})

module.exports = Router