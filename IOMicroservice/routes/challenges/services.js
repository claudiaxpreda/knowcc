const { query } = require('../../data')

const { getTestById } = require('../../tests/services')

const createChallenge = async (originalTestId, challengedUserId) => {
  console.log('Adding new challenge to database ...')

  try {
    await query(`INSERT INTO challenges(original_test_id, opponent_user_id) VALUES(${originalTestId}, ${challengedUserId})`)

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

const getChallengesByUserId = async (userId) => {
  console.log('Getting one users challenges ...')

  try {
    const challenges = await query(`SELECT c.id, c.created_at, t.user_id as original_user_id, c.opponent_user_id, c.original_test_id, c.accepted_test_id FROM challenges c JOIN tests t ON c.original_test_id = t.id WHERE t.user_id = ${userId} OR c.opponent_user_id = ${userId} ORDER BY c.created_at DESC`)
    const challengesWithTests = await Promise.all(challenges.map(async item => {
      let test = {}
      const originalTest = await getTestById(item.original_user_id, item.original_test_id)
      const opponentTest = item.accepted_test_id ? await getTestById(item.opponent_user_id, item.accepted_test_id) : null

      return {
        id: item.id,
        createdAt: item.created_at,
        originalUserId: item.original_user_id,
        opponentUserId: item.opponent_user_id,
        originalTestId: item.original_test_id,
        opponentTestId: item.accepted_test_id,
        originalTest,
        opponentTest
      }
    }))

    return challengesWithTests
  } catch (e) {
    console.log(e)
    return false
  }
}

const updateChallenge = async (userId, testId, challengeId) => {
  try {
    await query(`UPDATE challenges SET accepted_test_id = ${testId} WHERE opponent_user_id = ${userId} and id = ${challengeId}`)

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  createChallenge,
  getChallengesByUserId,
  updateChallenge
}