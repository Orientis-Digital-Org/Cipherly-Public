import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Download,
  Terminal,
  CheckCircle2,
  Copy,
  Shield,
  Server,
  RefreshCw,
  Layers,
  Check,
  ExternalLink,
  HardDrive,
  Smartphone,
  Monitor,
  Laptop,
  Sparkles,
  Lock,
  ChevronDown,
} from 'lucide-react';

export default function DownloadsPage() {
  const {
    userOS,
    addToast,
    artifacts,
    availableVersions,
    selectedVersion,
    selectReleaseByVersion,
    latestVersion,
    latestBuild,
    isLoadingDownloads,
    apiConnected,
    apiHost,
  } = useApp();

  const [activeTab, setActiveTab] = useState(
    userOS === 'Android' ? 'android' : userOS === 'Windows' ? 'windows' : userOS === 'Linux' ? 'linux' : 'windows'
  );
  const [copiedHash, setCopiedHash] = useState(null);

  const handleCopyHash = (hash, filename) => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setCopiedHash(filename);
    addToast(`SHA-256 checksum copied for ${filename}`, 'success');
    setTimeout(() => {
      setCopiedHash(null);
    }, 2500);
  };

  const filteredArtifacts =
    activeTab === 'all'
      ? artifacts
      : artifacts.filter((a) => a.platform_key === activeTab);

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 py-12 md:py-20 relative overflow-hidden bg-grid-pattern">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Cryptographic Release Channel</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Download <span className="text-gradient-amber">Cipherly</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Get the standalone, zero-trust cryptographic suite for Windows, Android, and Linux.
            Engineered with zero telemetry and 100% offline encryption.
          </p>

          {/* Version & Server Status Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-800/80 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Target Release:</span>
              {availableVersions.length > 1 ? (
                <div className="relative inline-block">
                  <select
                    value={selectedVersion}
                    onChange={(e) => selectReleaseByVersion(e.target.value)}
                    className="bg-slate-900 text-amber-400 font-bold border border-amber-500/30 rounded px-2 py-0.5 text-xs outline-none cursor-pointer"
                  >
                    {availableVersions.map((v) => (
                      <option key={v} value={v} className="bg-dark-900 text-slate-200">
                        v{v} {v === latestVersion ? `(Latest b${latestBuild})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <span className="text-amber-400 font-bold">
                  v{latestVersion} (Build {latestBuild})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-800/80 border border-slate-800 text-xs font-mono">
              <Server className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">Host:</span>
              <span className="text-slate-200">{apiHost}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  apiConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
                title={apiConnected ? 'API Live' : 'Static Fallback'}
              />
            </div>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-2xl bg-dark-800 border border-slate-800 flex flex-wrap gap-1 shadow-xl">
            <button
              onClick={() => setActiveTab('windows')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'windows'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Windows</span>
              {userOS === 'Windows' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20 font-bold uppercase">
                  Your OS
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('android')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'android'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Android APK</span>
              {userOS === 'Android' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20 font-bold uppercase">
                  Your OS
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('linux')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'linux'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Linux</span>
              {userOS === 'Linux' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20 font-bold uppercase">
                  Your OS
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Artifacts ({artifacts.length})</span>
            </button>
          </div>
        </div>

        {/* Artifact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtifacts.map((art) => (
            <div
              key={art.id}
              className={`rounded-2xl p-6 transition-all flex flex-col justify-between relative bg-dark-800/90 border ${
                art.recommended
                  ? 'border-amber-500/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {art.recommended && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Recommended for {art.os_name}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      {art.format} • {art.arch}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">{art.name}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 flex-shrink-0">
                    {art.size}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {art.description}
                </p>

                {/* File info pill */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Package:</span>
                    <span className="text-slate-200 truncate max-w-[200px]" title={art.filename}>
                      {art.filename}
                    </span>
                  </div>

                  {art.sha256 && (
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
                      <span className="text-slate-400">SHA-256:</span>
                      <button
                        onClick={() => handleCopyHash(art.sha256, art.filename)}
                        className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition"
                        title="Click to copy full SHA-256 hash"
                      >
                        <span className="truncate max-w-[130px] font-mono text-[10px]">
                          {art.sha256.substring(0, 10)}...{art.sha256.substring(art.sha256.length - 8)}
                        </span>
                        {copiedHash === art.filename ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Action Button */}
              <div className="pt-5 mt-2">
                <a
                  href={art.url}
                  download={art.filename}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                    art.recommended
                      ? 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 shadow-amber-500/20 transform hover:-translate-y-0.5'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download {art.filename}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Verification & Integrity Guide */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Cryptographic Checksum Verification</h3>
                <p className="text-xs text-slate-400">Verify binary authenticity before executing in sensitive environments.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 font-mono">Windows (PowerShell)</span>
              <pre className="p-3 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono overflow-x-auto select-all">
Get-FileHash .\Cipherly-Setup.exe -Algorithm SHA256
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 font-mono">Linux / macOS (Terminal)</span>
              <pre className="p-3 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono overflow-x-auto select-all">
sha256sum Cipherly-Setup.exe
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 font-mono">Android (Termux / Hash Checker)</span>
              <pre className="p-3 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono overflow-x-auto select-all">
sha256sum Cipherly.apk
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
