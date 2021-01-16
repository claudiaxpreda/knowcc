import * as React from 'react'

import UserBox from 'components/UserBox'

import { User } from 'services/users/types'

import './index.scss'

export interface IUsersListContainerProps {
  users: User[]
  onUserBoxClick: (id: number) => void
}

export default function UsersListContainer(props: IUsersListContainerProps) {
  return (
    <div className='UsersListContainer'>
      <div className='UsersList'>
        {props.users.map(item => (
          <UserBox
            key={item.id}
            data={item}
            onClick={props.onUserBoxClick}
          />
        ))}
      </div>
    </div>
  )
}
