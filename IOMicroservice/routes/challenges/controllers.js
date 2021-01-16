const Router = require('express').Router()

const { createChallenge, getChallengesByUserId, updateChallenge } = require('./services.js')

Router.get('/', async (req, res) => {
  const { userId } = req.query

  const response = await getChallengesByUserId(userId)

  res.json(response)
})

Router.post('/', async (req, res) => {
  const { originalTestId, challengedUserId } = req.body

  console.info('Creating a new challenge ...')

  try {
    await createChallenge(originalTestId, challengedUserId)

    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ success: false })
  }
})

Router.patch('/', async (req, res) => {
  const { userId, testId, challengeId } = req.body

  console.info('Updating a challenge ...')

  try {
    await updateChallenge(userId, testId, challengeId)

    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ success: false })
  }
})

module.exports = Router
