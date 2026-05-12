import { useState } from 'react'
import { ResourceProvider } from './context/ResourceContext'
import { LogProvider } from './context/LogContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [page, setPage] = useState('login')

  return (
    <LogProvider>
      <ResourceProvider>
        {page === 'login'
          ? <Login onLogin={() => setPage('dashboard')} />
          : <Dashboard />
        }
      </ResourceProvider>
    </LogProvider>
  )
}

export default App
