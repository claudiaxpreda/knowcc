import React from 'react'

import Auth from 'routes/Auth'
import Main from 'routes/Main'

import { getStatus } from 'services/authentication'

import './App.scss'

export default function App() {
  const [page, setPage] = React.useState<'auth' | 'main'>('auth')

  React.useEffect(() => {
    const init = async () => {
      const status = await getStatus()

      if (status) {
        setPage('main')
      }
    }

    init()
  }, [])

  const goToMain = () => {
    setPage('main')
  }

  return (
    <div className='App'>
      {page === 'auth' ? <Auth onPageChange={goToMain} /> : <Main />}
    </div>
  )
}
