const EVENT_STYLES = {
  LOGIN:            { color: 'text-primary',      bg: 'bg-primary/10 border-primary/20'             },
  LOGOUT:           { color: 'text-secondary',    bg: 'bg-secondary/10 border-secondary/20'         },
  RESOURCE_CREATED: { color: 'text-emerald-400',  bg: 'bg-emerald-500/10 border-emerald-500/20'     },
  RESOURCE_DELETED: { color: 'text-error',        bg: 'bg-error-container/20 border-error/20'       },
  POLICY_APPLIED:   { color: 'text-amber-400',    bg: 'bg-amber-500/10 border-amber-500/20'         },
  FIREWALL_UPDATED: { color: 'text-tertiary',     bg: 'bg-tertiary/10 border-tertiary/20'           },
  ACCESS_GRANTED:   { color: 'text-emerald-400',  bg: 'bg-emerald-500/10 border-emerald-500/20'     },
  ACCESS_DENIED:    { color: 'text-error',        bg: 'bg-error-container/20 border-error/20'       },
  PROVISION_START:  { color: 'text-primary',      bg: 'bg-primary/10 border-primary/20'             },
  PROVISION_DONE:   { color: 'text-emerald-400',  bg: 'bg-emerald-500/10 border-emerald-500/20'     },
}

const LOGS = [
  { ts: '2026-10-25 09:41:02', event: 'LOGIN',            user: 'jin@corp.local',     msg: 'Interactive login via Microsoft Entra ID'          },
  { ts: '2026-10-25 09:42:17', event: 'PROVISION_START',  user: 'jin@corp.local',     msg: 'Initiated provisioning: web-portal-prod (East US)' },
  { ts: '2026-10-25 09:44:55', event: 'RESOURCE_CREATED', user: 'sp-terraform-ci',    msg: 'Azure Web App deployed: web-portal-prod'           },
  { ts: '2026-10-25 09:45:03', event: 'PROVISION_DONE',   user: 'sp-terraform-ci',    msg: 'Provisioning complete. State saved to remote.'     },
  { ts: '2026-10-25 09:45:10', event: 'POLICY_APPLIED',   user: 'sp-terraform-ci',    msg: 'Azure Policy: CIS Benchmark assigned to RG'        },
  { ts: '2026-10-25 10:02:33', event: 'ACCESS_GRANTED',   user: 'jin@corp.local',     msg: 'Contributor role assigned to devops-team-sp'       },
  { ts: '2026-10-25 11:18:44', event: 'FIREWALL_UPDATED', user: 'jin@corp.local',     msg: 'Rule added: allow-sql-internal TCP/1433'           },
  { ts: '2026-10-25 12:30:01', event: 'LOGIN',            user: 'security-audit-bot', msg: 'Service principal login for compliance scan'       },
  { ts: '2026-10-25 12:30:05', event: 'POLICY_APPLIED',   user: 'security-audit-bot', msg: 'Compliance report generated: 94% score'           },
  { ts: '2026-10-25 13:07:22', event: 'RESOURCE_CREATED', user: 'sp-terraform-ci',    msg: 'PostgreSQL instance deployed: analytics-db'        },
  { ts: '2026-10-25 14:15:09', event: 'ACCESS_DENIED',    user: 'unknown@external',   msg: 'Unauthorized API call blocked — 403 Forbidden'    },
  { ts: '2026-10-25 14:15:11', event: 'FIREWALL_UPDATED', user: 'security-audit-bot', msg: 'Auto-blocked IP: 185.220.101.47 (threat intel)'    },
  { ts: '2026-10-25 15:40:30', event: 'RESOURCE_DELETED', user: 'jin@corp.local',     msg: 'Deleted stale resource: vm-build-agent-03'         },
  { ts: '2026-10-25 16:22:14', event: 'PROVISION_START',  user: 'jin@corp.local',     msg: 'Initiated provisioning: web-portal-staging'        },
  { ts: '2026-10-25 16:25:01', event: 'PROVISION_DONE',   user: 'sp-terraform-ci',    msg: 'Provisioning complete. Deployment running.'        },
  { ts: '2026-10-25 17:00:00', event: 'LOGOUT',           user: 'security-audit-bot', msg: 'Session terminated after compliance scan'          },
  { ts: '2026-10-25 17:55:48', event: 'ACCESS_DENIED',    user: 'devops-team-sp',     msg: 'Write denied on prod subscription — read-only role'},
  { ts: '2026-10-25 18:01:12', event: 'LOGOUT',           user: 'jin@corp.local',     msg: 'Session ended'                                     },
]

export default function Logs() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-2">
          Activity Logs
        </h2>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          Real-time system event stream for all provisioning, access, and policy activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Total Events</p>
          <p className="text-3xl font-black text-on-surface">{LOGS.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Provisions</p>
          <p className="text-3xl font-black text-primary">
            {LOGS.filter(l => l.event === 'PROVISION_DONE').length}
          </p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Access Denied</p>
          <p className="text-3xl font-black text-error">
            {LOGS.filter(l => l.event === 'ACCESS_DENIED').length}
          </p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Policy Events</p>
          <p className="text-3xl font-black text-amber-400">
            {LOGS.filter(l => l.event === 'POLICY_APPLIED').length}
          </p>
        </div>
      </div>

      {/* Terminal window */}
      <div className="bg-[#060e20] rounded-xl overflow-hidden border border-outline-variant/15 shadow-[0_0_40px_rgba(163,201,255,0.04)]">

        {/* Terminal title bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface-container-high border-b border-white/5">
          <div className="flex items-center gap-2">
            {/* macOS-style traffic lights */}
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span
            className="text-[11px] text-on-surface-variant tracking-widest"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            cloudops — system-activity-log — bash
          </span>
          <div className="flex items-center gap-1.5 text-on-surface-variant/50">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>sync</span>
            <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              live
            </span>
          </div>
        </div>

        {/* Log output area */}
        <div
          className="p-6 space-y-1 max-h-[560px] overflow-y-auto"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {/* Static prompt line at top */}
          <p className="text-[12px] text-emerald-400/60 mb-4 select-none">
            $ tail -f /var/log/cloudops/activity.log
          </p>

          {LOGS.map((entry, i) => {
            const style = EVENT_STYLES[entry.event] ?? { color: 'text-on-surface-variant', bg: 'bg-surface-container border-outline-variant/20' }
            return (
              <div
                key={i}
                className="flex items-start gap-3 py-1.5 px-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
              >
                {/* Timestamp */}
                <span className="text-[11px] text-on-surface-variant/40 flex-shrink-0 pt-[1px] select-none">
                  {entry.ts}
                </span>

                {/* Event type badge */}
                <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold tracking-widest flex-shrink-0 ${style.bg} ${style.color}`}>
                  {entry.event}
                </span>

                {/* User */}
                <span className="text-[11px] text-on-surface-variant/70 flex-shrink-0 min-w-[160px]">
                  {entry.user}
                </span>

                {/* Message */}
                <span className="text-[11px] text-on-surface/80 leading-relaxed">
                  {entry.msg}
                </span>
              </div>
            )
          })}

          {/* Blinking cursor */}
          <div className="flex items-center gap-3 py-1.5 px-3 mt-2">
            <span className="text-[11px] text-on-surface-variant/40 select-none">
              {LOGS[LOGS.length - 1].ts.split(' ')[0]} 18:01:13
            </span>
            <span className="text-emerald-400/60 text-[12px]">$</span>
            <span className="w-2 h-4 bg-primary/70 animate-pulse rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
