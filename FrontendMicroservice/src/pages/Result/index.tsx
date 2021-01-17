import * as React from 'react'
import moment from 'moment'

import AnswerReview from 'pages/Result/components/AnswerReview'

import { TestResult } from 'services/questions/types'

import './index.scss'

export interface IResultProps {
  result: TestResult
}

export default function Result(props: IResultProps) {
  const content = props.result.answers.map(
    question => (
      <AnswerReview
        key={question.id}
        data={question}
      />
    )
  )
  const start = moment(props.result.testStart)
  const end = moment(props.result.testFinish)

  return (
    <div className='Result'>
      <h1>{moment(props.result.testStart).format('lll')}</h1>
      <h1>Duration: {Math.round(moment.duration(end.diff(start)).asSeconds())} seconds</h1>
      <h2>Score: {props.result.correctAnswersCount}/{props.result.correctAnswersCount} </h2>
      {content}
    </div>
  )
}
