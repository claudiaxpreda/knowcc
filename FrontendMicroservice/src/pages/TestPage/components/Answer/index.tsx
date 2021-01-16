import * as React from 'react'

import './index.scss'

export interface IAnswerProps {
  text: string
  onClick: () => void
}

export default function Answer(props: IAnswerProps) {
  return (
    <div className='Answer' onClick={() => props.onClick()}>
      <p>{props.text}</p>
    </div>
  )
}
