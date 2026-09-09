import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#090b10] text-slate-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 p-1 flex items-center justify-center">
                <img src="/icon.png" alt="Cipherly" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Cipherly</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-Trust Encryption Suite &amp; Cryptographic Vault. Built for high-security operations, offline vaults, and paranoid data confidentiality.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero-Telemetry &amp; 100% Offline</span>
            </div>
          </div>

          {/* Column 2: Architecture & Specs */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 mb-4">Cryptographic Specs</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="hover:text-amber-400 transition-colors">AES-256-GCM Hardware Auth</li>
              <li className="hover:text-amber-400 transition-colors">RSA-OAEP 4096-bit &amp; Signatures</li>
              <li className="hover:text-amber-400 transition-colors">PBKDF2 (100,000 Key Rounds)</li>
              <li className="hover:text-amber-400 transition-colors">Shamir&apos;s Secret Sharing GF(256)</li>
              <li className="hover:text-amber-400 transition-colors">WAV &amp; Image Pixel Steganography</li>
              <li className="hover:text-amber-400 transition-colors">DoD 5220.22-M Multi-Pass Shred</li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/downloads" className="hover:text-amber-400 transition-colors">Downloads &amp; APKs</Link></li>
              <li><Link to="/docs" className="hover:text-amber-400 transition-colors">Documentation &amp; Whitepaper</Link></li>
              <li><Link to="/faq" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/announcements" className="hover:text-amber-400 transition-colors">Release Notes &amp; Updates</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Orientis Digital</Link></li>
              <li><Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 mb-4">Orientis Digital</h4>
            <div className="flex items-center gap-2 mb-3">
              <img src="/orientis_logo.png" alt="Orientis Digital" className="h-5 w-auto opacity-80" />
              <span className="text-xs font-medium text-slate-300">Engineering Studio</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Engineered with zero backdoors, zero telemetry, and pure local cryptographic isolation.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/orientis-digital/Cipherly-Electron"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:orientisdigital.official@gmail.com"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                title="Security Inquiries"
                aria-label="Security Inquiries"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://orientisdigital.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                title="Orientis Digital Official Site"
                aria-label="Orientis Digital Official Site"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Orientis Digital. All Rights Reserved. MIT Open Source License.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-slate-400 hover:text-amber-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-amber-400 transition-colors">Terms</Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Zero-Knowledge Guaranteed</span>
            <span className="text-slate-400">Tauri v2 Native Rust Backend</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
