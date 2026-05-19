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

const DEPLOYMENT_TIMEOUT = 7000

// DB stores cost_hr (snake_case); React state uses costHr (camelCase)
function toReactShape(row) {
  return { ...row, costHr: row.cost_hr }
}

const ResourceContext = createContext(null)

export function ResourceProvider({ children }) {
  const [resources, setResources] = useState([])
  const { addLog } = useLog()

  function scheduleDeploymentCompletion(id, name, type) {
    setTimeout(async () => {
      const { data: updated, error } = await supabase
        .from('resources')
        .update({ status: 'Running' })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Failed to auto-complete deployment (DB error):', error)
        return
      }

      if (!updated || updated.length === 0) {
        console.error('Deployment update silently failed — likely blocked by RLS. No rows updated for id:', id)
        return
      }

      setResources(prev => prev.map(r => r.id === id ? { ...r, status: 'Running' } : r))

      try {
        await addLog({
          event: 'PROVISION_DONE',
          user:  'sp-terraform-ci',
          msg:   `Provisioning complete. ${name} (${type}) is now running.`,
        })
      } catch (logErr) {
        console.warn('Log entry failed (non-critical):', logErr.message)
      }
    }, DEPLOYMENT_TIMEOUT)
  }

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

      // Resume the countdown for any resources stuck in Deploying from a previous session
      data
        .filter(r => r.status === 'Deploying')
        .forEach(r => scheduleDeploymentCompletion(r.id, r.name, r.type))
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

    console.log('Insert response shape:', data)
    console.log('Scheduling deployment for ID:', data?.id)

    if (data?.id) {
      scheduleDeploymentCompletion(data.id, data.name, data.type)
    } else {
      console.error('Cannot schedule deployment: id missing from insert response', data)
    }

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

    const { data: updated, error } = await supabase
      .from('resources')
      .update({ status: newStatus })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Failed to update resource status (DB error):', error)
      return
    }

    if (!updated || updated.length === 0) {
      console.error('Status toggle silently failed — likely blocked by RLS. No rows updated for id:', id)
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