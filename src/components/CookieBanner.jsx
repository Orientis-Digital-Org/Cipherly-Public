import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cipherly_privacy_acknowledged');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cipherly_privacy_acknowledged', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Privacy and Zero Telemetry Notice"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 rounded-2xl bg-[#0e131f] border border-amber-500/30 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-sans text-slate-300 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 font-mono text-xs uppercase text-amber-400 font-bold tracking-wider">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>ZERO-TELEMETRY GUARANTEE</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-4">
        Cipherly uses zero tracking cookies, zero analytics beacons, and stores zero cryptographic payloads on remote servers. All operations execute strictly in your browser RAM.
      </p>
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={handleDismiss}
          className="px-4 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-medium transition-colors cursor-pointer"
        >
          Acknowledge
        </button>
        <Link
          to="/privacy"
          onClick={() => setVisible(false)}
          className="text-xs font-mono text-slate-400 hover:text-amber-400 underline transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </aside>
  );
}
