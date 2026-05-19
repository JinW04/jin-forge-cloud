import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { ResourceProvider } from './context/ResourceContext'
import { LogProvider } from './context/LogContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  // undefined = still checking session, null = no session, object = authenticated
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Blank screen while the initial session check resolves (avoids login flash)
  if (session === undefined) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <LogProvider>
      <ResourceProvider>
        {session ? <Dashboard /> : <Login />}
      </ResourceProvider>
    </LogProvider>
  )
}

export default App
