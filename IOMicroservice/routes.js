const Router = require('express').Router()

const QuestionsController = require('./questions/controllers.js')
const TestsController = require('./tests/controllers.js')
const UsersController = require('./users/controllers.js')
const ChallengesController = require('./routes/challenges/controllers.js')

Router.use('/questions', QuestionsController)
Router.use('/tests', TestsController)
Router.use('/users', UsersController)
Router.use('/challenges', ChallengesController)

module.exports = Router
