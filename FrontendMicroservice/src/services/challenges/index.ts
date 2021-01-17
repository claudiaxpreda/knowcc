import AxiosInstance from 'services/axios'

import getConfig from 'services/axios/config'

export const getChallenges = async () => {
  try {
    const response = await AxiosInstance.get(`/api/challenges/`, getConfig())

    return response.data
  } catch(e) {
    console.log(e)
    return []
  }
}

export const createChallenge = async (testId: number, opponentId: number) => {
  try {
    const response = await AxiosInstance.post(`/api/challenges/`, {
      originalTestId: testId,
      challengedUserId: opponentId
    }, getConfig())

    return response.data
  } catch(e) {
    console.log(e)
  }
}

export const updateChallenge = async (testId: number, challengeId: number) => {
  try {
    const response = await AxiosInstance.patch(`/api/challenges/`, {
      testId,
      challengeId
    }, getConfig())

    return response.data
  } catch(e) {
    console.log(e)
  }
}