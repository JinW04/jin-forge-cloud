import { useState } from 'react'
import { useResources } from '../context/ResourceContext'

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

function DecommissionModal({ resource, onConfirm, onCancel }) {
  const [confirming, setConfirming] = useState(false)

  function handleConfirm() {
    setConfirming(true)
    setTimeout(() => {
      onConfirm(resource.name)
    }, 800)
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget && !confirming) onCancel()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6, 14, 32, 0.90)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-md rounded-xl border border-error/30 bg-surface-container-low shadow-[0_0_60px_rgba(186,26,26,0.20)] overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-error/10 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-error/10 border border-error/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-error" style={{ fontSize: '20px' }}>warning</span>
            </div>
            <div>
              <h2 className="text-xl font-black font-headline tracking-tight text-on-surface">Decommission Resource</h2>
              <p className="text-sm text-on-surface-variant mt-1">This action cannot be undone.</p>
            </div>
          </div>
          {!confirming && (
            <button
              onClick={onCancel}
              className="text-on-surface-variant hover:text-on-surface transition-colors p-1 cursor-pointer -mt-1 -mr-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Are you sure you want to decommission{' '}
            <span className="font-bold text-on-surface font-mono">{resource.name}</span>?
          </p>
          <div className="mt-4 rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-on-surface-variant uppercase tracking-widest">Type</span>
              <span className="text-on-surface font-medium">{resource.type}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-on-surface-variant uppercase tracking-widest">Region</span>
              <span className="text-on-surface font-medium">{resource.region}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-on-surface-variant uppercase tracking-widest">Status</span>
              <span className="text-on-surface font-medium">{resource.status}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-on-surface-variant uppercase tracking-widest">Cost / Hr</span>
              <span className="text-on-surface font-medium">${resource.costHr.toFixed(2)}</span>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-error/70 flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
            A RESOURCE_DELETED audit log entry will be recorded.
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-3">
          <button
            onClick={onCancel}
            disabled={confirming}
            className="flex-1 py-3 border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/50 rounded-xl text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-0 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="flex-[2] py-3 bg-error/90 hover:bg-error text-white rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] shadow-[0_0_20px_rgba(186,26,26,0.30)]"
          >
            {confirming ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin flex-shrink-0" />
                Decommissioning...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete_forever</span>
                Decommission
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Resources() {
  const { resources, removeResource, toggleResourceStatus } = useResources()
  const [search, setSearch] = useState('')
  const [targetResource, setTargetResource] = useState(null)

  const filtered = resources.filter(({ name, type, region, status }) =>
    [name, type, region, status].some(v => v.toLowerCase().includes(search.toLowerCase()))
  )

  const runningCount = resources.filter(r => r.status === 'Running').length
  const totalCostHr  = resources.reduce((sum, r) => sum + r.costHr, 0)

  function handleConfirmDecommission(name) {
    removeResource(name)
    setTargetResource(null)
  }

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
          <p className="text-3xl font-black text-on-surface">{resources.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Running</p>
          <p className="text-3xl font-black text-emerald-400">{runningCount}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Est. Cost / Hr</p>
          <p className="text-3xl font-black text-on-surface">${totalCostHr.toFixed(2)}</p>
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
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl block mb-3 opacity-30">search_off</span>
                  <p className="text-sm">No resources match &quot;{search}&quot;</p>
                </td>
              </tr>
            ) : (
              filtered.map((resource) => {
                const { name, type, icon, region, status, costHr } = resource
                return (
                  <tr key={name} className="hover:bg-white/5 transition-colors">
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
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLES[status] ?? STATUS_STYLES.Deploying}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT_STYLES[status] ?? DOT_STYLES.Deploying}`} />
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-sm text-on-surface">${costHr.toFixed(2)}</span>
                      <span className="text-[10px] text-on-surface-variant ml-0.5">/hr</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => toggleResourceStatus(resource.id, status)}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            status === 'Stopped' || status === 'Failed'
                              ? 'text-on-surface-variant/40 hover:text-emerald-400 hover:bg-emerald-500/10'
                              : 'text-on-surface-variant/40 hover:text-amber-400 hover:bg-amber-500/10'
                          }`}
                          title={status === 'Stopped' || status === 'Failed' ? `Start ${name}` : `Stop ${name}`}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                            {status === 'Stopped' || status === 'Failed' ? 'play_arrow' : 'stop'}
                          </span>
                        </button>
                        <button
                          onClick={() => setTargetResource(resource)}
                          className="p-1.5 rounded-lg text-on-surface-variant/40 hover:text-error hover:bg-error/10 transition-all cursor-pointer"
                          title={`Decommission ${name}`}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="mt-4 text-[10px] text-on-surface-variant uppercase tracking-widest">
          Showing {filtered.length} of {resources.length} resources
        </p>
      )}

      {targetResource && (
        <DecommissionModal
          resource={targetResource}
          onConfirm={handleConfirmDecommission}
          onCancel={() => setTargetResource(null)}
        />
      )}
    </div>
  )
}
