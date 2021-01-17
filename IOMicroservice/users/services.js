const { query } = require('../data')

const getUsersByKeyword = async (keyword) => {
  console.info('Getting all distinct categories ...')

  const users = await query(`SELECT id, username, email FROM users WHERE username LIKE '%${keyword}%'`)

  return users
}

const getUserById = async (id) => {
  const users = await query(`SELECT id, username, email FROM users WHERE id = ${id}`)

  return users
}

module.exports = {
  getUsersByKeyword,
  getUserById
}