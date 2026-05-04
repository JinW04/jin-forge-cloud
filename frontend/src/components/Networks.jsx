const VNETS = [
  {
    name: 'vnet-hub-core',
    addressSpace: '10.10.0.0/16',
    subnets: 6,
    subnetList: ['GatewaySubnet', 'AzureFirewallSubnet', 'mgmt', 'shared', 'dns', 'bastion'],
    ddos: 'Enabled',
    region: 'East US',
  },
  {
    name: 'vnet-prod-eastus',
    addressSpace: '10.0.0.0/16',
    subnets: 4,
    subnetList: ['web-tier', 'app-tier', 'data-tier', 'dmz'],
    ddos: 'Enabled',
    region: 'East US',
  },
  {
    name: 'vnet-staging-eu',
    addressSpace: '10.1.0.0/16',
    subnets: 3,
    subnetList: ['frontend', 'backend', 'storage'],
    ddos: 'Enabled',
    region: 'North Europe',
  },
  {
    name: 'vnet-dev-westus',
    addressSpace: '172.16.0.0/12',
    subnets: 2,
    subnetList: ['dev-workloads', 'dev-data'],
    ddos: 'Disabled',
    region: 'West US',
  },
  {
    name: 'vnet-spoke-asia',
    addressSpace: '192.168.0.0/24',
    subnets: 1,
    subnetList: ['workloads'],
    ddos: 'Disabled',
    region: 'Southeast Asia',
  },
]

const DDOS_STYLES = {
  Enabled:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.15)]',
  Disabled: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const DDOS_DOT = {
  Enabled:  'bg-emerald-400',
  Disabled: 'bg-amber-400',
}

// Simple inline SVG network topology placeholder
function NetworkMap() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden relative flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-sm">hub</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
          Network Topology
        </span>
      </div>

      {/* Map area */}
      <div className="relative flex-1 min-h-[340px] flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #a3c9ff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG topology diagram */}
        <svg
          viewBox="0 0 300 220"
          className="w-full max-w-[300px] relative z-10"
          aria-hidden="true"
        >
          {/* Connection lines */}
          <line x1="150" y1="50"  x2="60"  y2="130" stroke="#a3c9ff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
          <line x1="150" y1="50"  x2="150" y2="130" stroke="#a3c9ff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
          <line x1="150" y1="50"  x2="240" y2="130" stroke="#a3c9ff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
          <line x1="60"  y1="130" x2="60"  y2="190" stroke="#89ceff" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4" />
          <line x1="240" y1="130" x2="240" y2="190" stroke="#89ceff" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4" />

          {/* Hub node */}
          <circle cx="150" cy="50" r="22" fill="#0078d4" fillOpacity="0.15" stroke="#0078d4" strokeWidth="1.5" />
          <circle cx="150" cy="50" r="6"  fill="#a3c9ff" />
          <text x="150" y="82" textAnchor="middle" fill="#a3c9ff" fontSize="8" fontFamily="Inter" opacity="0.8">hub-core</text>

          {/* Spoke nodes */}
          <circle cx="60"  cy="130" r="16" fill="#007eb4" fillOpacity="0.12" stroke="#007eb4" strokeWidth="1.2" />
          <circle cx="60"  cy="130" r="5"  fill="#89ceff" />
          <text x="60"  y="155" textAnchor="middle" fill="#89ceff" fontSize="7" fontFamily="Inter" opacity="0.7">prod</text>

          <circle cx="150" cy="130" r="16" fill="#007eb4" fillOpacity="0.12" stroke="#007eb4" strokeWidth="1.2" />
          <circle cx="150" cy="130" r="5"  fill="#89ceff" />
          <text x="150" y="155" textAnchor="middle" fill="#89ceff" fontSize="7" fontFamily="Inter" opacity="0.7">staging</text>

          <circle cx="240" cy="130" r="16" fill="#007eb4" fillOpacity="0.12" stroke="#007eb4" strokeWidth="1.2" />
          <circle cx="240" cy="130" r="5"  fill="#89ceff" />
          <text x="240" y="155" textAnchor="middle" fill="#89ceff" fontSize="7" fontFamily="Inter" opacity="0.7">dev</text>

          {/* Leaf nodes */}
          <circle cx="60"  cy="190" r="10" fill="#3e495d" fillOpacity="0.6" stroke="#404752" strokeWidth="1" />
          <circle cx="60"  cy="190" r="3.5" fill="#c0c7d4" />

          <circle cx="240" cy="190" r="10" fill="#3e495d" fillOpacity="0.6" stroke="#404752" strokeWidth="1" />
          <circle cx="240" cy="190" r="3.5" fill="#c0c7d4" />
        </svg>

        {/* Overlay label */}
        <div className="relative z-10 mt-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60">
            Visual Network Topology
          </p>
          <p className="text-xs text-on-surface-variant mt-1 italic">coming soon</p>
        </div>

        {/* Corner glow */}
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
      </div>

      {/* Legend */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Spoke</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-on-surface-variant/40" />
          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Leaf</span>
        </div>
      </div>
    </div>
  )
}

export default function Networks() {
  const enabledCount  = VNETS.filter(v => v.ddos === 'Enabled').length
  const totalSubnets  = VNETS.reduce((sum, v) => sum + v.subnets, 0)

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-2">
          Networks
        </h2>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          Virtual networks, address spaces, and DDoS protection across all regions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Virtual Networks</p>
          <p className="text-3xl font-black text-on-surface">{VNETS.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Total Subnets</p>
          <p className="text-3xl font-black text-on-surface">{totalSubnets}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">DDoS Protected</p>
          <p className="text-3xl font-black text-emerald-400">{enabledCount}</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* VNET table */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold font-headline text-on-surface">Virtual Networks</h3>
          </div>
          <div className="bg-surface-container-low rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">VNET Name</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Address Space</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Subnets</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">DDoS Protection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {VNETS.map(({ name, addressSpace, subnets, subnetList, ddos, region }) => (
                  <tr key={name} className="hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>hub</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-on-surface">{name}</p>
                          <p className="text-[10px] text-on-surface-variant mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>location_on</span>
                            {region}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-on-surface">{addressSpace}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-on-surface">{subnets}</span>
                        <div className="hidden group-hover:flex flex-wrap gap-1 max-w-[160px]">
                          {subnetList.slice(0, 3).map(s => (
                            <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono">
                              {s}
                            </span>
                          ))}
                          {subnetList.length > 3 && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                              +{subnetList.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${DDOS_STYLES[ddos]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${DDOS_DOT[ddos]}`} />
                        {ddos}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[10px] text-on-surface-variant uppercase tracking-widest">
            {VNETS.length} virtual networks across {new Set(VNETS.map(v => v.region)).size} regions
          </p>
        </div>

        {/* Network map */}
        <div className="lg:col-span-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold font-headline text-on-surface">Network Map</h3>
          </div>
          <NetworkMap />
        </div>
      </div>
    </div>
  )
}
