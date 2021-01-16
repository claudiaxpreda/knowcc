import AxiosInstance from 'services/axios'

import getConfig from 'services/axios/config'

import { User } from 'services/users/types'

export const getUsersByKeyword = async (keyword: string) => {
  try {
    const response = await AxiosInstance.get(`/api/users/?keyword=${keyword}`, getConfig())

    return response.data.users as User[]
  } catch(e) {
    return e.status
  }
}