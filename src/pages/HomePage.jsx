import React from 'react';
import { Link } from 'react-router-dom';
import SecurityBadge from '../components/SecurityBadge';
import PasswordEntropyCalculator from '../components/PasswordEntropyCalculator';
import EncryptionSimulator from '../components/EncryptionSimulator';
import { 
  Shield, Lock, Cpu, EyeOff, Zap, Download, CheckCircle2, 
  ArrowRight, Key, Layers, RefreshCw, AlertTriangle, ChevronRight, Terminal, Sparkles,
  Puzzle, FileText, Music, Hash, Smartphone, Monitor
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { latestVersion, latestBuild } = useApp();

  const features = [
    {
      icon: Shield,
      title: 'AES-256-GCM Hardware Vault',
      desc: 'NIST-standard authenticated encryption with zero-knowledge PBKDF2 (100k rounds) master key derivation.',
      color: 'text-amber-400',
      badge: 'Core Vault',
    },
    {
      icon: Key,
      title: 'RSA-OAEP 4096-bit E2EE Messenger',
      desc: 'Asymmetric contact key exchange and detached cryptographic digital message signatures without central servers.',
      color: 'text-amber-300',
      badge: 'Asymmetric',
    },
    {
      icon: Puzzle,
      title: "Shamir's Secret Sharing (M-of-N)",
      desc: 'Split critical master keys and recovery seeds into distributed threshold shares using finite Galois Field GF(256) polynomials.',
      color: 'text-emerald-400',
      badge: 'Threshold Quorum',
    },
    {
      icon: EyeOff,
      title: 'WAV & Image Steganography',
      desc: 'Conceal encrypted secret payloads inside innocent PNG/WebP images and 16-bit uncompressed PCM WAV audio waveforms.',
      color: 'text-amber-400',
      badge: 'Steganography',
    },
    {
      icon: Zap,
      title: 'DoD 5220.22-M File Sanitizer',
      desc: 'Permanently destroy sensitive files with multi-pass random byte overwrite and cryptographically wipe local file streams.',
      color: 'text-rose-400',
      badge: 'Destruction',
    },
    {
      icon: Terminal,
      title: 'Crypto Power Tools & Diceware',
      desc: 'EFF Diceware high-entropy passphrase generator, live multi-digest hash calculator (SHA-256/512/384/1), and 30s auto-clear clipboard guard.',
      color: 'text-yellow-400',
      badge: 'Power Utilities',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="inline-block">
            <SecurityBadge text="Zero-Trust Architecture • Pure Offline Cryptography" variant="amber" />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Zero-Trust Encryption. <br />
            <span className="text-gradient-amber">100% Offline Vault.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Cipherly is an open-source, local-first zero-trust encryption suite. Protect sensitive files, derive resilient cryptographic keys, split secret shares, and shred data with zero telemetry.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/downloads"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span>Download Cipherly v{latestVersion}</span>
            </Link>

            <Link
              to="/docs"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-dark-800 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition-all"
            >
              <FileText className="w-5 h-5" />
              <span>Explore Documentation</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800/80 space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold">01. ZERO TELEMETRY</span>
              <p className="text-xs text-slate-400">Zero tracking or analytics. Runs fully offline.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800/80 space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold">02. NATIVE TAURI v2</span>
              <p className="text-xs text-slate-400">High-performance Rust engine with WebCrypto.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800/80 space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold">03. MULTI-PLATFORM</span>
              <p className="text-xs text-slate-400">Native Windows, Android, and Linux support.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800/80 space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold">04. OPEN SOURCE</span>
              <p className="text-xs text-slate-400">MIT licensed and fully auditable on GitHub.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            Comprehensive Cryptographic Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Extreme Confidentiality
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every feature is executed locally in client memory with no intermediate server caching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-6 bg-dark-800/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4 relative group hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {f.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE SIMULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Interactive Testbed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Client-Side Web Crypto Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test live AES-GCM authenticated encryption and entropy calculations right in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EncryptionSimulator />
            <PasswordEntropyCalculator />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-gradient-to-b from-amber-500/10 via-dark-800/80 to-dark-900 border border-amber-500/30 p-8 sm:p-14 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto shadow-lg shadow-amber-500/20">
            <img src="/icon.png" alt="Cipherly" className="w-10 h-10 object-contain" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Take Control of Your Cryptographic Sovereignty
          </h2>

          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Available on Windows (Setup, Portable, MSI), Android Universal APK, and Linux standalone binaries.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/downloads"
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all"
            >
              Download Cipherly Free
            </Link>
            <a
              href="https://github.com/orientis-digital/Cipherly-Electron"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-xl bg-dark-800 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
