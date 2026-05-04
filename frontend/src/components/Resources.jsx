import { useState } from 'react'

const RESOURCES = [
  { name: 'web-portal-prod',     type: 'Azure Web App',   icon: 'cloud',       region: 'East US',       status: 'Running',   costHr: 0.12 },
  { name: 'data-lake-alpha',     type: 'Storage Account', icon: 'folder_data', region: 'West Europe',   status: 'Running',   costHr: 0.03 },
  { name: 'db-postgres-prod',    type: 'Database',        icon: 'database',    region: 'East US',       status: 'Running',   costHr: 0.25 },
  { name: 'vm-build-agent-01',   type: 'VM',              icon: 'computer',    region: 'Southeast Asia',status: 'Stopped',   costHr: 0.08 },
  { name: 'api-gateway-dev',     type: 'Azure Web App',   icon: 'cloud',       region: 'West US',       status: 'Running',   costHr: 0.06 },
  { name: 'legacy-sync-svc',     type: 'VM',              icon: 'computer',    region: 'East US',       status: 'Failed',    costHr: 0.18 },
  { name: 'analytics-db',        type: 'Database',        icon: 'database',    region: 'North Europe',  status: 'Running',   costHr: 0.31 },
  { name: 'backup-storage',      type: 'Storage Account', icon: 'folder_data', region: 'West Europe',   status: 'Running',   costHr: 0.02 },
  { name: 'ml-training-vm',      type: 'VM',              icon: 'computer',    region: 'East US 2',     status: 'Stopped',   costHr: 1.20 },
  { name: 'web-portal-staging',  type: 'Azure Web App',   icon: 'cloud',       region: 'East US',       status: 'Deploying', costHr: 0.09 },
]

const STATUS_STYLES = {
  Running:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.15)]',
  Stopped:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Failed:    'bg-error-container/20 text-error border-error/20',
  Deploying: 'bg-primary/10 text-primary border-primary/20',
}

const DOT_STYLES = {
  Running:   'bg-emerald-400',
  Stopped:   'bg-amber-400',
  Failed:    'bg-error',
  Deploying: 'bg-primary animate-pulse',
}

export default function Resources() {
  const [search, setSearch] = useState('')

  const filtered = RESOURCES.filter(({ name, type, region, status }) =>
    [name, type, region, status].some(v => v.toLowerCase().includes(search.toLowerCase()))
  )

  const runningCount = RESOURCES.filter(r => r.status === 'Running').length
  const totalCostHr  = RESOURCES.reduce((sum, r) => sum + r.costHr, 0)

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-2">
          My Resources
        </h2>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          All provisioned cloud assets across your environments.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Total Resources</p>
          <p className="text-3xl font-black text-on-surface">{RESOURCES.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Running</p>
          <p className="text-3xl font-black text-emerald-400">{runningCount}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Est. Cost / Hr</p>
          <p className="text-3xl font-black text-on-surface">
            ${totalCostHr.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6 flex items-center gap-3 bg-surface-container-low border border-outline-variant/20 px-4 py-2.5 rounded-xl max-w-lg">
        <span className="material-symbols-outlined text-outline">search</span>
        <input
          className="bg-transparent border-none outline-none text-sm text-on-surface w-full placeholder:text-outline-variant"
          placeholder="Filter by name, type, region, or status…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-surface-container-low rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Resource Name</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Type</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Region</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant text-right">Cost / Hr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl block mb-3 opacity-30">search_off</span>
                  <p className="text-sm">No resources match &quot;{search}&quot;</p>
                </td>
              </tr>
            ) : (
              filtered.map(({ name, type, icon, region, status, costHr }) => (
                <tr key={name} className="hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>{icon}</span>
                      </div>
                      <span className="font-medium text-sm text-on-surface">{name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-outline" style={{ fontSize: '14px' }}>location_on</span>
                      {region}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLES[status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${DOT_STYLES[status]}`} />
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono text-sm text-on-surface">${costHr.toFixed(2)}</span>
                    <span className="text-[10px] text-on-surface-variant ml-0.5">/hr</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="mt-4 text-[10px] text-on-surface-variant uppercase tracking-widest">
          Showing {filtered.length} of {RESOURCES.length} resources
        </p>
      )}
    </div>
  )
}
