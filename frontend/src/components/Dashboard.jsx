import { useState } from 'react'
import { useResources } from '../context/ResourceContext'
import Resources from './Resources'
import Networks from './Networks'
import Security from './Security'
import Logs from './Logs'
import ProvisionModal from './ProvisionModal'

const NAV_LINKS = [
  { icon: 'dashboard',   label: 'Dashboard' },
  { icon: 'inventory_2', label: 'Resources' },
  { icon: 'hub',         label: 'Networks'  },
  { icon: 'security',    label: 'Security'  },
  { icon: 'terminal',    label: 'Logs'      },
]

const CAPABILITIES = [
  { icon: 'check_box', label: 'Azure CIS Benchmarks Check' },
  { icon: 'shield',    label: 'Zero Trust Security Defaults' },
  { icon: 'lock',      label: 'Automated Key Vault Secrets' },
]

// Matches the unified status values from ResourceContext
const STATUS_STYLES = {
  Running:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.15)]',
  Deploying: 'bg-primary/10 text-primary border-primary/20',
  Failed:    'bg-error-container/20 text-error border-error/20',
  Stopped:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const DOT_STYLES = {
  Running:   'bg-emerald-400',
  Deploying: 'bg-primary animate-pulse',
  Failed:    'bg-error',
  Stopped:   'bg-amber-400',
}

function DashboardContent({ onOpenModal }) {
  const { resources } = useResources()
  const recent = resources.slice(0, 5)
  const monthlyEstimate = (resources.reduce((sum, r) => sum + r.costHr, 0) * 730).toFixed(2)

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-2">
          Create a New Resource
        </h2>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          Instantly provision secure, compliant, and cost-optimized infrastructure in global regions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Provisioning form */}
          <div className="bg-surface-container-low p-8 rounded-xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">rocket</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
                  Project Name
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all outline-none"
                  placeholder="e.g. Project-X-2026"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
                  Environment
                </label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all appearance-none outline-none cursor-pointer">
                  <option>Development</option>
                  <option>Staging</option>
                  <option>Production</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
                Resource Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="group cursor-pointer bg-surface-container hover:bg-surface-container-high border border-primary rounded-xl p-5 transition-all flex flex-col items-center text-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-primary">cloud</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Azure Web App</p>
                    <p className="text-[10px] text-on-surface-variant uppercase mt-1">PaaS</p>
                  </div>
                </div>
                <div className="group cursor-pointer bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/10 rounded-xl p-5 transition-all flex flex-col items-center text-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">database</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">PostgreSQL</p>
                    <p className="text-[10px] text-on-surface-variant uppercase mt-1">Managed DB</p>
                  </div>
                </div>
                <div className="group cursor-pointer bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/10 rounded-xl p-5 transition-all flex flex-col items-center text-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">folder_data</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Storage Account</p>
                    <p className="text-[10px] text-on-surface-variant uppercase mt-1">Object Store</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
                Cost Center
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all outline-none"
                placeholder="Internal Billing ID"
                type="text"
              />
            </div>

            <button onClick={onOpenModal} className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_20px_rgba(163,201,255,0.3)] transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined">rocket_launch</span>
              PROVISION RESOURCE
            </button>
          </div>

          {/* Recent requests — live from global state */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-headline text-on-surface">Recent Requests</h3>
              <a href="#" className="text-xs uppercase tracking-widest font-bold text-primary hover:underline transition-all">
                View All History
              </a>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high">
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Resource Name</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Type</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Status</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recent.map(({ name, type, status, date }) => (
                    <tr key={name} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-sm">{name}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLES[status] ?? STATUS_STYLES.Deploying}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${DOT_STYLES[status] ?? DOT_STYLES.Deploying}`} />
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-high border-t-2 border-primary p-8 rounded-xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary font-headline">
                PLATFORM CAPABILITIES
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our system utilizes hardened, pre-configured Terraform modules with built-in compliance checks,
              ensuring immediate enterprise-grade readiness for your project.
            </p>
            <ul className="space-y-4">
              {CAPABILITIES.map(({ icon, label }) => (
                <li key={label} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">{icon}</span>
                  </div>
                  <span className="text-xs font-semibold text-on-surface">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden vending-slot">
            <div className="flex flex-col gap-2 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                Estimated Monthly Run
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-on-surface">${monthlyEstimate}</span>
                <span className="text-sm font-bold text-on-surface-variant">/mo</span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <div className="h-1 flex-1 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%]" />
              </div>
            </div>
            <p className="mt-3 text-[10px] text-on-surface-variant italic">
              Based on standard B-series compute profile.
            </p>
          </div>

          <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-low">
            <div className="w-full h-full bg-gradient-to-br from-[#171f33] via-[#0b1326] to-[#007eb4]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-primary/20 group-hover:text-primary/30 transition-colors duration-700">
                cloud_circle
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Architecture Preview</p>
              <p className="text-sm text-on-surface/80">View generated topology diagram after provisioning.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComingSoon({ label }) {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] text-center">
      <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">construction</span>
      <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight mb-2">{label}</h2>
      <p className="text-on-surface-variant text-sm">This section is coming soon.</p>
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [showModal, setShowModal] = useState(false)
  const { addResource } = useResources()

  function handleDeploy(newResource) {
    addResource(newResource)
    setActiveTab('Dashboard')
  }

  function renderContent() {
    if (activeTab === 'Dashboard') return <DashboardContent onOpenModal={() => setShowModal(true)} />
    if (activeTab === 'Resources') return <Resources />
    if (activeTab === 'Networks')  return <Networks />
    if (activeTab === 'Security')  return <Security />
    if (activeTab === 'Logs')      return <Logs />
    return <ComingSoon label={activeTab} />
  }

  return (
    <div
      className="flex min-h-screen text-on-surface font-body"
      style={{ background: 'radial-gradient(circle at top right, #171f33, #0b1326)' }}
    >
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full z-40 py-8 flex flex-col bg-[#131b2e] w-64 shadow-[40px_0_60px_rgba(218,226,253,0.08)]">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
            <h1 className="text-xl font-black tracking-tighter text-[#dae2fd] glow-primary">JIN-FORGE CLOUD</h1>
          </div>
          <p className="font-label uppercase tracking-widest text-[10px] font-medium text-[#dae2fd]/60">
            PERSONAL PROVISIONING HUB
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_LINKS.map(({ icon, label }) =>
            activeTab === label ? (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className="w-full flex items-center gap-3 bg-gradient-to-r from-[#a3c9ff] to-[#0078d4] text-white rounded-r-full py-3 px-6 transition-all duration-200 cursor-pointer"
              >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-label uppercase tracking-widest text-[10px] font-medium">{label}</span>
              </button>
            ) : (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className="w-full flex items-center gap-3 text-[#dae2fd]/70 py-3 px-6 hover:text-[#a3c9ff] hover:bg-[#171f33] transition-all duration-200 cursor-pointer"
              >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-label uppercase tracking-widest text-[10px] font-medium">{label}</span>
              </button>
            )
          )}
        </nav>

        <div className="mt-auto px-4 space-y-4">
          <button onClick={() => setShowModal(true)} className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-lg">add</span>
            New Provision
          </button>
          <div className="pt-4 border-t border-white/5">
            <a href="#" className="flex items-center gap-3 text-[#dae2fd]/70 py-2 px-4 hover:text-[#a3c9ff] transition-all text-[10px] uppercase tracking-widest font-medium">
              <span className="material-symbols-outlined text-sm">help_outline</span> Support
            </a>
            <a href="#" className="flex items-center gap-3 text-[#dae2fd]/70 py-2 px-4 hover:text-[#a3c9ff] transition-all text-[10px] uppercase tracking-widest font-medium">
              <span className="material-symbols-outlined text-sm">manage_accounts</span> Account
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 w-full h-16 bg-[#0b1326] border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold tracking-tight text-[#dae2fd] font-headline">
              Jin&apos;s cloud service
            </span>
            <div className="hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant/10 w-96">
              <span className="material-symbols-outlined text-outline text-lg">search</span>
              <input
                className="bg-transparent border-none outline-none text-sm text-on-surface w-full placeholder:text-outline-variant ml-2"
                placeholder="Search resources..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#dae2fd]/60 hover:bg-[#222a3d] rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <button className="p-2 text-[#dae2fd]/60 hover:bg-[#222a3d] rounded-full transition-colors relative cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button className="p-2 text-[#dae2fd]/60 hover:bg-[#222a3d] rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/20 flex items-center justify-center text-primary font-bold text-sm select-none">
              J
            </div>
          </div>
        </header>

        {renderContent()}

        <footer className="mt-auto py-8 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-xl">rocket_launch</span>
            <span className="text-sm font-bold text-on-surface/40 tracking-tighter">JIN-FORGE CLOUD © 2026</span>
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Compliance', 'API Docs'].map((link) => (
              <a key={link} href="#" className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </footer>
      </main>

      {showModal && (
        <ProvisionModal
          onClose={() => setShowModal(false)}
          onDeploy={handleDeploy}
        />
      )}
    </div>
  )
}
