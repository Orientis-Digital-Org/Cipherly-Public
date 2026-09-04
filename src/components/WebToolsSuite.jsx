import React, { useState, useEffect } from 'react';
import {
  Clock,
  FileCode2,
  FileText,
  KeyRound,
  SearchCheck,
  Copy,
  Check,
  Download,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Base32 helper for TOTP
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(input) {
  const sanitized = input.toUpperCase().replace(/[\s\-=]/g, '');
  if (!sanitized) return new Uint8Array(0);

  let bits = 0;
  let value = 0;
  const output = [];

  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    const index = BASE32_ALPHABET.indexOf(char);
    if (index === -1) throw new Error(`Invalid Base32 character: ${char}`);
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new Uint8Array(output);
}

// Zero-width Unicode constants
const ZW_ZERO = '\u200B';
const ZW_ONE = '\u200C';
const ZW_DELIM = '\u200D';

export default function WebToolsSuite() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('totp');

  // --- 1. TOTP State ---
  const [totpSecret, setTotpSecret] = useState('JBSWY3DPEHPK3PXP');
  const [totpCode, setTotpCode] = useState('------');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [copiedTotp, setCopiedTotp] = useState(false);

  // --- 2. HTML Capsule State ---
  const [capsuleTitle, setCapsuleTitle] = useState('Confidential Project Alpha');
  const [capsuleSecret, setCapsuleSecret] = useState('Server root credentials: ssh admin@node-42');
  const [capsulePass, setCapsulePass] = useState('SuperSecretPass123!');
  const [isGeneratingCapsule, setIsGeneratingCapsule] = useState(false);

  // --- 3. Zero-Width Stego State ---
  const [stegoCarrier, setStegoCarrier] = useState('The quarterly security review has been successfully completed with all audits passed.');
  const [stegoSecret, setStegoSecret] = useState('Vault Pin: 9842');
  const [stegoOutput, setStegoOutput] = useState('');
  const [stegoExtracted, setStegoExtracted] = useState('');
  const [copiedStego, setCopiedStego] = useState(false);

  // --- 4. HMAC State ---
  const [hmacMessage, setHmacMessage] = useState('{"event":"payment_intent.succeeded","amount":4900}');
  const [hmacKey, setHmacKey] = useState('whsec_test_secret_key_8892');
  const [hmacAlgo, setHmacAlgo] = useState('SHA-256');
  const [hmacResult, setHmacResult] = useState('');
  const [copiedHmac, setCopiedHmac] = useState(false);

  // --- 5. Leak Auditor State ---
  const [auditorInput, setAuditorInput] = useState('');
  const [auditorLoading, setAuditorLoading] = useState(false);
  const [auditorResult, setAuditorResult] = useState(null);

  // Live TOTP Generator Loop
  useEffect(() => {
    let isSubscribed = true;

    async function computeTotp() {
      try {
        const keyBytes = base32Decode(totpSecret);
        if (keyBytes.length === 0) return;

        const epochSeconds = Math.floor(Date.now() / 1000);
        const period = 30;
        const currentRemaining = period - (epochSeconds % period);
        if (isSubscribed) setTimeRemaining(currentRemaining);

        const counter = Math.floor(epochSeconds / period);
        const counterBuffer = new ArrayBuffer(8);
        const counterView = new DataView(counterBuffer);
        counterView.setUint32(0, Math.floor(counter / 0x100000000));
        counterView.setUint32(4, counter & 0xffffffff);

        const cryptoKey = await window.crypto.subtle.importKey(
          'raw',
          keyBytes,
          { name: 'HMAC', hash: { name: 'SHA-1' } },
          false,
          ['sign']
        );

        const sig = await window.crypto.subtle.sign('HMAC', cryptoKey, counterBuffer);
        const hmacBytes = new Uint8Array(sig);
        const offset = hmacBytes[hmacBytes.length - 1] & 0x0f;
        const binaryCode =
          ((hmacBytes[offset] & 0x7f) << 24) |
          ((hmacBytes[offset + 1] & 0xff) << 16) |
          ((hmacBytes[offset + 2] & 0xff) << 8) |
          (hmacBytes[offset + 3] & 0xff);

        const otp = (binaryCode % 1000000).toString().padStart(6, '0');
        if (isSubscribed) setTotpCode(otp);
      } catch (err) {
        if (isSubscribed) setTotpCode('ERR');
      }
    }

    computeTotp();
    const timer = setInterval(computeTotp, 1000);
    return () => {
      isSubscribed = false;
      clearInterval(timer);
    };
  }, [totpSecret]);

  // Compute HMAC live
  useEffect(() => {
    async function runHmac() {
      if (!hmacMessage || !hmacKey) {
        setHmacResult('');
        return;
      }
      try {
        const enc = new TextEncoder();
        const cryptoKey = await window.crypto.subtle.importKey(
          'raw',
          enc.encode(hmacKey),
          { name: 'HMAC', hash: { name: hmacAlgo } },
          false,
          ['sign']
        );
        const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, enc.encode(hmacMessage));
        const sigBytes = new Uint8Array(signature);
        let hex = '';
        for (let i = 0; i < sigBytes.length; i++) {
          hex += sigBytes[i].toString(16).padStart(2, '0');
        }
        setHmacResult(hex);
      } catch (e) {
        setHmacResult('');
      }
    }
    runHmac();
  }, [hmacMessage, hmacKey, hmacAlgo]);

  // Zero-Width Steganography Embed
  const handleEmbedStego = () => {
    if (!stegoSecret) {
      addToast('Please provide a secret payload', 'error');
      return;
    }
    const enc = new TextEncoder();
    const bytes = enc.encode(stegoSecret);
    let zwSequence = '';
    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i];
      for (let bit = 7; bit >= 0; bit--) {
        const b = (byte >> bit) & 1;
        zwSequence += b === 1 ? ZW_ONE : ZW_ZERO;
      }
    }
    const zwPayload = ZW_DELIM + zwSequence + ZW_DELIM;
    const cleanCarrier = stegoCarrier.replace(/[\u200B\u200C\u200D]/g, '');
    const firstSpace = cleanCarrier.indexOf(' ');
    const combined = firstSpace !== -1
      ? cleanCarrier.slice(0, firstSpace + 1) + zwPayload + cleanCarrier.slice(firstSpace + 1)
      : cleanCarrier + zwPayload;

    setStegoOutput(combined);
    addToast('Secret invisibly encoded using zero-width characters!', 'success');
  };

  // Zero-Width Steganography Extract
  const handleExtractStego = (text) => {
    const first = text.indexOf(ZW_DELIM);
    const last = text.lastIndexOf(ZW_DELIM);
    let bits = '';
    if (first !== -1 && last !== -1 && first < last) {
      const inner = text.slice(first + 1, last);
      for (let i = 0; i < inner.length; i++) {
        if (inner[i] === ZW_ZERO) bits += '0';
        else if (inner[i] === ZW_ONE) bits += '1';
      }
    }
    if (!bits || bits.length % 8 !== 0) {
      setStegoExtracted('No zero-width payload detected.');
      return;
    }
    const byteLen = bits.length / 8;
    const bytes = new Uint8Array(byteLen);
    for (let i = 0; i < byteLen; i++) {
      bytes[i] = parseInt(bits.substr(i * 8, 8), 2);
    }
    try {
      const dec = new TextDecoder().decode(bytes);
      setStegoExtracted(dec);
      addToast('Extracted hidden secret payload!', 'success');
    } catch {
      setStegoExtracted('Corrupted payload');
    }
  };

  // Generate Standalone Encrypted HTML Capsule
  const handleGenerateCapsule = async () => {
    if (!capsulePass || !capsuleSecret) {
      addToast('Passphrase and confidential payload are required', 'error');
      return;
    }
    setIsGeneratingCapsule(true);
    try {
      const enc = new TextEncoder();
      const passKey = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(capsulePass),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      const aesKey = await window.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        passKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );

      const ciphertextBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        aesKey,
        enc.encode(capsuleSecret)
      );

      function bytesToBase64(bytes) {
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }

      const pkg = {
        title: capsuleTitle,
        type: 'text',
        saltB64: bytesToBase64(salt),
        ivB64: bytesToBase64(iv),
        ciphertextB64: bytesToBase64(new Uint8Array(ciphertextBuffer)),
      };
      const payloadB64 = btoa(unescape(encodeURIComponent(JSON.stringify(pkg))));

      const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${capsuleTitle} - Cipherly Capsule</title><style>body{background:#020617;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1.5rem;}.card{background:rgba(15,23,42,0.9);border:1px solid rgba(51,65,85,0.7);border-radius:1rem;width:100%;max-width:32rem;padding:2rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.7);}input{width:100%;background:#090d16;border:1px solid #334155;border-radius:0.5rem;padding:0.75rem;color:#fff;font-size:1rem;margin-bottom:1rem;box-sizing:border-box;}button{width:100%;background:#f59e0b;color:#020617;font-weight:700;border:none;padding:0.75rem;border-radius:0.5rem;cursor:pointer;}textarea{width:100%;background:#090d16;border:1px solid #334155;border-radius:0.5rem;color:#fff;padding:0.75rem;min-height:100px;margin-top:1rem;box-sizing:border-box;font-family:monospace;}</style></head><body><div class="card"><h2 style="margin-bottom:0.5rem;color:#f59e0b;">🔒 ${capsuleTitle}</h2><p style="font-size:0.85rem;color:#94a3b8;margin-bottom:1.5rem;">Cipherly Standalone Decryption Capsule. Zero internet required.</p><input type="password" id="p" placeholder="Enter passphrase..." autofocus /><button id="b">Decrypt Offline</button><div id="r" style="display:none;"><textarea id="t" readonly></textarea></div></div><script id="d" type="application/json">${payloadB64}</script><script>document.getElementById('b').onclick=async()=>{var pass=document.getElementById('p').value;var d=JSON.parse(decodeURIComponent(escape(atob(document.getElementById('d').textContent))));var s=Uint8Array.from(atob(d.saltB64),c=>c.charCodeAt(0));var iv=Uint8Array.from(atob(d.ivB64),c=>c.charCodeAt(0));var ct=Uint8Array.from(atob(d.ciphertextB64),c=>c.charCodeAt(0));try{var k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pass),{name:'PBKDF2'},false,['deriveKey']);var dk=await crypto.subtle.deriveKey({name:'PBKDF2',salt:s,iterations:100000,hash:'SHA-256'},k,{name:'AES-GCM',length:256},false,['decrypt']);var dec=await crypto.subtle.decrypt({name:'AES-GCM',iv:iv},dk,ct);document.getElementById('t').value=new TextDecoder().decode(dec);document.getElementById('r').style.display='block';}catch(e){alert('Incorrect passphrase or corrupted capsule.');}};</script></body></html>`;

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${capsuleTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addToast('Self-decrypting HTML capsule generated & downloaded!', 'success');
    } catch (e) {
      addToast('Failed to compile capsule: ' + e.message, 'error');
    } finally {
      setIsGeneratingCapsule(false);
    }
  };

  // k-Anonymity Leak Auditor
  const handleCheckLeak = async () => {
    if (!auditorInput) {
      addToast('Please enter a password to test', 'error');
      return;
    }
    setAuditorLoading(true);
    setAuditorResult(null);
    try {
      const enc = new TextEncoder();
      const hashBuffer = await window.crypto.subtle.digest('SHA-1', enc.encode(auditorInput));
      const hashBytes = new Uint8Array(hashBuffer);
      let sha1Hex = '';
      for (let i = 0; i < hashBytes.length; i++) {
        sha1Hex += hashBytes[i].toString(16).padStart(2, '0');
      }
      sha1Hex = sha1Hex.toUpperCase();
      const prefix = sha1Hex.slice(0, 5);
      const suffix = sha1Hex.slice(5);

      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: { 'Add-Padding': 'true' },
      });
      if (!res.ok) throw new Error('API unreachable');
      const text = await res.text();
      let matchCount = 0;
      for (const line of text.split('\n')) {
        const [hash, count] = line.trim().split(':');
        if (hash === suffix) {
          matchCount = parseInt(count || '0', 10);
          break;
        }
      }

      setAuditorResult({
        prefix,
        compromised: matchCount > 0,
        count: matchCount,
      });
      if (matchCount > 0) {
        addToast(`Compromised! Found in ${matchCount.toLocaleString()} known breaches!`, 'error');
      } else {
        addToast('No known breaches found via k-Anonymity!', 'success');
      }
    } catch (e) {
      addToast('Failed to check leak database: ' + e.message, 'error');
    } finally {
      setAuditorLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Cryptographic Suite
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Live Browser-Side Crypto Engine
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="bg-dark-900/90 p-1 rounded-xl border border-slate-800 flex space-x-1 overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'totp', label: '2FA Authenticator', icon: Clock },
            { id: 'capsule', label: 'HTML Capsule', icon: FileCode2 },
            { id: 'stego', label: 'Zero-Width Stego', icon: FileText },
            { id: 'hmac', label: 'HMAC Authenticator', icon: KeyRound },
            { id: 'auditor', label: 'k-Anonymity Auditor', icon: SearchCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. TOTP Authenticator */}
      {activeTab === 'totp' && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-dark-900 border border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                RFC 6238 Token Generator
              </span>
              <div className="flex items-center gap-4 mt-1">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-widest select-all">
                  {totpCode.slice(0, 3)} {totpCode.slice(3)}
                </span>
                <div className="text-xs font-mono text-slate-400 bg-dark-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  {timeRemaining}s refresh
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(totpCode);
                setCopiedTotp(true);
                addToast('Copied 2FA code', 'info');
                setTimeout(() => setCopiedTotp(false), 2000);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              {copiedTotp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedTotp ? 'Copied' : 'Copy 2FA Code'}</span>
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Base32 Seed Secret (e.g. Google, GitHub, Proton)
            </label>
            <input
              type="text"
              value={totpSecret}
              onChange={(e) => setTotpSecret(e.target.value.toUpperCase().replace(/[^A-Z2-7]/g, ''))}
              placeholder="JBSWY3DPEHPK3PXP"
              className="w-full bg-dark-900 border border-slate-700/80 rounded-xl p-3 text-xs font-mono text-slate-200 uppercase outline-none focus:border-amber-500/80"
            />
          </div>
        </div>
      )}

      {/* 2. HTML Capsules */}
      {activeTab === 'capsule' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs text-slate-400">
            Export a confidential payload into a single, standalone <code>.html</code> file. The recipient can open and decrypt it offline in any web browser without installing Cipherly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Capsule Title</label>
              <input
                type="text"
                value={capsuleTitle}
                onChange={(e) => setCapsuleTitle(e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Passphrase</label>
              <input
                type="password"
                value={capsulePass}
                onChange={(e) => setCapsulePass(e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Confidential Secret Payload</label>
            <textarea
              rows={2}
              value={capsuleSecret}
              onChange={(e) => setCapsuleSecret(e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 font-mono resize-none outline-none"
            />
          </div>

          <button
            onClick={handleGenerateCapsule}
            disabled={isGeneratingCapsule}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download Self-Decrypting .html</span>
          </button>
        </div>
      )}

      {/* 3. Zero-Width Steganography */}
      {activeTab === 'stego' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs text-slate-400">
            Embed secrets invisibly inside everyday emails, memos, or text using Unicode zero-width characters (<code>\u200B</code> / <code>\u200C</code>). The carrier text looks 100% normal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Carrier Text (Innocent Cover)</label>
              <textarea
                rows={3}
                value={stegoCarrier}
                onChange={(e) => setStegoCarrier(e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 resize-none outline-none font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Secret Message to Hide</label>
              <textarea
                rows={3}
                value={stegoSecret}
                onChange={(e) => setStegoSecret(e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 resize-none outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEmbedStego}
              className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
            >
              Encode Invisibly
            </button>
            <button
              onClick={() => handleExtractStego(stegoOutput || stegoCarrier)}
              className="flex-1 py-2 rounded-xl bg-dark-700 hover:bg-dark-600 text-slate-200 text-xs font-bold border border-slate-700 transition"
            >
              Extract Hidden Payload
            </button>
          </div>

          {stegoOutput && (
            <div className="p-3 bg-dark-900 rounded-xl border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Output (Contains Invisible Payload)</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(stegoOutput);
                    setCopiedStego(true);
                    setTimeout(() => setCopiedStego(false), 2000);
                  }}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"
                >
                  {copiedStego ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedStego ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 font-sans select-all">{stegoOutput}</p>
            </div>
          )}

          {stegoExtracted && (
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-xs text-emerald-300 font-mono">
              <strong>Extracted Secret:</strong> {stegoExtracted}
            </div>
          )}
        </div>
      )}

      {/* 4. HMAC Authenticator */}
      {activeTab === 'hmac' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1">Secret Key</label>
              <input
                type="text"
                value={hmacKey}
                onChange={(e) => setHmacKey(e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Algorithm</label>
              <select
                value={hmacAlgo}
                onChange={(e) => setHmacAlgo(e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
              >
                <option value="SHA-256">HMAC-SHA-256</option>
                <option value="SHA-384">HMAC-SHA-384</option>
                <option value="SHA-512">HMAC-SHA-512</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Payload / Message</label>
            <textarea
              rows={2}
              value={hmacMessage}
              onChange={(e) => setHmacMessage(e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 font-mono resize-none outline-none"
            />
          </div>

          {hmacResult && (
            <div className="p-3.5 bg-dark-900 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase text-amber-400">
                <span>Calculated HMAC Tag ({hmacAlgo})</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(hmacResult);
                    setCopiedHmac(true);
                    setTimeout(() => setCopiedHmac(false), 2000);
                  }}
                  className="text-slate-400 hover:text-amber-400 flex items-center gap-1"
                >
                  {copiedHmac ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHmac ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs font-mono text-slate-200 break-all select-all">{hmacResult}</p>
            </div>
          )}
        </div>
      )}

      {/* 5. k-Anonymity Leak Auditor */}
      {activeTab === 'auditor' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs text-slate-400">
            Check whether a passphrase appears in known breach corpuses using mathematical <strong>k-Anonymity</strong> (only the first 5 characters of the SHA-1 hash are queried; your actual password never leaves your browser).
          </p>

          <div className="flex gap-2">
            <input
              type="password"
              value={auditorInput}
              onChange={(e) => setAuditorInput(e.target.value)}
              placeholder="Enter password to test..."
              className="flex-1 bg-dark-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 font-mono outline-none focus:border-amber-500/80"
            />
            <button
              onClick={handleCheckLeak}
              disabled={auditorLoading}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {auditorLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <SearchCheck className="w-3.5 h-3.5" />}
              <span>{auditorLoading ? 'Auditing...' : 'Check Breaches'}</span>
            </button>
          </div>

          {auditorResult && (
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 animate-fade-in ${
                auditorResult.compromised
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
            >
              {auditorResult.compromised ? (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              <div className="text-xs">
                <strong>
                  {auditorResult.compromised
                    ? `Compromised! Found in ${auditorResult.count.toLocaleString()} known breaches!`
                    : 'Clean! No breach occurrences found.'}
                </strong>
                <p className="text-[11px] opacity-75 font-mono">
                  Queried SHA-1 prefix: {auditorResult.prefix}*** (Zero credential leakage)
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
