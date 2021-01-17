import * as React from 'react'

import history from 'assets/history.jpg'
import sport from 'assets/sport.jpg'
import geography from 'assets/geography.jpg'

import './index.scss'

export interface ICategoryBoxProps {
  label: string
  checked: boolean
  onChange: () => void
}

export default function CategoryBox(props: ICategoryBoxProps) {
  const getImage = () => {
    switch (props.label) {
      case 'History':
        return history
      case 'Sports':
        return sport
      case 'Geography':
        return geography
      default:
        return history
    }
  }

  return (
    <div className={`CategoryBox ${props.checked ? '' : 'disabled'}`} onClick={props.onChange}>
      <img src={getImage()} alt='' />
      <div className='Filter' />
      <p>{props.label}</p>
    </div>
  )
}