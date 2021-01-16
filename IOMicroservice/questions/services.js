const { query } = require('../data')
const { shuffleArray } = require('../utils')

const getCategories = async () => {
  console.info('Getting all distinct categories ...')

  const categories = await query('SELECT DISTINCT category FROM questions')

  return categories.map(item => item.category)
}

const getQuestions = async (count, categories) => {
  console.info('Getting questions based on count and categories ...')

  categoriesString = categories.split(',').map(item => `'${item}'`).join(', ')

  const questions = await query(`SELECT * FROM questions WHERE category IN (${categoriesString})`)

  return shuffleArray(questions).slice(0, count)
}

const createTest = async (userId) => {
  console.info('Creating a new test entry ...')

  const newTest = await query(`INSERT INTO tests(user_id) VALUES (${userId}) returning id`)

  return newTest[0].id
}

module.exports = {
  getCategories,
  getQuestions,
  createTest
}