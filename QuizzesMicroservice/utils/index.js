const { sendRequest } = require('../http-client')

const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || 'localhost'

const verifyAndDecodeToken = async (token) => {
  const postVerifyRequest = {
    url: `http://${AUTH_SERVICE_HOST}:3001/api/verify`,
    method: 'POST',
    data: {
      token
    }
  }

  const decoded = await sendRequest(postVerifyRequest)

  return decoded
}

const answersArrayToTestObject = (answers) => {
  if (answers && answers.length > 0) {
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

    return {
      testStart: testStartTimestamp,
      testFinish: lastResponseTimestamp,
      questionsCount: answers.length,
      correctAnswersCount,
      answers
    }
  }

  return {}
}

module.exports = {
  verifyAndDecodeToken,
  answersArrayToTestObject
}
