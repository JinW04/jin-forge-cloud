import { createContext, useContext, useState } from 'react'

const INITIAL_LOGS = [
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

const LogContext = createContext(null)

export function LogProvider({ children }) {
  const [logs, setLogs] = useState(INITIAL_LOGS)

  function addLog({ event, user, msg }) {
    const now = new Date()
    const ts = now.toISOString().replace('T', ' ').slice(0, 19)
    setLogs(prev => [...prev, { ts, event, user, msg }])
  }

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  )
}

export function useLog() {
  return useContext(LogContext)
}
