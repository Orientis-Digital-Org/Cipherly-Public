import React from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { Shield, Lock, EyeOff, Server, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <SecurityBadge text="Zero-Knowledge Architecture" variant="amber" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy <span className="text-gradient-amber">Policy</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Cipherly is built on the principle of local cryptographic sovereignty. Your keys, passwords, and plaintext files never leave your device.
        </p>
        <div className="text-xs font-mono text-slate-500">
          LAST UPDATED: SEPTEMBER 2026 // ORIENTIS DIGITAL LEGAL &amp; SECURITY
        </div>
      </div>

      {/* Core Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-dark-800/80 border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Local-First Execution</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All encryption, key derivation, and file shredding algorithms run entirely within your local browser runtime memory (RAM) or native binary sandbox.
          </p>
        </div>

        <div className="rounded-2xl bg-dark-800/80 border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">Zero Telemetry</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cipherly contains no behavioral analytics, error trackers, fingerprinting libraries, or cross-site tracking beacons.
          </p>
        </div>

        <div className="rounded-2xl bg-dark-800/80 border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">No Cloud Storage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cipherly has no centralized server database storing user passwords, encryption keys, or payload files.
          </p>
        </div>
      </div>

      {/* Main Legal Clauses */}
      <div className="rounded-3xl bg-dark-800/60 border border-slate-800 p-8 sm:p-10 space-y-8 text-slate-300 text-sm leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 1. Scope &amp; Architecture
          </h2>
          <p>
            This Privacy Policy outlines how Orientis Digital (&ldquo;Orientis&rdquo;, &ldquo;we&rdquo;) treats data when you access the Cipherly public web portal (<code className="text-amber-300 font-mono text-xs">cipherly.orientisdigital.com</code>) or download Cipherly desktop and mobile binaries.
          </p>
          <p>
            Cipherly is engineered as a zero-trust cryptographic suite. Unlike conventional cloud services, Cipherly cannot decrypt, inspect, intercept, or restore your confidential data.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 2. Browser Tools &amp; Memory Isolation
          </h2>
          <p>
            When utilizing the Web Cryptographic Suite (such as AES-256 simulators, Shamir secret splitters, password entropy evaluators, and pixel steganography tools):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
            <li>Payloads and files processed in the browser remain strictly in volatile RAM.</li>
            <li>No data is cached in persistent storage, cookies, or IndexedDB.</li>
            <li>Refreshing or navigating away from the page instantly wipes all plaintext traces from memory.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 3. Cookies &amp; Tracking Telemetry
          </h2>
          <p>
            Cipherly uses <strong className="text-white">zero tracking cookies</strong> and <strong className="text-white">zero analytical beacons</strong>. We do not use Google Analytics, Meta Pixel, or any third-party behavioral profiling scripts.
          </p>
          <p>
            Static hosting infrastructure (Cloudflare Pages) may process transient edge IP addresses strictly for DDoS mitigation and DNS routing in accordance with strict security standards.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 4. Statutory Compliance (RA 10173 &amp; GDPR)
          </h2>
          <p>
            Orientis Digital operates under the jurisdiction of the Republic of the Philippines and complies with Republic Act No. 10173 (Data Privacy Act of 2012) as well as global data privacy standards (GDPR, CCPA):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
            <li><strong className="text-slate-200">No Sale of Personal Data:</strong> We never sell, rent, or trade user data or metadata to third parties.</li>
            <li><strong className="text-slate-200">Data Subject Inquiries:</strong> Because Cipherly collects zero user account data, we hold no personal profiles to view, rectify, or purge. For inquiries regarding edge network logs or security advisories, contact our privacy officer.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Security &amp; Legal Inquiries
          </h2>
          <p className="text-slate-400">
            Orientis Digital // Tacloban City, Leyte, Philippines
          </p>
          <a
            href="mailto:orientisdigital.official@gmail.com"
            className="text-amber-400 hover:underline inline-block"
          >
            orientisdigital.official@gmail.com
          </a>
        </section>

      </div>
    </div>
  );
}
