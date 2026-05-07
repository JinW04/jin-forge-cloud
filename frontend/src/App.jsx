import { useState } from 'react'
import { ResourceProvider } from './context/ResourceContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [page, setPage] = useState('login')

  return (
    <ResourceProvider>
      {page === 'login'
        ? <Login onLogin={() => setPage('dashboard')} />
        : <Dashboard />
      }
    </ResourceProvider>
  )
}

export default App
