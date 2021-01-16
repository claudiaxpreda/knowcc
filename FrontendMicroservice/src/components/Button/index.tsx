import * as React from 'react'

import './index.scss'

export interface IButtonProps {
  text: string
  onClick: () => void
}

export default function Button(props: IButtonProps) {
  return (
    <div className='Button' onClick={props.onClick}>
      <span>{props.text}</span>
    </div>
  )
}
