export interface Question {
  id: number
  text: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  category: string
  answers_count: number
  correct_answers_count: number
}

export interface QuestionsSet {
  questions: Question[],
  test_id: number
}

export interface TestResult {
  testStart: string,
  testFinish: string,
  answers: Answer[]
}

export interface Answer {
  id: number
  text: string
  answer: string
  correct_answer: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  category: string
  answers_count: string
  correct_answers_count: string
}

export const dummyQuestionsSet: QuestionsSet = {
  questions: [],
  test_id: 0
}

export const dummyTestResult: TestResult = {
  testStart: '',
  testFinish: '',
  answers: []
}


