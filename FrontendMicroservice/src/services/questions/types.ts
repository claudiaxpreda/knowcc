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
  testId: number
  testStart: string
  testFinish: string
  questionsCount: number
  correctAnswersCount: number
  answers: Answer[]
}

export interface Answer {
  id: number
  answerCreatedAt: string
  testCreatedAt: string
  answer: string
  text: string
  correctAnswer: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  category: string
  answersCount: string
  correctAnswersCount: string
}

export const dummyQuestionsSet: QuestionsSet = {
  questions: [],
  test_id: 0
}

export const dummyTestResult: TestResult = {
  testId: 0,
  testStart: '',
  testFinish: '',
  questionsCount: 0,
  correctAnswersCount: 0,
  answers: []
}


