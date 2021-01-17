import * as React from 'react'
import moment from 'moment'

import { getUserById } from 'services/users'
import { User } from 'services/users/types'
import { Challenge } from 'services/challenges/types'
import { TestResult } from 'services/questions/types'

import './index.scss'

export interface IChallengesProps {
  challenges: Challenge[]
  // onTestClick: (test: TestResult) => void
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
          console.log(originalUser)
        }

        if (item.opponentUserId) {
          opponentUser = await getUserById(item.opponentUserId)
          console.log(opponentUser)
        }
        return { ...item, originalUser, opponentUser }
      }))

      setChallenges(formatted)
    }

    formatData()
  }, [props.challenges]);

  const content = challenges?.map(item => {
    return <div className='ChallengesEntry'>{item.originalUser?.username}</div>
  })

  return (
    <div className='Challenges'>
      {content}
    </div>
  )
}
