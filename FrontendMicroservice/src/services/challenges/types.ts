import { TestResult } from 'services/questions/types'
import { User } from 'services/users/types'

export interface Challenge {
  id: number
  createdAt: string
  opponentTest: TestResult
  opponentUser?: User
  opponentTestId: number
  opponentUserId: number
  originalTest: TestResult
  originalUser?: User
  originalTestId: number
  originalUserId: number
}