import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [page, setPage] = useState('login')

  return page === 'login'
    ? <Login onLogin={() => setPage('dashboard')} />
    : <Dashboard />
}

export default App
