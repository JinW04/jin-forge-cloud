const FIREWALL_RULES = [
  { name: 'allow-https-inbound',   protocol: 'TCP', port: '443',  action: 'Allow' },
  { name: 'allow-http-redirect',   protocol: 'TCP', port: '80',   action: 'Allow' },
  { name: 'allow-ssh-bastion',     protocol: 'TCP', port: '22',   action: 'Allow' },
  { name: 'allow-rdp-internal',    protocol: 'TCP', port: '3389', action: 'Allow' },
  { name: 'allow-dns-outbound',    protocol: 'UDP', port: '53',   action: 'Allow' },
  { name: 'allow-sql-internal',    protocol: 'TCP', port: '1433', action: 'Allow' },
  { name: 'deny-telnet',           protocol: 'TCP', port: '23',   action: 'Deny'  },
  { name: 'deny-all-inbound',      protocol: 'ANY', port: '*',    action: 'Deny'  },
]

const IAM = [
  { name: 'jin@corp.local',              type: 'user', role: 'Platform Admin',   lastActive: '2 min ago'  },
  { name: 'sp-terraform-ci',             type: 'sp',   role: 'Contributor',      lastActive: '1 hr ago'   },
  { name: 'devops-team-sp',              type: 'sp',   role: 'Reader',           lastActive: '3 hrs ago'  },
  { name: 'security-audit-bot',          type: 'bot',  role: 'Security Reader',  lastActive: '12 hrs ago' },
]

const ACTION_STYLES = {
  Allow: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Deny:  'bg-error-container/20 text-error border-error/20',
}
const ACTION_DOT = {
  Allow: 'bg-emerald-400',
  Deny:  'bg-error',
}

const ROLE_STYLES = {
  'Platform Admin':   'bg-primary/10 text-primary border-primary/20',
  'Contributor':      'bg-tertiary/10 text-tertiary border-tertiary/20',
  'Reader':           'bg-secondary/10 text-secondary border-secondary/20',
  'Security Reader':  'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const PRINCIPAL_ICONS = { user: 'person', sp: 'deployed_code', bot: 'smart_toy' }

export default function Security() {
  const allowCount = FIREWALL_RULES.filter(r => r.action === 'Allow').length
  const denyCount  = FIREWALL_RULES.filter(r => r.action === 'Deny').length

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-2">Security</h2>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          Firewall policies, identity roles, and access controls across your platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Total Rules</p>
          <p className="text-3xl font-black text-on-surface">{FIREWALL_RULES.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Allow Rules</p>
          <p className="text-3xl font-black text-emerald-400">{allowCount}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Deny Rules</p>
          <p className="text-3xl font-black text-error">{denyCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Firewall rules table */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xl font-bold font-headline text-on-surface">Firewall Rules</h3>
          <div className="bg-surface-container-low rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Rule Name</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Protocol</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Port</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {FIREWALL_RULES.map(({ name, protocol, port, action }) => (
                  <tr key={name} className="hover:bg-white/5 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-primary" style={{ fontSize: '15px' }}>
                            {action === 'Allow' ? 'check_circle' : 'block'}
                          </span>
                        </div>
                        <span className="font-mono text-sm text-on-surface">{name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono text-[11px] font-bold">
                        {protocol}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-on-surface">{port}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${ACTION_STYLES[action]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${ACTION_DOT[action]}`} />
                        {action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Identity & Access */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xl font-bold font-headline text-on-surface">Identity &amp; Access</h3>
          <div className="bg-surface-container-low rounded-xl overflow-hidden">
            {/* Panel header */}
            <div className="bg-surface-container-high px-6 py-4 flex items-center gap-2 border-b border-white/5">
              <span className="material-symbols-outlined text-primary text-sm">manage_accounts</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                {IAM.length} Principals
              </span>
            </div>
            <ul className="divide-y divide-white/5">
              {IAM.map(({ name, type, role, lastActive }) => (
                <li key={name} className="px-6 py-4 hover:bg-white/5 transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>
                      {PRINCIPAL_ICONS[type]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-on-surface truncate">{name}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${ROLE_STYLES[role]}`}>
                        {role}
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>schedule</span>
                      {lastActive}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
