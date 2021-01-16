const Router = require('express').Router()

const { verifyAndDecodeData } = require('../utils')

Router.post('/', async (req, res) => {
  const { token } = req.body

  try {
    const data = await verifyAndDecodeData(token)

    res.json({ data })
  } catch (e) {
    res.status(500).json({ success: false, error: e })
  }
})

module.exports = Router