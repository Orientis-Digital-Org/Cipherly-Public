import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { useApp } from '../context/AppContext';
import { Shield, Globe, Mail, Copy, Check, Lock, Terminal, Cpu, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { addToast } = useApp();
  const [copiedKey, setCopiedKey] = useState(false);

  const pgpKeyFingerprint = "7F3B 90EA 41CD 821B 9A40  E18F 55AC 992D 3E7B 8401";

  const copyPgp = () => {
    navigator.clipboard.writeText(pgpKeyFingerprint);
    setCopiedKey(true);
    addToast('Orientis Digital PGP Fingerprint copied', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <SecurityBadge text="Developed by Orientis Digital" variant="amber" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-gradient-amber">Cipherly</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Orientis Digital creates software for high-stakes privacy, local cryptographic sovereignty, and zero-compromise security engineering.
        </p>
      </div>

      {/* Corporate Branding Card */}
      <div className="rounded-3xl bg-dark-800 border border-slate-800 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/10">
          <img src="/orientis_logo.png" alt="Orientis Digital Logo" className="w-full h-full object-contain" />
        </div>
        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h2 className="text-xl font-bold text-white">Orientis Digital</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
              Zero-Trust Engineering Studio
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            We reject the modern trend of software depending on centralized cloud tracking, telemetry harvesting, and user fingerprinting. Cipherly is engineered from the ground up to operate in complete cryptographic isolation.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
            <a
              href="https://orientisdigital.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>orientisdigital.com</span>
            </a>
            <a
              href="mailto:orientisdigital.official@gmail.com"
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>orientisdigital.official@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-dark-800/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Telemetry Policy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No analytics, no ping-backs, no identifier beacons. Your private data, keys, and file contents stay exclusively in device memory.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-dark-800/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Fully Auditable Open Source</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All code is published openly under the MIT License on GitHub. Anyone can inspect every cryptographic line of code.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-dark-800/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Local-First Native Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Powered by Tauri v2 and high-speed native Rust with WebCrypto hardware acceleration on Windows, Android, and Linux.
          </p>
        </div>
      </div>

      {/* PGP Security Fingerprint Box */}
      <div className="p-6 md:p-8 rounded-2xl bg-dark-800 border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">Official Orientis Digital Security Key</h3>
          </div>
          <button
            onClick={copyPgp}
            className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 font-bold"
          >
            {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey ? 'Copied' : 'Copy Key Fingerprint'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 break-all select-all">
          {pgpKeyFingerprint}
        </div>
        <p className="text-xs text-slate-400">
          Use this fingerprint to verify cryptographic release checksums or send encrypted vulnerability reports.
        </p>
      </div>

    </div>
  );
}
