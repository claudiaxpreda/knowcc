import * as React from 'react'

import './index.scss'

export interface ITestProgressProps {
  total: number
  current: number
}

export default function TestProgress(props: ITestProgressProps) {
  const totalCountLengthArray = Array.apply(null, Array(props.total)).map(() => { })

  return (
    <div className='TestProgress' style={{ gridTemplateColumns: `repeat(${props.total}, 1fr)` }}>
      {totalCountLengthArray.map(
        (_, index) => (
          <div className={`ProgressQuestion ${index < props.current - 1 ? 'highlighted' : ''} ${index === props.current - 1 ? 'current' : ''}`} />
        ))
      }
    </div>
  )
}
