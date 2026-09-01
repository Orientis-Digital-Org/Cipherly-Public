import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SecurityBadge({ text = "Zero-Trust Architecture", variant = "amber" }) {
  const isEmerald = variant === 'emerald';
  const isRose = variant === 'rose';

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border backdrop-blur-md ${
        isEmerald
          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
          : isRose
          ? 'bg-rose-950/40 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
      }`}
    >
      <span className={`w-2 h-2 rounded-full animate-ping ${isEmerald ? 'bg-emerald-400' : isRose ? 'bg-rose-400' : 'bg-amber-400'}`} />
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );
}
