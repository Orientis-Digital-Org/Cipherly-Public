import React from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { AlertTriangle, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <SecurityBadge text="Legal & Terms of Use" variant="amber" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Terms of <span className="text-gradient-amber">Service</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Master terms of use, cryptographic software disclaimers, and MIT open-source licensing agreement for Cipherly.
        </p>
        <div className="text-xs font-mono text-slate-500">
          EFFECTIVE DATE: SEPTEMBER 2026 // ORIENTIS DIGITAL
        </div>
      </div>

      {/* Critical Disclaimer Callout */}
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 flex items-start gap-4">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <h3 className="font-bold text-amber-200 uppercase tracking-wider font-mono">
            Zero-Backdoor &amp; Key Sovereignty Disclaimer
          </h3>
          <p className="text-slate-300 leading-relaxed">
            Cipherly employs authentic client-side cryptography. If you lose your encryption passphrase, master salt, private key, or Shamir key shares, <strong className="text-white">recovery is mathematically impossible</strong>. Orientis Digital maintains no master backdoors and cannot restore lost data.
          </p>
        </div>
      </div>

      {/* Main Legal Sections */}
      <div className="rounded-3xl bg-dark-800/60 border border-slate-800 p-8 sm:p-10 space-y-8 text-slate-300 text-sm leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 1. Acceptance of Terms
          </h2>
          <p>
            By downloading, installing, compiling, or interacting with Cipherly software binaries, source code, or the public web tools at <code className="text-amber-300 font-mono text-xs">cipherly.orientisdigital.com</code>, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 2. Open-Source MIT License
          </h2>
          <p>
            Cipherly source code is distributed under the standard MIT License. You are granted permission, free of charge, to inspect, run, modify, merge, and distribute copies of the software, subject to including the original copyright notice.
          </p>
          <div className="p-4 rounded-xl bg-[#080b11] border border-slate-800 font-mono text-xs text-slate-400 leading-normal">
            &ldquo;THE SOFTWARE IS PROVIDED &apos;AS IS&apos;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.&rdquo;
          </div>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 3. Cryptographic Software &amp; Tool Disclaimers
          </h2>
          <p>
            Cipherly tools (including DoD 5220.22-M file shredding algorithms, steganographic embedders, AES-256-GCM containers, and Shamir Secret Sharing implementations) perform intensive data alterations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400 text-xs">
            <li><strong className="text-slate-200">File Shredding Irreversibility:</strong> Shredded files are overwritten with pseudo-random and zero-byte passes. Overwritten data cannot be recovered by forensic software. You assume sole responsibility for selecting file targets.</li>
            <li><strong className="text-slate-200">Key Custody:</strong> You are solely responsible for generating, safeguarding, and backing up your cryptographic credentials. Orientis Digital is not liable for data locked by forgotten passphrases.</li>
            <li><strong className="text-slate-200">Experimental Web Tools:</strong> Web-based cryptographic tools are provided for evaluation and operational convenience in modern sandboxed browsers. High-threat or air-gapped environments should utilize native, verified offline binaries.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 4. Limitation of Liability
          </h2>
          <p>
            In no event shall Orientis Digital, its engineers, or contributors be liable for any claim, damages, data loss, hardware failure, or business interruption arising from the use or inability to use the Cipherly application or website.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="text-amber-400">#</span> 5. Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of the Philippines. Any legal disputes arising in connection with Cipherly shall be subject to the exclusive jurisdiction of the competent courts of Tacloban City, Leyte, Philippines.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-800/80 pt-6 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Contact &amp; Legal Notices
          </h2>
          <p className="text-slate-400">
            Orientis Digital // Engineering HQ, Tacloban City, Philippines
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
