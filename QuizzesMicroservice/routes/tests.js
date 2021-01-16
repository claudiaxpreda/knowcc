const Router = require('express').Router()

const { sendRequest } = require('../http-client')
const { verifyAndDecodeToken } = require('../utils')

const IO_SERVICE_HOST = process.env.IO_SERVICE_HOST || 'localhost'

Router.get('/', async (req, res) => {
  const { id } = req.query

  console.log('Forwarding request for getting test by id ...')

  const token = req.headers.authorization.split(' ')[1]

  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/tests`,
    params: {
      userId: decoded.data.id,
      testId: id
    }
  }

  const answers = await sendRequest(options)


  if (answers.length > 0 && id) {
    const testStartTimestamp = answers[0].testCreatedAt
    const dates = answers.map(item => item.answerCreatedAt)
    const lastResponseTimestamp = dates.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b))

    const formattedAnswers = answers.map(item => {
      const formattedItem = { ...item }

      delete formattedItem.answerCreatedAt
      delete formattedItem.testCreatedAt

      return formattedItem
    })

    const correctAnswersCount = formattedAnswers.reduce((acc, item) => item.answer === item.correct_answer ? acc + 1 : acc, 0)

    res.json({
      testStart: testStartTimestamp,
      testFinish: lastResponseTimestamp,
      questionsCount: answers.length,
      correctAnswersCount,
      answers: answers,
    })
  } else {
    res.json({
      tests: answers.map(item => {
        if (item.answers.length > 0) {
          const testStartTimestamp = item.answers[0].testCreatedAt
          const dates = item.answers.map(item => item.answerCreatedAt)
          const lastResponseTimestamp = dates.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b))

          const formattedAnswers = item.answers.map(item => {
            const formattedItem = { ...item }

            delete formattedItem.answerCreatedAt
            delete formattedItem.testCreatedAt

            return formattedItem
          })

          const correctAnswersCount = formattedAnswers.reduce((acc, item) => item.answer === item.correct_answer ? acc + 1 : acc, 0)

          return { testStart: testStartTimestamp, testFinish: lastResponseTimestamp, questionsCount: item.answers.length, correctAnswersCount, ...item }
        }
        return { testId: item.testId }
      })
    })
  }
})

Router.post('/', async (req, res) => {
  console.log('Creating a new test ...')

  const token = req.headers.authorization.split(' ')[1]
  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/tests`,
    method: 'POST',
    data: {
      userId: decoded.data.id
    }
  }

  const response = await sendRequest(options)

  res.json(response)
})

Router.post('/answers', async (req, res) => {
  const { testId, questionId, answer } = req.body

  console.log('Adding new answer ...')

  const token = req.headers.authorization.split(' ')[1]
  const decoded = await verifyAndDecodeToken(token)

  const options = {
    url: `http://${IO_SERVICE_HOST}:3003/api/tests/answers`,
    method: 'POST',
    data: {
      userId: decoded.data.id,
      testId,
      questionId,
      answer
    }
  }

  await sendRequest(options)

  res.json({ success: true })
})


module.exports = Router
