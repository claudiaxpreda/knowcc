import * as React from 'react'

import AnswerReview from 'pages/Result/components/AnswerReview'

// import { addAnswer } from 'pages/Result/components/AnswerReview'
import { TestResult } from 'services/questions/types'

// import './index.scss'

export interface IResultProps {
  result: TestResult
}

export default function Result(props: IResultProps) {
  // React.useEffect(() => {
  //   setQuestionsCount(props.questionsSet.questions.length)
  //   setCurrent(1)
  // }, [props.questionsSet])

  // const onAnswerClick = (answer: string, questionId: number) => {
  //   addAnswer(props.questionsSet.test_id, answer, questionId)

  //   if (current === questionsCount) {
  //     props.onTestFinish()
  //   }

  //   setCurrent(current + 1)
  // }

  const content = props.result.answers.map(
    question => (
      <AnswerReview
        key={question.id}
        data={question}
      />
    )
  )

  return (
    <div className='Result'>
      {content}
    </div>
  )
}
