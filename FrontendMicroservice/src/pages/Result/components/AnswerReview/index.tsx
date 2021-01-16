import * as React from 'react'

import { Answer } from 'services/questions/types'

// import './index.scss'

export interface IAnswerReviewProps {
  data: Answer
}

export default function AnswerReviewComponent(props: IAnswerReviewProps) {
  return (
    <div className='AnswerReview'>
      <div>Question: {props.data.text}</div>
      <div>Correct Answer: {props.data.correct_answer}</div>
      <div>Actual Answer: {props.data.answer}</div>
    </div>
  )
}
