import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Activity, Zap } from 'lucide-react';

export default function PasswordEntropyCalculator() {
  const [passphrase, setPassphrase] = useState('Cipherly#Vault2026!Secured');

  const calculateEntropy = (str) => {
    if (!str) return 0;
    let poolSize = 0;
    if (/[a-z]/.test(str)) poolSize += 26;
    if (/[A-Z]/.test(str)) poolSize += 26;
    if (/[0-9]/.test(str)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(str)) poolSize += 32;

    const entropy = Math.floor(str.length * Math.log2(poolSize || 1));
    return entropy;
  };

  const entropy = calculateEntropy(passphrase);

  const getStrength = (bits) => {
    if (bits < 40) return { label: 'Weak', color: 'text-rose-400 border-rose-500/30', bg: 'bg-rose-500', time: 'Instant (< 1s)' };
    if (bits < 65) return { label: 'Moderate', color: 'text-amber-400 border-amber-500/30', bg: 'bg-amber-500', time: '~3 Days' };
    if (bits < 90) return { label: 'Strong', color: 'text-emerald-400 border-emerald-500/30', bg: 'bg-emerald-500', time: '~1,400 Years' };
    return { label: 'Quantum-Resistant', color: 'text-amber-300 border-amber-400/40', bg: 'bg-amber-400', time: '10^18 Trillion Years' };
  };

  const strength = getStrength(entropy);

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-dark-800 border border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-amber-400" />
          <h3 className="text-base sm:text-lg font-bold text-slate-100">Entropy & Brute-Force Estimator</h3>
        </div>
        <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-full border ${strength.color}`}>
          {strength.label}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">Test Passphrase Entropy</label>
          <input
            type="text"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Meter Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Entropy: {entropy} Bits</span>
            <span>Target: 128+ Bits</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 ${strength.bg}`}
              style={{ width: `${Math.min(100, (entropy / 128) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <span className="block text-[11px] font-mono text-slate-500">Supercomputer Time</span>
          <span className="text-xs font-mono font-semibold text-slate-200">{strength.time}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <span className="block text-[11px] font-mono text-slate-500">PBKDF2 Iterations</span>
          <span className="text-xs font-mono font-semibold text-amber-400">100,000 Rounds</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <span className="block text-[11px] font-mono text-slate-500">Key Derivation Time</span>
          <span className="text-xs font-mono font-semibold text-emerald-400">~180ms (Hardened)</span>
        </div>
      </div>
    </div>
  );
}
