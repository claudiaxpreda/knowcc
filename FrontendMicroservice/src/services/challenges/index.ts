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