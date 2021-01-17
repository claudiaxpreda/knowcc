import * as React from 'react'

import AnswerComponent from 'pages/TestPage/components/Answer'

import { Answer } from 'services/questions/types'

import './index.scss'

export interface IAnswerReviewProps {
  data: Answer
}

export default function AnswerReviewComponent(props: IAnswerReviewProps) {
  return (
    <div className='AnswerReview'>
      <div className='Question'>
        <p>{props.data.text}</p>
      </div>
      <AnswerComponent text={props.data.correctAnswer} isCorrect />
      {props.data.answer1 !== props.data.correctAnswer &&
        <AnswerComponent text={props.data.answer1} isWrong={props.data.answer1 === props.data.answer} />
      }
      {props.data.answer2 !== props.data.correctAnswer &&
        <AnswerComponent text={props.data.answer2} isWrong={props.data.answer2 === props.data.answer} />
      }
      {props.data.answer3 !== props.data.correctAnswer &&
        <AnswerComponent text={props.data.answer3} isWrong={props.data.answer3 === props.data.answer} />
      }
      {props.data.answer4 !== props.data.correctAnswer &&
        <AnswerComponent text={props.data.answer4} isWrong={props.data.answer4 === props.data.answer} />
      }
      <h3>{Math.round(1000 * parseInt(props.data.correctAnswersCount) / parseInt(props.data.answersCount)) / 10}% of users answered correctly</h3>
    </div>
  )
}
