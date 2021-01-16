import * as React from 'react'


import TextInput from 'components/TextInput'
import UserBox from 'components/UserBox'
import CategoryBox from 'components/CategoryBox'
import Button from 'components/Button'
import UsersList from 'components/UsersList'

import { User } from 'services/users/types'

import './index.scss'

interface Category {
  label: string
  checked: boolean
}

export interface ICustomizerProps {
  categories: string[]
  users: User[]
  onKeywordChange: (keyword: string) => void
  onTestStart: (count: string, categories: string[]) => Promise<void>
}

const MAX_COUNT = 15

export default function Customizer(props: ICustomizerProps) {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [count, setCount] = React.useState('5')
  const [keyword, setKeyword] = React.useState('')
  const [chosenOpponent, setChosenOpponent] = React.useState<User | null>(null)

  React.useEffect(() => {
    setCategories(props.categories.map(
      (category: string) => ({ label: category, checked: true }))
    )
  }, [props.categories])

  const onCheckboxChange = (label: string) => {
    setCategories(
      categories.map((category) =>
        category.label === label
          ? { ...category, checked: !category.checked }
          : category
      )
    )
  }

  const onCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCount(e.currentTarget.value)
  }

  const onStartTest = () => {
    props.onTestStart(
      count,
      categories.filter(category => category.checked).map(category => category.label)
    )
  }

  const onUserBoxClick = (id: number) => {
    setChosenOpponent(props.users.find(user => user.id === id) || null)
    setKeyword('')
    props.onKeywordChange('')
  }

  const validateFields = () => {
    const intCount = parseInt(count)

    if (intCount < 0 || intCount > MAX_COUNT) {
      return `Questions count number must be in [1, ${MAX_COUNT}] interval`
    }

    if (!categories.some(category => category.checked)) {
      return 'At least one category must be checked'
    }

    return ''
  }

  const categoryBoxes = categories.map(category => (
    // <div key={category.label}>
    //   <p>{category.label}</p>
    //   <input
    //     type='checkbox'
    //     id={category.label}
    //     checked={category.checked}
    //     onChange={() => onCheckboxChange(category.label)}
    //   />
    // </div>
    <CategoryBox key={category.label} label={category.label} checked={category.checked} onChange={() => onCheckboxChange(category.label)} />
  ))

  return (
    <div className='Customizer'>
      <h1>Let's Play</h1>
      <h2>Choose topics</h2>
      <div className='Categories'>
        {categoryBoxes}
      </div>
      <h2>Choose number of questions</h2>
      <input type='number' value={count} onChange={onCountChange} min={1} max={MAX_COUNT} />
      <p>{validateFields()}</p>
      <h2>Choose opponent</h2>
      <UsersList users={props.users} onUserBoxClick={onUserBoxClick} />
      <TextInput
        label='Search users'
        value={keyword}
        onChange={(value: string) => {
          props.onKeywordChange(value)
          setKeyword(value)
        }}
      />
      <UserBox data={chosenOpponent} />
      <div className='StartButton'>
        <Button text='Start Test' onClick={onStartTest} />
      </div>
    </div>
  )
}
