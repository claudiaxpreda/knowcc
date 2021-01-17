import * as React from 'react'

import './index.scss'

export interface IAnswerProps {
  text: string
  onClick?: () => void
  isCorrect?: boolean
  isWrong?: boolean
}

export default function Answer(props: IAnswerProps) {
  const onClick = () => {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <div
      className={`Answer ${props.isCorrect ? 'correct' : ''} ${props.isWrong ? 'wrong' : ''}`}
      onClick={onClick}
    >
      <p>{props.text}</p>
    </div>
  )
}
