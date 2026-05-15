import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

// DB stores "actor" (user is a reserved word in PostgreSQL); React state uses "user"
function toReactShape(row) {
  return { ts: row.ts, event: row.event, user: row.actor, msg: row.msg }
}

const LogContext = createContext(null)

export function LogProvider({ children }) {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Failed to fetch logs:', error.message)
        return
      }

      setLogs(data.map(toReactShape))
    }

    fetchLogs()
  }, [])

  async function addLog({ event, user, msg }) {
    const ts = new Date().toISOString().replace('T', ' ').slice(0, 19)

    const { data, error } = await supabase
      .from('logs')
      .insert({ ts, event, actor: user, msg })
      .select()
      .single()

    if (error) {
      console.error('Failed to insert log:', error.message)
      return
    }

    setLogs(prev => [...prev, toReactShape(data)])
  }

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  )
}

export function useLog() {
  return useContext(LogContext)
}
