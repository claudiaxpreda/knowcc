import moment from 'moment'

import { TestResult } from 'services/questions/types'

import './index.scss'

export interface IHistoryProps {
  data: TestResult[]
  onTestClick: (test: TestResult) => void
}

export default function History(props: IHistoryProps) {
  const content = props.data.map(item => {
    if (item.answers && item.answers.length > 0) {
      const start = moment(item.testStart)
      const end = moment(item.testFinish)

      return (
        <div className='HistoryEntry' onClick={() => props.onTestClick(item)}>
          <p>{moment(item.testStart).format('lll')}</p>
          <p>Duration: {Math.round(moment.duration(end.diff(start)).asSeconds())} seconds</p>
          <h1>Score: {item.correctAnswersCount}/{item.questionsCount} </h1>
        </div>
      )
    }

    return null
  })

  return (
    <div className='History'>
      {content}
    </div>
  )
}
