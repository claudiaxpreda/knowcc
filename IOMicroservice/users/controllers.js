const Router = require('express').Router()

const { getUsersByKeyword } = require('./services.js')

Router.get('/', async (req, res) => {
  const { keyword } = req.query

  try {
    const users = await getUsersByKeyword(keyword)

    res.json({ users })
  } catch (e) {
    res.status(500).json({ success: false })
  }

})

module.exports = Router