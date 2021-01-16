const Router = require('express').Router()

const { createTest, addAnswer, getTestById, getTestByUserId } = require('./services.js')

Router.get('/', async (req, res) => {
  const { userId, testId } = req.query

  if (!testId) {
    const tests = await getTestByUserId(userId)

    res.json(tests)
  } else {
    const tests = await getTestById(userId, testId)

    res.json(tests)
  }
})

Router.post('/', async (req, res) => {
  const { userId } = req.body

  const testId = await createTest(userId)

  res.json(testId)
})

Router.post('/answers', async (req, res) => {
  const { testId, questionId, answer } = req.body

  await addAnswer(testId, questionId, answer)

  res.json({ success: true })
})

module.exports = Router
