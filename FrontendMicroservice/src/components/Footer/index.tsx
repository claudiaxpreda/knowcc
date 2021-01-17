import * as React from 'react';

import { Page } from 'routes/Main'

import FaHome from '@meronex/icons/fa/FaHome'
import FaGamepad from '@meronex/icons/fa/FaGamepad'
import FaHistory from '@meronex/icons/fa/FaHistory'
import FaSignOutAlt from '@meronex/icons/fa/FaSignOutAlt'

import './index.scss'

export interface IFooterProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

export interface IFooterButtonProps {
  text: string
  navigateTo: Page
  icon: any
  selected: boolean
  onClick: (page: Page) => void
}

export default function Footer(props: IFooterProps) {
  const onLogout = (_: Page) => {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('knowcc_username')
    window.location.reload()
  }

  return (
    <div className='Footer'>
      <FooterButton
        text='Home'
        navigateTo='customizer'
        icon={FaHome}
        selected={props.currentPage === 'customizer'}
        onClick={props.onPageChange}
      />
      <FooterButton
        text='History'
        navigateTo='history'
        icon={FaHistory}
        selected={props.currentPage === 'history'}
        onClick={props.onPageChange}
      />
      <FooterButton
        text='Challenges'
        navigateTo='challenges'
        icon={FaGamepad}
        selected={props.currentPage === 'challenges'}
        onClick={props.onPageChange}
      />
      <FooterButton
        text='Logout'
        navigateTo='customizer'
        icon={FaSignOutAlt}
        selected={false}
        onClick={onLogout}
      />
    </div>
  );
}

const FooterButton = (props: IFooterButtonProps) => {
  const Icon = props.icon

  return (
    <div
      className={`FooterButton ${props.selected ? 'selected' : ''}`}
      onClick={() => props.onClick(props.navigateTo)}
    >
      <Icon />
      {props.text}
    </div>
  )
}
