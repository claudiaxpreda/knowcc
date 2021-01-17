import * as React from 'react'
import moment from 'moment'

import Button from 'components/Button'

import { getUserById } from 'services/users'
import { User } from 'services/users/types'
import { Challenge } from 'services/challenges/types'
import { TestResult } from 'services/questions/types'

import './index.scss'

export interface IChallengesProps {
  challenges: Challenge[]
  onResultClick: (test: TestResult) => void
  onChallengeAccept: (challengeId: number, test: TestResult) => void
}

export default function Challenges(props: IChallengesProps) {
  const [challenges, setChallenges] = React.useState<Challenge[]>()

  React.useEffect(() => {
    const formatData = async () => {
      const formatted = await Promise.all(props.challenges.map(async item => {
        let originalUser: User | undefined = undefined
        let opponentUser: User | undefined = undefined

        if (item.originalUserId) {
          originalUser = await getUserById(item.originalUserId)
        }

        if (item.opponentUserId) {
          opponentUser = await getUserById(item.opponentUserId)
        }
        return { ...item, originalUser, opponentUser }
      }))

      setChallenges(formatted)
    }

    formatData()
  }, [props.challenges]);

  const getOwnResult = (challenge: Challenge) => {
    let correctAnswersCount: number = 0
    let questionsCount: number = 0
    let duration: number = 0
    let pending: boolean = false
    let opponentTest: TestResult | null = null
    let clickableTest: TestResult | null = null

    if (localStorage.getItem('knowcc_username') === challenge.originalUser?.username) {
      if (Object.keys(challenge.originalTest).length === 0 || !challenge.originalTest) {
        pending = true
        opponentTest = challenge.opponentTest
      } else {
        correctAnswersCount = challenge.originalTest.correctAnswersCount
        questionsCount = challenge.originalTest.questionsCount
        duration = Math.round(moment.duration(moment(challenge.originalTest.testFinish).diff(moment(challenge.originalTest.testStart))).asSeconds())
        clickableTest = challenge.originalTest
      }
    } else {
      if (Object.keys(challenge.opponentTest).length === 0 || !challenge.opponentTest) {
        pending = true
        opponentTest = challenge.originalTest
      } else {
        correctAnswersCount = challenge.opponentTest.correctAnswersCount
        questionsCount = challenge.opponentTest.questionsCount
        duration = Math.round(moment.duration(moment(challenge.opponentTest.testFinish).diff(moment(challenge.opponentTest.testStart))).asSeconds())
        clickableTest = challenge.opponentTest
      }
    }

    if (pending) {
      return (
        <div className='OwnResult'>
          <h1>You</h1>
          <h2>pending</h2>
          <Button text='Accept challenge' onClick={() => opponentTest ? props.onChallengeAccept(challenge.id, opponentTest) : null} />
        </div>
      )
    }

    return (
      <div onClick={() => clickableTest ? props.onResultClick(clickableTest) : null}>
        <h1>You</h1>
        <h2>Score: {correctAnswersCount} / {questionsCount}</h2>
        <h2>{duration} seconds</h2>
      </div>
    )
  }

  const getOpponentResult = (challenge: Challenge) => {
    let correctAnswersCount: number = 0
    let questionsCount: number = 0
    let duration: number = 0
    let pending: boolean = false
    let opponentUsername: string | undefined = ''

    if (localStorage.getItem('knowcc_username') === challenge.originalUser?.username) {
      if (Object.keys(challenge.opponentTest).length === 0 || !challenge.opponentTest) {
        pending = true
      } else {
        correctAnswersCount = challenge.opponentTest.correctAnswersCount
        questionsCount = challenge.opponentTest.questionsCount
        duration = Math.round(moment.duration(moment(challenge.opponentTest.testFinish).diff(moment(challenge.opponentTest.testStart))).asSeconds())
      }
      opponentUsername = challenge.opponentUser?.username
    } else {
      if (Object.keys(challenge.originalTest).length === 0 || !challenge.originalTest) {
        pending = true
      } else {
        correctAnswersCount = challenge.originalTest.correctAnswersCount
        questionsCount = challenge.originalTest.questionsCount
        duration = Math.round(moment.duration(moment(challenge.originalTest.testFinish).diff(moment(challenge.originalTest.testStart))).asSeconds())
      }
      opponentUsername = challenge.originalUser?.username
    }

    if (pending) {
      return (
        <div className='OpponentResult'>
          <h1>{opponentUsername}</h1>
          <h2>pending</h2>
        </div>
      )
    }

    return (
      <div className='OpponentResult'>
        <h1>{opponentUsername}</h1>
        <h2>Score: {correctAnswersCount} / {questionsCount}</h2>
        <h2>{duration} seconds</h2>
      </div>
    )
  }

  const content = challenges?.map(item => {
    return (
      <div className='ChallengesEntry'>
        <p>{moment(item.originalTest.testStart).format('lll')}</p>
        <div className='ResultsRow'>
          {getOwnResult(item)}
          {getOpponentResult(item)}
        </div>
      </div>
    )
  })

  return (
    <div className='Challenges'>
      {content}
    </div>
  )
}
