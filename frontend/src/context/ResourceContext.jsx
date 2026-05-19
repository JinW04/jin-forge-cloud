import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useLog } from './LogContext'

const TYPE_META = {
  'Virtual Machine':    { icon: 'computer',    costHr: 0.08 },
  'PostgreSQL DB':      { icon: 'database',    costHr: 0.25 },
  'Kubernetes Cluster': { icon: 'hub',         costHr: 0.50 },
  'Azure Web App':      { icon: 'cloud',       costHr: 0.12 },
  'Storage Account':    { icon: 'folder_data', costHr: 0.03 },
  'VM':                 { icon: 'computer',    costHr: 0.08 },
  'Database':           { icon: 'database',    costHr: 0.25 },
}

// DB stores cost_hr (snake_case); React state uses costHr (camelCase)
function toReactShape(row) {
  return { ...row, costHr: row.cost_hr }
}

const ResourceContext = createContext(null)

export function ResourceProvider({ children }) {
  const [resources, setResources] = useState([])
  const { addLog } = useLog()

  useEffect(() => {
    async function fetchResources() {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch resources:', error.message)
        return
      }

      setResources(data.map(toReactShape))
    }

    fetchResources()
  }, [])

  async function addResource({ name, type, region, status, date }) {
    const meta = TYPE_META[type] ?? { icon: 'dns', costHr: 0.10 }

    const { data, error } = await supabase
      .from('resources')
      .insert({
        name,
        type,
        icon:     meta.icon,
        // Added fallbacks here so Supabase never gets a null value!
        region:   region || 'us-east', 
        status:   'Deploying', // <--- Forced to match the DB constraint exactly
        date:     date || new Date().toISOString().split('T')[0], 
        cost_hr:  meta.costHr,
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to insert resource:', error.message)
      return
    }

    setResources(prev => [toReactShape(data), ...prev])

    try {
      await addLog({
        event: 'RESOURCE_CREATED',
        user:  'jin@corp.local',
        msg:   `${data.type} provisioned: ${data.name} in ${data.region}.`,
      })
    } catch (logErr) {
      console.warn('Log entry failed (non-critical):', logErr.message)
    }
  }

  async function toggleResourceStatus(id, currentStatus) {
    const newStatus = (currentStatus === 'Running' || currentStatus === 'Deploying')
      ? 'Stopped'
      : 'Running'

    const resource = resources.find(r => r.id === id)

    const { error } = await supabase
      .from('resources')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Failed to update resource status:', error.message)
      return
    }

    setResources(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r))

    try {
      await addLog({
        event: newStatus === 'Running' ? 'RESOURCE_STARTED' : 'RESOURCE_STOPPED',
        user:  'jin@corp.local',
        msg:   `${resource?.type ?? 'Resource'} ${resource?.name ?? id} ${newStatus === 'Running' ? 'started' : 'stopped'}.`,
      })
    } catch (logErr) {
      console.warn('Log entry failed (non-critical):', logErr.message)
    }
  }

  async function removeResource(name) {
    const resource = resources.find(r => r.name === name)

    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('name', name)

    if (error) {
      console.error('Failed to delete resource:', error.message)
      return
    }

    setResources(prev => prev.filter(r => r.name !== name))

    try {
      await addLog({
        event: 'RESOURCE_DELETED',
        user:  'jin@corp.local',
        msg:   `${resource?.type ?? 'Resource'} decommissioned: ${name} (${resource?.region ?? 'unknown region'}).`,
      })
    } catch (logErr) {
      console.warn('Log entry failed (non-critical):', logErr.message)
    }
  }

  return (
    <ResourceContext.Provider value={{ resources, addResource, removeResource, toggleResourceStatus }}>
      {children}
    </ResourceContext.Provider>
  )
}

export function useResources() {
  return useContext(ResourceContext)
}