const { query } = require('../data')

const createTest = async (userId) => {
  console.info('Creating a new test entry ...')

  const newTest = await query(`INSERT INTO tests(user_id) VALUES (${userId}) returning id`)

  return newTest[0].id
}

const getTestById = async (userId, testId) => {
  console.info('Getting test by id ...')

  const answers = await query(`SELECT a.id, a.created_at as answer_created_at, t.created_at as test_created_at, a.answer, q.text, q.correct_answer, q.answer1, q.answer2, q.answer3, q.answer4, q.category, q.answers_count, q.correct_answers_count FROM answers a JOIN tests t ON t.id = a.test_id JOIN questions q ON q.id = a.question_id  WHERE t.user_id = ${userId} and t.id = ${testId}`)

  return answers.map(item => ({
    id: item.id,
    answerCreatedAt: item.answer_created_at,
    testCreatedAt: item.test_created_at,
    answer: item.answer,
    text: item.text,
    correctAnswer: item.correct_answer,
    answer1: item.answer1,
    answer2: item.answer2,
    answer3: item.answer3,
    answer4: item.answer4,
    category: item.category,
    answersCount: item.answers_count,
    correctAnswersCount: item.correct_answers_count
  }))
}

const getTestByUserId = async (userId) => {
  console.info('Getting test by user id ...')

  const testIds = await query(`SELECT id from tests where user_id = ${userId}`)

  console.log(testIds)

  const tests = await Promise.all(testIds.map(async item => {
    const answers = await getTestById(userId, item.id)

    return { testId: item.id, answers }
  }))

  return tests
}

const addAnswer = async (testId, questionId, answer) => {
  console.info('Adding a new response ...')

  try {
    const question = await query(`SELECT * FROM questions WHERE id = ${questionId}`)

    const currentCount = parseInt(question[0].answers_count)
    const currentCorrectCount = parseInt(question[0].correct_answers_count)
    const isCorrect = question[0].correct_answer === answer ? 1 : 0

    await query(`UPDATE questions SET answers_count = ${currentCount + 1}, correct_answers_count = ${currentCorrectCount + isCorrect} WHERE id = ${questionId}`)
    await query(`INSERT INTO answers(test_id, question_id, answer) VALUES(${testId}, ${questionId}, '${answer}')`)

    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  createTest,
  addAnswer,
  getTestById,
  getTestByUserId
}