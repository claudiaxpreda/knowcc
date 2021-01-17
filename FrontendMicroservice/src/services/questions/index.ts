import AxiosInstance from 'services/axios'

import getConfig from 'services/axios/config'

import { Question, TestResult } from 'services/questions/types' 

export const getCategories = async () => {
  try {
    const response = await AxiosInstance.get('/api/questions/categories/', getConfig())

    return response.data.categories as string[]
  } catch(e) {
    return e.status
  }
}

export const getQuestions = async (params: string) => {
  try {
    const response = await AxiosInstance.get(`/api/questions${params}/`, getConfig())

    return response.data as Question[]
  } catch(e) {
    return e.status
  }
}

export const addAnswer = async (testId: number, answer: string, questionId: number) => {
  try {
    await AxiosInstance.post(`/api/tests/answers/`, {
      testId,
      answer,
      questionId
    }, getConfig())
  } catch(e) {
    return e.status
  }
}


export const getTestResultById = async (testId: number) => {
  try {
    const response = await AxiosInstance.get(`/api/tests?id=${testId}`, getConfig())

    return response.data
  } catch(e) {
    return e.status
  }
}

export const getHistory = async () => {
  try {
    const response = await AxiosInstance.get(`/api/tests/`, getConfig())

    return response.data.tests as TestResult[]
  } catch(e) {
    return e.status
  }
}