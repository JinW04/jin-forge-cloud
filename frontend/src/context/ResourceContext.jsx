import { createContext, useContext, useState } from 'react'

// Derives icon and default cost from the modal's resource type dropdown values
const TYPE_META = {
  'Virtual Machine':    { icon: 'computer',    costHr: 0.08 },
  'PostgreSQL DB':      { icon: 'database',    costHr: 0.25 },
  'Kubernetes Cluster': { icon: 'hub',         costHr: 0.50 },
  'Azure Web App':      { icon: 'cloud',       costHr: 0.12 },
  'Storage Account':    { icon: 'folder_data', costHr: 0.03 },
  // Aliases used in the existing seed data
  'VM':                 { icon: 'computer',    costHr: 0.08 },
  'Database':           { icon: 'database',    costHr: 0.25 },
}

// Master list — newest first so Dashboard can just .slice(0, 5)
// Unified shape: name, type, icon, region, status, date, costHr
const INITIAL_RESOURCES = [
  { name: 'web-portal-staging',  type: 'Azure Web App',   icon: 'cloud',       region: 'East US',        status: 'Deploying', date: 'May 5, 2026',  costHr: 0.09 },
  { name: 'api-gateway-dev',     type: 'Azure Web App',   icon: 'cloud',       region: 'West US',        status: 'Running',   date: 'Apr 30, 2026', costHr: 0.06 },
  { name: 'web-portal-prod',     type: 'Azure Web App',   icon: 'cloud',       region: 'East US',        status: 'Running',   date: 'Apr 28, 2026', costHr: 0.12 },
  { name: 'analytics-db',        type: 'Database',        icon: 'database',    region: 'North Europe',   status: 'Running',   date: 'Apr 22, 2026', costHr: 0.31 },
  { name: 'db-postgres-prod',    type: 'Database',        icon: 'database',    region: 'East US',        status: 'Running',   date: 'Apr 20, 2026', costHr: 0.25 },
  { name: 'data-lake-alpha',     type: 'Storage Account', icon: 'folder_data', region: 'West Europe',    status: 'Running',   date: 'Apr 15, 2026', costHr: 0.03 },
  { name: 'ml-training-vm',      type: 'VM',              icon: 'computer',    region: 'East US 2',      status: 'Stopped',   date: 'Mar 20, 2026', costHr: 1.20 },
  { name: 'vm-build-agent-01',   type: 'VM',              icon: 'computer',    region: 'Southeast Asia', status: 'Stopped',   date: 'Mar 10, 2026', costHr: 0.08 },
  { name: 'legacy-sync-svc',     type: 'VM',              icon: 'computer',    region: 'East US',        status: 'Failed',    date: 'Mar 5, 2026',  costHr: 0.18 },
  { name: 'backup-storage',      type: 'Storage Account', icon: 'folder_data', region: 'West Europe',    status: 'Running',   date: 'Feb 18, 2026', costHr: 0.02 },
]

const ResourceContext = createContext(null)

export function ResourceProvider({ children }) {
  const [resources, setResources] = useState(INITIAL_RESOURCES)

  function addResource({ name, type, region, status, date }) {
    const meta = TYPE_META[type] ?? { icon: 'dns', costHr: 0.10 }
    setResources(prev => [
      { name, type, icon: meta.icon, region, status, date, costHr: meta.costHr },
      ...prev,
    ])
  }

  return (
    <ResourceContext.Provider value={{ resources, addResource }}>
      {children}
    </ResourceContext.Provider>
  )
}

export function useResources() {
  return useContext(ResourceContext)
}
