import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { useApp } from '../context/AppContext';
import { BookOpen, Shield, Key, Cpu, EyeOff, Terminal, Copy, Check, Puzzle, Zap, Lock, AlertTriangle } from 'lucide-react';

export default function DocsPage() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(null);

  const sections = [
    { id: 'overview', name: '1. Architecture & Threat Model', icon: Shield },
    { id: 'vault', name: '2. AES-256-GCM & PBKDF2 Engine', icon: Lock },
    { id: 'asymmetric', name: '3. RSA-4096 Asymmetric E2EE & Signatures', icon: Key },
    { id: 'shamir', name: "4. Shamir's Secret Sharing (GF(256))", icon: Puzzle },
    { id: 'steganography', name: '5. WAV Audio & Image Steganography', icon: EyeOff },
    { id: 'shredder', name: '6. DoD 5220.22-M Shredder & Duress Vault', icon: Zap },
  ];

  const copySnippet = (code, label) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    addToast(`Copied ${label} snippet to clipboard`, 'info');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <SecurityBadge text="Official Documentation • Zero-Trust Specification" variant="amber" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Cipherly <span className="text-gradient-amber">Technical Documentation</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Complete cryptographic reference covering Cipherly’s zero-trust storage paradigms, asymmetric identity exchange, threshold secret splitting, and secure data destruction.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold px-2">Table of Contents</span>
          <div className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono font-medium flex items-center gap-3 transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-dark-800 border border-slate-800 space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Shield className="w-6 h-6 text-amber-400" />
                <span>Zero-Trust Architecture & Threat Model</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Cipherly assumes an adversarial computing environment where networks, operating system clipboards, and file storage may be monitored. All operations are isolated client-side with zero telemetry and zero cloud dependencies.
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold font-mono text-amber-400 uppercase">Core Guarantees</h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Zero Key Retention:</strong> Master key derivation occurs dynamically in ephemeral RAM. Keys are never written to disk unencrypted.</li>
                  <li><strong>Zero Network Leakage:</strong> No telemetry, analytics, ping-backs, or third-party SDKs are embedded in the app.</li>
                  <li><strong>Memory Isolation:</strong> Auto-lock timer and clipboard auto-wipe automatically sanitize sensitive data after 30 seconds.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Lock className="w-6 h-6 text-amber-400" />
                <span>AES-256-GCM & PBKDF2 Key Hardening</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Vault items, sensitive credentials, notes, and encrypted files are protected using NIST-approved <strong>AES-256-GCM (Galois/Counter Mode)</strong> authenticated encryption with a 96-bit initialization vector and 128-bit authentication tag.
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                <p className="text-amber-400 font-bold">Key Derivation Specification:</p>
                <p>• Algorithm: PBKDF2 (Password-Based Key Derivation Function 2)</p>
                <p>• HMAC Digest: SHA-256</p>
                <p>• Iteration Count: 100,000 Rounds</p>
                <p>• Salt: 128-bit CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)</p>
              </div>
            </div>
          )}

          {activeTab === 'asymmetric' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Key className="w-6 h-6 text-amber-400" />
                <span>RSA-OAEP 4096-bit Asymmetric E2EE & Digital Signatures</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Communicate confidentially with trusted contacts without registering accounts or relying on intermediary messaging servers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 font-mono">E2EE Encryption</h4>
                  <p className="text-xs text-slate-400">
                    4096-bit RSA-OAEP with SHA-256 digest allows sending encrypted payloads that only the recipient's private key can decrypt.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 font-mono">Detached Signatures</h4>
                  <p className="text-xs text-slate-400">
                    RSA-PSS / PKCS#1 v1.5 detached digital signatures verify authenticity and tamper-resistance of plain text or binary files.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shamir' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Puzzle className="w-6 h-6 text-amber-400" />
                <span>Shamir's Secret Sharing (M-of-N Threshold Quorum)</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Protect catastrophic recovery seeds and master keys by splitting them into <code className="text-amber-400 font-mono">N</code> independent shares such that any <code className="text-amber-400 font-mono">M</code> threshold shares can reconstruct the secret, but <code className="text-amber-400 font-mono">M - 1</code> shares reveal zero bits of information.
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
                <p className="text-amber-400 font-bold">Mathematical Formulation:</p>
                <p>Polynomial evaluated over finite Galois Field GF(256):</p>
                <p className="text-amber-300 font-bold">f(x) = S + a1x + a2x² + ... + a??1x??¹ (mod P(x))</p>
                <p className="text-slate-400 text-[11px] pt-1">Lagrange interpolation reconstructs constant term f(0) = S when quorum is reached.</p>
              </div>
            </div>
          )}

          {activeTab === 'steganography' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <EyeOff className="w-6 h-6 text-amber-400" />
                <span>WAV Audio & Pixel Steganography</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Hide high-entropy encrypted payloads directly inside innocent media carriers to bypass deep packet inspection (DPI) and physical searches.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-amber-400 font-mono">1. Uncompressed 16-bit PCM WAV Carrier</h4>
                  <p className="text-xs text-slate-400">
                    Embeds encrypted byte streams in the Least Significant Bits (LSB) of audio sample frames without audible distortion or artifact frequency peaks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-amber-400 font-mono">2. Spatial PNG / WebP Pixel Canvas Carrier</h4>
                  <p className="text-xs text-slate-400">
                    Modulates the lowest bit planes of RGBA color channels with header integrity markers and AES-GCM payloads.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shredder' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Zap className="w-6 h-6 text-rose-400" />
                <span>DoD 5220.22-M Multi-Pass Shredder & Decoy Duress Vault</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Securely purge confidential files from physical media and protect against physical coercion with panic triggers.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-rose-400 font-mono">DoD 5220.22-M Sanitization</h4>
                  <p className="text-xs text-slate-400">
                    Overwrites raw disk sectors with random bytes, 0xFF complement, and pseudorandom entropy before truncating file length to zero and unlinking.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-rose-400 font-mono">Decoy Duress Password</h4>
                  <p className="text-xs text-slate-400">
                    Entering a secondary decoy password displays a realistic fake vault with innocuous files while keeping the primary master vault invisible.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
