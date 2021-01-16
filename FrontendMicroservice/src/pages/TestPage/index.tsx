import * as React from 'react'

import Question from 'pages/TestPage/components/Question'

import { addAnswer } from 'services/questions'
import { QuestionsSet } from 'services/questions/types'

// import './index.scss'

export interface ITestPageProps {
  questionsSet: QuestionsSet
  onTestFinish: () => void
}

export default function TestPage(props: ITestPageProps) {
  const [questionsCount, setQuestionsCount] = React.useState(0)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    setQuestionsCount(props.questionsSet.questions.length)
    setCurrent(1)
  }, [props.questionsSet])

  const onAnswerClick = (answer: string, questionId: number) => {
    addAnswer(props.questionsSet.test_id, answer, questionId)

    if (current === questionsCount) {
      props.onTestFinish()
    }

    setCurrent(current + 1)
  }

  const content = props.questionsSet.questions.map(
    question => (
      <Question
        key={question.id}
        data={question}
        onAnswerClick={onAnswerClick}
      />
    )
  )

  return (
    <div className='TestPage'>
      <p>{current} / {questionsCount}</p>
      {content}
    </div>
  )
}
