import * as React from 'react'

import Customizer from 'pages/Customizer'
import TestPage from 'pages/TestPage'
import Result from 'pages/Result'

import { getCategories, getQuestions, getTestResultById } from 'services/questions'
import { QuestionsSet, dummyQuestionsSet, TestResult, dummyTestResult } from 'services/questions/types'
import { getUsersByKeyword } from 'services/users'
import { User } from 'services/users/types'

// import './index.scss'

export type Page = 'customizer' | 'test' | 'result' | 'history'

export default function Main() {
  const [page, setPage] = React.useState<Page>('customizer')
  const [categories, setCategories] = React.useState<string[]>([])
  const [questions, setQuestions] = React.useState<QuestionsSet>(dummyQuestionsSet)
  const [result, setResult] = React.useState<TestResult>(dummyTestResult)
  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    const getData = async () => {
      const categories = await getCategories()

      setCategories(categories)
    }

    getData()
  }, [])

  const onTestStart = async (count: string, categories: string[]) => {
    const requestParams = `?count=${count}&categories=${categories.toString()}`
    const questions = await getQuestions(requestParams)

    setQuestions(questions)
    setPage('test')
  }

  const onTestFinish = async () => {
    const result = await getTestResultById(questions.test_id)
    setResult(result)
    setPage('result')
  }

  const onKeywordChange = async (keyword: string) => {
    if (keyword === '') {
      setUsers([])
    } else {
      const users = await getUsersByKeyword(keyword)

      setUsers(users)
    }
  }

  const onLogout = () => {
    localStorage.removeItem('jwt_token')
    window.location.reload()
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
      default:
        return null
    }
  }

  return (
    <div className='Main'>
      {getContent()}
      <button onClick={() => setPage('customizer')}>Home</button>
      <button onClick={() => setPage('history')}>History</button>
      <button onClick={onLogout}>Log out</button>
    </div>
  )
}
