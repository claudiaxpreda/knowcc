import * as React from 'react'

import { User } from 'services/users/types'

import './index.scss'

export interface IAnswerReviewProps {
  data: User | null
  onClick?: (id: number) => void
}

export default function AnswerReviewComponent(props: IAnswerReviewProps) {
  const onClick = () => {
    if (props.onClick && props.data) {
      props.onClick(props.data.id)
    }
  }

  if (!props.data) {
    return (
      <div className='UserBox' onClick={onClick}>
        <p className='placeholder'>no user selected</p>
      </div>
    )
  }

  return (
    <div className='UserBox' onClick={onClick}>
      <p>{props.data.username}</p>
      <p>{props.data.email}</p>
    </div>
  )
}
