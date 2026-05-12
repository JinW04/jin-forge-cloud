import { useLog } from '../context/LogContext'

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

export default function Logs() {
  const { logs } = useLog()

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
          <p className="text-3xl font-black text-on-surface">{logs.length}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Provisions</p>
          <p className="text-3xl font-black text-primary">
            {logs.filter(l => l.event === 'PROVISION_DONE').length}
          </p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Access Denied</p>
          <p className="text-3xl font-black text-error">
            {logs.filter(l => l.event === 'ACCESS_DENIED').length}
          </p>
        </div>
        <div className="bg-surface-container-low rounded-xl px-6 py-5 border border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-1">Policy Events</p>
          <p className="text-3xl font-black text-amber-400">
            {logs.filter(l => l.event === 'POLICY_APPLIED').length}
          </p>
        </div>
      </div>

      {/* Terminal window */}
      <div className="bg-[#060e20] rounded-xl overflow-hidden border border-outline-variant/15 shadow-[0_0_40px_rgba(163,201,255,0.04)]">

        {/* Terminal title bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface-container-high border-b border-white/5">
          <div className="flex items-center gap-2">
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
          <p className="text-[12px] text-emerald-400/60 mb-4 select-none">
            $ tail -f /var/log/cloudops/activity.log
          </p>

          {logs.map((entry, i) => {
            const style = EVENT_STYLES[entry.event] ?? { color: 'text-on-surface-variant', bg: 'bg-surface-container border-outline-variant/20' }
            return (
              <div
                key={i}
                className="flex items-start gap-3 py-1.5 px-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
              >
                <span className="text-[11px] text-on-surface-variant/40 flex-shrink-0 pt-[1px] select-none">
                  {entry.ts}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold tracking-widest flex-shrink-0 ${style.bg} ${style.color}`}>
                  {entry.event}
                </span>
                <span className="text-[11px] text-on-surface-variant/70 flex-shrink-0 min-w-[160px]">
                  {entry.user}
                </span>
                <span className="text-[11px] text-on-surface/80 leading-relaxed">
                  {entry.msg}
                </span>
              </div>
            )
          })}

          {/* Blinking cursor */}
          <div className="flex items-center gap-3 py-1.5 px-3 mt-2">
            <span className="text-[11px] text-on-surface-variant/40 select-none">
              {logs[logs.length - 1]?.ts.split(' ')[0]} —
            </span>
            <span className="text-emerald-400/60 text-[12px]">$</span>
            <span className="w-2 h-4 bg-primary/70 animate-pulse rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
