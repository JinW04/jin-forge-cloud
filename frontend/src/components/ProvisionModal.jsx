import { useState } from 'react'

const RESOURCE_TYPES = [
  'Virtual Machine',
  'PostgreSQL DB',
  'Kubernetes Cluster',
  'Azure Web App',
  'Storage Account',
]

const REGIONS = [
  'Norway East',
  'West Europe',
  'East US',
  'East US 2',
  'Southeast Asia',
  'North Europe',
  'West US',
]

export default function ProvisionModal({ onClose, onDeploy }) {
  const [name,      setName]      = useState('')
  const [type,      setType]      = useState(RESOURCE_TYPES[0])
  const [region,    setRegion]    = useState(REGIONS[0])
  const [deploying, setDeploying] = useState(false)

  function handleDeploy() {
    if (!name.trim()) return
    setDeploying(true)
    setTimeout(() => {
      const now  = new Date()
      const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      onDeploy({ name: name.trim(), type, region, status: 'DEPLOYING', date })
      onClose()
    }, 2000)
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget && !deploying) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6, 14, 32, 0.85)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdropClick}
    >
      <div className="glass-card w-full max-w-md rounded-xl border border-outline-variant/20 shadow-[0_0_60px_rgba(0,120,212,0.18)] overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex items-start justify-between border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>rocket_launch</span>
              </div>
              <h2 className="text-xl font-black font-headline tracking-tight text-on-surface">New Provision</h2>
            </div>
            <p className="text-sm text-on-surface-variant mt-1">
              Configure and deploy a new cloud resource.
            </p>
          </div>
          {!deploying && (
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface transition-colors p-1 cursor-pointer -mt-1 -mr-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-5">

          {/* Resource Name */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
              Resource Name
            </label>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all outline-none placeholder:text-outline-variant disabled:opacity-50"
              placeholder="e.g. prod-api-server"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={deploying}
              autoFocus
            />
          </div>

          {/* Resource Type */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
              Resource Type
            </label>
            <select
              className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all appearance-none outline-none cursor-pointer disabled:opacity-50"
              value={type}
              onChange={e => setType(e.target.value)}
              disabled={deploying}
            >
              {RESOURCE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
              Region
            </label>
            <select
              className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all appearance-none outline-none cursor-pointer disabled:opacity-50"
              value={region}
              onChange={e => setRegion(e.target.value)}
              disabled={deploying}
            >
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-3">
          <button
            onClick={onClose}
            disabled={deploying}
            className="flex-1 py-3 border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/50 rounded-xl text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-0 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeploy}
            disabled={deploying || !name.trim()}
            className="flex-[2] glow-button py-3 bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
          >
            {deploying ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin flex-shrink-0" />
                Deploying...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>rocket_launch</span>
                Deploy
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
