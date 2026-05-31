import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email,    setEmail]    = useState('test@jindemo.com')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [toast,    setToast]    = useState('')

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 5000)
    return () => clearTimeout(t)
  }, [toast])

  async function handleSignIn(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    }
    // On success, App.jsx's onAuthStateChange fires and routes to Dashboard automatically

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex items-center justify-center p-6 ethereal-bg">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] pointer-events-none -z-0" />

      <main className="w-full max-w-[480px] z-10">
        <div className="glass-card rounded-[0.75rem] p-10 flex flex-col items-center space-y-6 shadow-[0px_40px_60px_-15px_rgba(218,226,253,0.08)] border border-outline-variant/10">

          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_25px_rgba(0,120,212,0.4)]">
              <span className="material-symbols-outlined text-on-primary-container text-4xl">
                rocket_launch
              </span>
            </div>
            <h1 className="font-headline font-extrabold text-3xl tracking-tighter text-on-surface text-center">
              Jin&apos;s cloud service
            </h1>
          </div>

          <p className="text-on-surface-variant text-center leading-relaxed font-normal px-4">
            Sign in with your corporate account to provision and manage cloud infrastructure.
          </p>

          {toast && (
            <div className="w-full rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-400 flex-shrink-0 mt-0.5" style={{ fontSize: '18px' }}>info</span>
              <p className="text-sm text-amber-400/90">{toast}</p>
            </div>
          )}

          {/* Microsoft SSO button — disabled in demo */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setToast('Enterprise SSO is disabled in this demo environment. Please use the demo credentials below.')}
              className="w-full flex items-center justify-center space-x-3 bg-surface-container-low border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/50 py-3.5 px-6 rounded-xl font-headline font-bold text-sm tracking-tight cursor-pointer transition-all"
            >
              <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
              </svg>
              <span>Sign in with Microsoft Entra ID</span>
            </button>
          </div>

          <div className="w-full flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant/20" />
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 font-label">or use demo account</span>
            <div className="flex-1 h-px bg-outline-variant/20" />
          </div>

          <form onSubmit={handleSignIn} className="w-full space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all outline-none placeholder:text-outline-variant disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant font-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-on-surface transition-all outline-none placeholder:text-outline-variant disabled:opacity-50"
              />
            </div>

            {error && (
              <p className="text-sm text-error text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glow-button w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container py-4 px-6 rounded-xl font-headline font-bold text-sm tracking-tight cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin flex-shrink-0" />
                  Signing in…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="w-full pt-2">
            <div className="bg-surface-container-lowest/50 rounded-xl p-4 border-t border-white/5 flex items-center justify-center">
              <div className="flex items-center space-x-3 opacity-60">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '14px' }}>
                  verified_user
                </span>
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface">
                  Secure Enterprise Provisioning
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="group flex items-center space-x-2 text-on-surface/40 hover:text-primary transition-colors duration-300"
          >
            <span className="text-[10px] font-label uppercase tracking-widest">
              Contact IT Support
            </span>
            <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform" style={{ fontSize: '12px' }}>
              arrow_forward
            </span>
          </a>
        </div>
      </main>
    </div>
  )
}
