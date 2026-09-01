import React, { useState } from 'react';
import { Lock, Unlock, Key, Copy, Check, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EncryptionSimulator() {
  const { addToast } = useApp();
  const [mode, setMode] = useState('encrypt');
  const [plaintext, setPlaintext] = useState('Top Secret: Zero-Trust Master Key Payload 2026');
  const [password, setPassword] = useState('CipherlyMasterKey#2026');
  const [algo, setAlgo] = useState('AES-256-GCM');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Perform actual WebCrypto AES-GCM encryption
  const handleEncrypt = async () => {
    if (!plaintext || !password) {
      addToast('Please provide both text and secret passphrase', 'error');
      return;
    }
    setIsProcessing(true);
    try {
      const enc = new TextEncoder();
      const passBytes = enc.encode(password);
      
      const baseKey = await window.crypto.subtle.importKey('raw', passBytes, 'PBKDF2', false, ['deriveKey']);
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      const derivedKey = await window.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );

      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        derivedKey,
        enc.encode(plaintext)
      );

      const resultBuffer = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      resultBuffer.set(salt, 0);
      resultBuffer.set(iv, salt.length);
      resultBuffer.set(new Uint8Array(encrypted), salt.length + iv.length);

      const base64Cipher = btoa(String.fromCharCode(...resultBuffer));
      setCiphertext(base64Cipher);
      addToast('Payload encrypted in-memory using WebCrypto AES-256-GCM', 'success');
    } catch (err) {
      console.error(err);
      addToast('Encryption failed: ' + err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Perform actual WebCrypto AES-GCM decryption
  const handleDecrypt = async () => {
    if (!ciphertext || !password) {
      addToast('Please provide ciphertext and secret passphrase', 'error');
      return;
    }
    setIsProcessing(true);
    try {
      const rawBinary = atob(ciphertext);
      const bytes = new Uint8Array(rawBinary.length);
      for (let i = 0; i < rawBinary.length; i++) {
        bytes[i] = rawBinary.charCodeAt(i);
      }

      const salt = bytes.slice(0, 16);
      const iv = bytes.slice(16, 28);
      const encryptedData = bytes.slice(28);

      const enc = new TextEncoder();
      const passBytes = enc.encode(password);

      const baseKey = await window.crypto.subtle.importKey('raw', passBytes, 'PBKDF2', false, ['deriveKey']);
      const derivedKey = await window.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        derivedKey,
        encryptedData
      );

      const dec = new TextDecoder();
      setDecryptedText(dec.decode(decrypted));
      addToast('Payload decrypted successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Decryption failed: Incorrect passphrase or corrupted payload', 'error');
      setDecryptedText('');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast('Copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col justify-between">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-amber-400 font-semibold">WebCrypto AES-256-GCM Simulator</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMode('encrypt')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'encrypt'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Encrypt
          </button>
          <button
            onClick={() => setMode('decrypt')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'decrypt'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Decrypt
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5">Passphrase Key</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secret passphrase"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono text-xs focus:border-amber-500/50 outline-none"
            />
          </div>

          {mode === 'encrypt' ? (
            <div>
              <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5">Plaintext Message</label>
              <textarea
                rows={3}
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Enter plaintext message to encrypt"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:border-amber-500/50 outline-none resize-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5">Base64 Encrypted Ciphertext</label>
              <textarea
                rows={3}
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                placeholder="Paste Base64 ciphertext here"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono text-xs focus:border-amber-500/50 outline-none resize-none"
              />
            </div>
          )}

          {/* Results Box */}
          {mode === 'encrypt' && ciphertext && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Encrypted Ciphertext:</span>
                <button
                  onClick={() => copyToClipboard(ciphertext)}
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-[11px] text-amber-300 break-all">{ciphertext}</p>
            </div>
          )}

          {mode === 'decrypt' && decryptedText && (
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
                <span>Decrypted Plaintext:</span>
                <button
                  onClick={() => copyToClipboard(decryptedText)}
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-emerald-300 break-all">{decryptedText}</p>
            </div>
          )}
        </div>

        <button
          onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
          disabled={isProcessing}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
        >
          {mode === 'encrypt' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          <span>{isProcessing ? 'Processing in WebCrypto...' : mode === 'encrypt' ? 'Encrypt with AES-256-GCM' : 'Decrypt Payload'}</span>
        </button>
      </div>
    </div>
  );
}
