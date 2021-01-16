import AxiosInstance from 'services/axios'

import getConfig from 'services/axios/config'

export const getStatus = async () => {
  try {
    await AxiosInstance.get(`/api/auth/login`, getConfig())

    return true
  } catch(e) {
    return e.status
  }
}

export const login = async (username: string, password: string) => {
  try {
    const response = await AxiosInstance.post(`/api/auth/login/`, {
      username,
      password
    })

    return response.data
  } catch(e) {
    return e.status
  }
}

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await AxiosInstance.post(`/api/auth/register/`, {
      username,
      email,
      password
    })

    return response.data
  } catch(e) {
    return e.status
  }
}
