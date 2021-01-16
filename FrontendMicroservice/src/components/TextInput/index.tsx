import * as React from 'react'

import './index.scss'

export interface ITextInputProps {
  label?: string
  type?: string
  value?: string
  light?: boolean
  onChange?: (value: string) => void
  onClick?: () => void
}

export interface ITextInputState {
  value: string
}

export default function TextInput(props: ITextInputProps) {
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    setValue(props.value || '')
  }, [props.value])

  const onChange = (e: any) => {
    const { value } = e.target
    setValue(value)

    if (props.onChange) {
      props.onChange(value)
    }
  }

  const className = `TextInput  ${props.light ? 'light' : ''} ${value !== '' ? 'active' : ''}`

  return (
    <div className={className} onClick={props.onClick}>
      <input
        {...props}
        autoComplete='off'
        type={props.type}
        value={value}
        onChange={onChange}
      />
      <label>{props.label}</label>
    </div>
  )
}