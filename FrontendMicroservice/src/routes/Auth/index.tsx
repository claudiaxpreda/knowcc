import * as React from 'react'
import Swal from 'sweetalert2'

import TextInput from 'components/TextInput'
import Button from 'components/Button'

import { login, register } from 'services/authentication'
import { validateEmail } from 'utils'

import logo from 'assets/logo.svg'

import './index.scss'

export interface IAuthProps {
  onPageChange: () => void
}

export default function Auth(props: IAuthProps) {
  const [type, setType] = React.useState<'login' | 'signup'>('login')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [rePassword, setRePassword] = React.useState('')

  const emptyState = () => {
    setUsername('')
    setPassword('')
    setEmail('')
    setRePassword('')
  }

  const onLoginClick = async () => {
    try {
      const response = await login(username, password)

      localStorage.setItem('jwt_token', response.token)
      localStorage.setItem('knowcc_username', username)
      props.onPageChange()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e,
      })

    }
  }

  const onSignupClick = async () => {
    let errorMessage = ''

    if (!validateEmail) {
      errorMessage = 'Email is invalid!'
    }

    if (password !== rePassword) {
      errorMessage = 'Passwords are not identical'
    }

    if (errorMessage !== '') {
      Swal.fire({
        icon: 'error',
        text: errorMessage,
      })

      return
    }

    try {
      await register(username, email, password)

      Swal.fire({
        icon: 'success',
        title: 'Account created',
      })

      emptyState()
      setType('login')
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e,
      })
    }
  }

  const switchToLogin = () => {
    setType('login')
    emptyState()
  }

  const switchToSignup = () => {
    setType('signup')
    emptyState()
  }

  const Login = (
    <div className='Login'>
      <div className='Form'>
        <TextInput label='Username' value={username} onChange={(value) => setUsername(value)} />
        <TextInput label='Password' value={password} onChange={(value) => setPassword(value)} type='password' />
      </div>
      <Button text='Login' onClick={onLoginClick} />
      <div className='AuthSwitcher' onClick={switchToSignup}>
        Not registered? Signup
    </div>
    </div>
  )

  const Signup = (
    <div className='Signup'>
      <div className='Form'>
        <TextInput
          label='Email address'
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <TextInput
          label='Username'
          value={username}
          onChange={(value) => setUsername(value)}
        />
        <TextInput
          label='Password'
          type='password'
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <TextInput
          label='Re-type password'
          type='password'
          value={rePassword}
          onChange={(value) => setRePassword(value)}
        />
      </div>
      <Button text='Signup' onClick={onSignupClick} />
      <div className='AuthSwitcher' onClick={switchToLogin}>
        Already registered? Login
    </div>
    </div>
  )

  return (
    <div className='Auth'>
      <img src={logo} alt='' />
      {type === 'login' ? Login : Signup}
    </div>
  )
}
