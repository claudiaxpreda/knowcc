import * as React from 'react'

// import './index.scss'

export interface IChallengesProps {
  challenges: any
}

export default function Challenges(props: IChallengesProps) {
  console.log(props.challenges)
  // React.useEffect(() => {
  //   setQuestionsCount(props.questionsSet.questions.length)
  //   setCurrent(1)
  // }, [props.questionsSet])

  // const onAnswerClick = (answer: string, questionId: number) => {
  //   addAnswer(props.questionsSet.test_id, answer, questionId)

  //   if (current === questionsCount) {
  //     props.onTestFinish()
  //   }

  //   setCurrent(current + 1)
  // }

  // const content = props.Challenges.answers.map(
  //   question => (
  //     <AnswerReview
  //       key={question.id}
  //       data={question}
  //     />
  //   )
  // )

  return (
    <div className='Challenges'>
      {/* {content} */}
    </div>
  )
}
