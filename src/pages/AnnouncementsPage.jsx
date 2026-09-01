import React from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { Bell, Sparkles, ShieldCheck, Tag, Smartphone, Monitor } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AnnouncementsPage() {
  const { latestVersion, latestBuild } = useApp();

  const announcements = [
    {
      version: `v${latestVersion} (Build ${latestBuild})`,
      date: 'September 2026',
      title: 'Cipherly Multi-Platform Release & Android Universal APK',
      badge: 'Current Release',
      content: 'Shipped comprehensive mobile support with native Android universal release APKs (ARM64/v7a/x86_64), responsive safe-zone layouts, biometric vault unlock, and QR code key scanning alongside Windows 64-bit NSIS Setup, Portable, and MSI enterprise packages.',
    },
    {
      version: 'v0.0.1 (Build 2)',
      date: 'August 2026',
      title: 'Zero-Trust Suite Architecture & Shamir Quorum Release',
      badge: 'Core Feature',
      content: 'Introduced Shamir’s Secret Sharing over Galois Field GF(256), RSA-OAEP 4096-bit contact identity exchange, WAV audio carrier steganography, and DoD 5220.22-M multi-pass file shredder.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <SecurityBadge text="Release Notes & Security Bulletins" variant="amber" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Announcements & <span className="text-gradient-amber">Release Notes</span>
        </h1>
        <p className="text-slate-300 text-sm">
          Track official version releases, cryptographic enhancements, and security updates for Cipherly.
        </p>
      </div>

      <div className="space-y-6">
        {announcements.map((item, idx) => (
          <div key={idx} className="p-6 md:p-8 rounded-2xl bg-dark-800 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                  {item.version}
                </span>
                <span className="text-xs font-mono text-slate-400">{item.date}</span>
              </div>
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                {item.badge}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
