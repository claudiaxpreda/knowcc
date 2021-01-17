import * as React from 'react'

import Question from 'pages/TestPage/components/Question'
import TestProgress from 'pages/TestPage/components/TestProgress'

import { addAnswer } from 'services/questions'
import { QuestionsSet } from 'services/questions/types'

import './index.scss'

export interface ITestPageProps {
  questionsSet: QuestionsSet
  onTestFinish: (testId: number) => void
}

export default function TestPage(props: ITestPageProps) {
  const [questionsCount, setQuestionsCount] = React.useState(0)
  const [current, setCurrent] = React.useState(1)

  React.useEffect(() => {
    setQuestionsCount(props.questionsSet.questions.length)
  }, [props.questionsSet])

  const onAnswerClick = (answer: string, questionId: number) => {
    addAnswer(props.questionsSet.test_id, answer, questionId)

    if (current === questionsCount) {
      props.onTestFinish(props.questionsSet.test_id)
      return
    }

    setCurrent(current + 1)
  }

  const getCurrentQuestion = () => {
    const { questions } = props.questionsSet

    if (questions.length === 0) {
      return null
    }

    const currentQuestion = questions[current - 1]

    return (
      <Question
        key={currentQuestion.id}
        data={currentQuestion}
        onAnswerClick={onAnswerClick}
      />
    )
  }

  return (
    <div className='TestPage'>
      <h1>Question {current} / {questionsCount}</h1>
      <TestProgress total={questionsCount} current={current} />
      {getCurrentQuestion()}
    </div>
  )
}
