const Router = require('express').Router()

const TestsRoute = require('./tests.js')
const QuestionsRoute = require('./questions.js')
const UsersRoute = require('./users.js')
const ChallengesRoute = require('./challenges.js')

Router.use('/tests', TestsRoute)
Router.use('/questions', QuestionsRoute)
Router.use('/users', UsersRoute)
Router.use('/challenges', ChallengesRoute)

module.exports = Router
