import * as React from 'react'

import Answer from 'pages/TestPage/components/Answer'

import { Question } from 'services/questions/types'

import { shuffleArray } from 'utils'

// import './index.scss'

export interface IQuestionProps {
  data: Question
  onAnswerClick: (answer: string, questionId: number) => void
}

export default function QuestionComponent(props: IQuestionProps) {
  const { answer1, answer2, answer3, answer4, id } = props.data
  const { onAnswerClick } = props

  const answers = [
    <Answer text={props.data.answer1} onClick={() => onAnswerClick(answer1, id)} />,
    <Answer text={props.data.answer2} onClick={() => onAnswerClick(answer2, id)} />,
    <Answer text={props.data.answer3} onClick={() => onAnswerClick(answer3, id)} />,
    <Answer text={props.data.answer4} onClick={() => onAnswerClick(answer4, id)} />,
  ]

  return (
    <div className='Question'>
      <p>{props.data.text}</p>
      {shuffleArray(answers)}
    </div>
  )
}
