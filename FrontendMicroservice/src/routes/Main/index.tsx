/* ---------------------------- 🌍 Global imports --------------------------- */
import * as React from 'react'

/* ------------------------------ 📦 Components ----------------------------- */
import Customizer from 'pages/Customizer'
import TestPage from 'pages/TestPage'
import Result from 'pages/Result'
import Challenges from 'pages/Challenges'
import History from 'pages/History'

// import Header from 'components/Header'
import Footer from 'components/Footer'

/* ---------------------- 📡 Request methods and types ---------------------- */
import { getCategories, getQuestions, getTestResultById, getHistory } from 'services/questions'
import { QuestionsSet, dummyQuestionsSet, TestResult, dummyTestResult } from 'services/questions/types'
import { getUsersByKeyword } from 'services/users'
import { User } from 'services/users/types'
import { getChallenges } from 'services/challenges'

import './index.scss'

export type Page = 'customizer' | 'test' | 'result' | 'history' | 'challenges'

export default function Main() {
  const [page, setPage] = React.useState<Page>('history')
  const [categories, setCategories] = React.useState<string[]>([])
  const [questions, setQuestions] = React.useState<QuestionsSet>(dummyQuestionsSet)
  const [result, setResult] = React.useState<TestResult>(dummyTestResult)
  const [history, setHistory] = React.useState<TestResult[]>([])
  const [users, setUsers] = React.useState<User[]>([])
  const [challenges, setChallenges] = React.useState<any>([])

  React.useEffect(() => {
    const getData = async () => {
      const categories = await getCategories()
      setCategories(categories)

      const history = await getHistory()
      setHistory(history)

      const challenges = await getChallenges()
      setChallenges(challenges)
    }

    getData()
  }, [])

  const onTestStart = async (count: string, categories: string[]) => {
    const requestParams = `?count=${count}&categories=${categories.toString()}`
    const questions = await getQuestions(requestParams)

    setQuestions(questions)
    setPage('test')
  }

  const onTestClick = (test: TestResult) => {
    setResult(test)
    setPage('result')
  }

  const onTestFinish = async () => {
    const result = await getTestResultById(questions.test_id)
    setResult(result)
    setPage('result')

    const history = await getHistory()
    setHistory(history)
  }

  const onKeywordChange = async (keyword: string) => {
    if (keyword === '') {
      setUsers([])
    } else {
      const users = await getUsersByKeyword(keyword)

      setUsers(users)
    }
  }

  const onFooterPageChange = (page: Page) => {
    setPage(page)
  }

  const getContent = () => {
    switch (page) {
      case 'customizer':
        return (
          <Customizer
            categories={categories}
            users={users}
            onTestStart={onTestStart}
            onKeywordChange={onKeywordChange}
          />
        )
      case 'test':
        return <TestPage questionsSet={questions} onTestFinish={onTestFinish} />
      case 'result':
        return <Result result={result} />
      case 'history':
        return <History data={history} onTestClick={onTestClick} />
      case 'challenges':
        return <Challenges challenges={challenges} />
      default:
        return null
    }
  }

  // const dummyResult: TestResult = { "testStart": "2021-01-16T21:15:11.505Z", "testFinish": "2021-01-16T21:15:21.262Z", "questionsCount": 7, "correctAnswersCount": 0, "answers": [{ "id": 80, "answerCreatedAt": "2021-01-16T21:15:14.456Z", "testCreatedAt": "2021-01-16T21:15:11.505Z", "answer": "Texas", "text": "What is the most recent state to be added to the USA?", "correctAnswer": "Hawaii", "answer1": "Alaska", "answer2": "Hawaii", "answer3": "Texas", "answer4": "Delaware", "category": "Geography", "answersCount": "2", "correctAnswersCount": "0" }, { "id": 81, "answerCreatedAt": "2021-01-16T21:15:16.332Z", "testCreatedAt": "2021-01-16T21:15:11.505Z", "answer": "Japan", "text": "Which country will host the 2022 FIFA World Cup?", "correctAnswer": "Qatar", "answer1": "USA", "answer2": "Japan", "answer3": "Switzerland", "answer4": "Qatar", "category": "Sports", "answersCount": "7", "correctAnswersCount": "0" }, { "id": 82, "answerCreatedAt": "2021-01-16T21:15:17.320Z", "testCreatedAt": "2021-01-16T21:15:11.505Z", "answer": "Syria", "text": "What country is Beirut the capital of?", "correctAnswer": "Lebanon", "answer1": "Sudan", "answer2": "Lebanon", "answer3": "Syria", "answer4": "Iran", "category": "Geography", "answersCount": "6", "correctAnswersCount": "1" }, { "id": 83, "answerCreatedAt": "2021-01-16T21:15:18.069Z", "testCreatedAt": "2021-01-16T21:15:11.505Z", "answer": "Barcelona", "text": "In which city would you find La Sagrada Familia?", "correctAnswer": "Barcelona", "answer1": "Barcelona", "answer2": "Rome", "answer3": "Lisbon", "answer4": "Lima", "category": "Geography", "answersCount": "9", "correctAnswersCount": "3" }, { "id": 84, "answerCreatedAt": "2021-01-16T21:15:18.891Z", "testCreatedAt": "2021-01-16T21:15:11.505Z", "answer": "Tokyo", "text": "Which country will host the 2024 Summer Olympics?", "correctAnswer": "Paris", "answer1": "Tokyo", "answer2": "Los Angeles", "answer3": "Paris", "answer4": "Madrid", "category": "Sports", "answersCount": "7", "correctAnswersCount": "5" }, { "id": 85, "answerCreatedAt": "2021-01-16T21:15:20.079Z", "testCreatedAt": "2021-01-16T21:15:11.505Z", "answer": "Czech Republic", "text": "In what country would you find Lake Bled?", "correctAnswer": "Slovenia", "answer1": "Czech Republic", "answer2": "Slovenia", "answer3": "Austria", "answer4": "Hungary", "category": "Geography", "answersCount": "2", "correctAnswersCount": "1" }, { "id": 86, "answerCreatedAt": "2021-01-16T21:15:21.262Z", "testCreatedAt": "2021-01-16T21:15:11.505Z", "answer": "It is not permitted to overtake a car", "text": "What does it mean a blue flag at the racecircuit?", "correctAnswer": "You have to let a faster car pass", "answer1": "There is danger on the track", "answer2": "You have to let a faster car pass", "answer3": "It is not permitted to overtake a car", "answer4": "There is a very slow car on the track", "category": "Sports", "answersCount": "12", "correctAnswersCount": "4" }] }

  return (
    <div className='Main'>
      {/* <Header /> */}

      <div className='Content'>
        {getContent()}
      </div>
      {/* <button onClick={() => setPage('customizer')}>Home</button>
      <button onClick={() => setPage('history')}>History</button>
      <button onClick={() => setPage('challenges')}>Challenges</button> */}

      <Footer currentPage={page} onPageChange={onFooterPageChange} />
    </div>
  )
}
