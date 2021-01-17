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
import { getCategories, getQuestions, getTestResultById, getHistory, createTest } from 'services/questions'
import { QuestionsSet, dummyQuestionsSet, TestResult, dummyTestResult } from 'services/questions/types'
import { getUsersByKeyword } from 'services/users'
import { User } from 'services/users/types'
import { getChallenges, createChallenge, updateChallenge } from 'services/challenges'

import './index.scss'

export type Page = 'customizer' | 'test' | 'result' | 'history' | 'challenges'

export default function Main() {
  const [page, setPage] = React.useState<Page>('customizer')
  const [categories, setCategories] = React.useState<string[]>([])
  const [questions, setQuestions] = React.useState<QuestionsSet>(dummyQuestionsSet)
  const [result, setResult] = React.useState<TestResult>(dummyTestResult)
  const [history, setHistory] = React.useState<TestResult[]>([])
  const [users, setUsers] = React.useState<User[]>([])
  const [challenges, setChallenges] = React.useState<any>([])
  const [chosenOpponent, setChosenOpponent] = React.useState<User | null>(null)

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

  const onTestFinish = async (testId: number) => {
    const result = await getTestResultById(questions.test_id)
    setResult(result)
    setPage('result')

    const history = await getHistory()
    setHistory(history)

    if (chosenOpponent) {
      await createChallenge(testId, chosenOpponent.id)
    }

    const challenges = await getChallenges()
    setChallenges(challenges)
  }

  const onKeywordChange = async (keyword: string) => {
    if (keyword === '') {
      setUsers([])
    } else {
      const users = await getUsersByKeyword(keyword)

      setUsers(users.filter((user: User) => user.username !== localStorage.getItem('knowcc_username')))
    }
  }

  const onChosenOpponentChange = (id: number) => {
    setChosenOpponent(users.find(user => user.id === id) || null)
  }

  const onChallengeAccept = async (challengeId: number, test: TestResult) => {
    const testId = await createTest()

    await updateChallenge(testId, challengeId)

    const questionsSet: QuestionsSet = {
      test_id: testId,
      questions: test.answers.map(answer => ({
        id: answer.questionId,
        answer1: answer.answer1,
        answer2: answer.answer2,
        answer3: answer.answer3,
        answer4: answer.answer4,
        text: answer.text,
        category: '',
        answers_count: parseInt(answer.answersCount),
        correct_answers_count: parseInt(answer.correctAnswersCount)
      }))
    }

    setQuestions(questionsSet)
    setPage('test')
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
            chosenOpponent={chosenOpponent}
            onTestStart={onTestStart}
            onKeywordChange={onKeywordChange}
            onChosenOpponentChange={onChosenOpponentChange}
          />
        )
      case 'test':
        return <TestPage questionsSet={questions} onTestFinish={onTestFinish} />
      case 'result':
        return <Result result={result} />
      case 'history':
        return <History data={history} onTestClick={onTestClick} />
      case 'challenges':
        return (
          <Challenges
            challenges={challenges}
            onResultClick={onTestClick}
            onChallengeAccept={onChallengeAccept} />
        )
      default:
        return null
    }
  }

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
