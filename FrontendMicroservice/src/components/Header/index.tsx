import * as React from 'react'

import Button from 'components/Button'

import logo from 'assets/logo.svg'

import './index.scss'

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {
  const onLogout = () => {
    localStorage.removeItem('jwt_token')
    window.location.reload()
  }

  return (
    <div className='Header'>
      <img src={logo} alt='' />
      <Button text='Logout' onClick={onLogout} />
    </div>
  )
}
