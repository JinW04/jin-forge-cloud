export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex items-center justify-center p-6 ethereal-bg">
      {/* Decorative background glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] pointer-events-none -z-0" />

      <main className="w-full max-w-[480px] z-10">
        {/* Glass card */}
        <div className="glass-card rounded-[0.75rem] p-10 flex flex-col items-center space-y-8 shadow-[0px_40px_60px_-15px_rgba(218,226,253,0.08)] border border-outline-variant/10">

          {/* Logo + title */}
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

          {/* Description */}
          <p className="text-on-surface-variant text-center leading-relaxed font-normal px-4">
            Sign in with your corporate account to provision and manage cloud infrastructure.
          </p>

          {/* SSO button */}
          <div className="w-full pt-4">
            <button onClick={onLogin} className="glow-button w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container py-4 px-6 rounded-xl font-headline font-bold text-base tracking-tight cursor-pointer">
              <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
              </svg>
              <span>Sign in with Microsoft Entra ID</span>
            </button>
          </div>

          {/* Security badge */}
          <div className="w-full pt-4">
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

        {/* Footer link */}
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
  );
}
