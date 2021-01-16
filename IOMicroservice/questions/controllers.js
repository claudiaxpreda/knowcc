const Router = require('express').Router()

const { getCategories, getQuestions, createTest } = require('./services.js')

Router.get('/', async (req, res) => {
  const { userId, count, categories } = req.query

  const questions = await getQuestions(count, categories)
  const testId = await createTest(userId)

  res.json({ questions, test_id: testId })
})

Router.get('/categories', async (req, res) => {
  const categories = await getCategories()

  res.json({ categories })
})

module.exports = Router