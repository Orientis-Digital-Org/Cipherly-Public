import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { Search, ChevronDown, HelpCircle, ShieldAlert, Key, Smartphone, Monitor } from 'lucide-react';

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Does Cipherly store my master passphrase or keys on any cloud server?',
      a: 'No. Cipherly is built under a strict zero-trust, local-first paradigm. Your passphrase is processed exclusively in volatile memory (RAM) and never transmitted to any external server.',
      category: 'Privacy',
    },
    {
      q: 'Does Cipherly work on Android mobile devices?',
      a: 'Yes! Cipherly provides native Android Universal APKs supporting ARM64, ARMv7a, and x86_64 architectures. The Android version includes hardware-accelerated WebCrypto, biometric vault unlock, camera QR scanning, and notch safe-zone padding.',
      category: 'Mobile',
    },
    {
      q: "What is Shamir's Secret Sharing and how does it protect my recovery keys?",
      a: "Shamir's Secret Sharing splits critical master keys or passphrases into N independent threshold shares using Galois Field GF(256) polynomials. For example, in a 3-of-5 threshold, any 3 shares can reconstruct the key, while 2 shares provide zero mathematical clues.",
      category: 'Threshold Cryptography',
    },
    {
      q: 'How does the Decoy Duress Vault work under physical coercion?',
      a: 'In Settings, you can configure a separate Decoy Passphrase. If forced to unlock your device under duress, entering the decoy passphrase unlocks an isolated decoy vault containing fake files, leaving your real master vault completely invisible.',
      category: 'Duress Defense',
    },
    {
      q: "Does Cipherly's 2FA Authenticator require network access or sync with any cloud?",
      a: 'No. The 2FA Authenticator operates completely air-gapped and offline according to RFC 6238 and RFC 4226 standards. All account secrets and seed keys are stored encrypted with AES-256-GCM in your local master vault, safe from remote SIM-swap and credential breach attacks.',
      category: '2FA Authenticator',
    },
    {
      q: 'How do Self-Decrypting HTML Capsules work without recipients installing Cipherly?',
      a: 'A Self-Decrypting Capsule is a standalone .html file that bundles your encrypted payload alongside a zero-dependency WebCrypto AES-GCM engine in inline vanilla JavaScript. Recipients simply open the file in any modern browser (Chrome, Firefox, Safari, Edge, Android/iOS) and enter the passphrase. The file decrypts in ephemeral memory without ever connecting to any server.',
      category: 'Capsules',
    },
    {
      q: 'What is Zero-Width Unicode Steganography and where does it work?',
      a: 'Zero-Width Steganography encodes encrypted or secret binary data into invisible Unicode characters (ZWSP \u200B, ZWNJ \u200C, ZWJ \u200D) woven between regular words. It is completely invisible to human eyes and survives standard copy-pasting, tweets, messaging apps, and email bodies.',
      category: 'Steganography',
    },
    {
      q: 'What media formats are supported for Steganography?',
      a: 'Cipherly supports 16-bit uncompressed PCM WAV audio waveforms, PNG/WebP spatial pixel images, and Unicode Zero-Width text encoding—all protected with authenticated AES-256-GCM payloads.',
      category: 'Steganography',
    },
    {
      q: 'Is it safe to check passwords against the k-Anonymity breach auditor?',
      a: 'Yes. Cipherly utilizes the mathematical k-Anonymity model: your password is SHA-1 hashed entirely on your device, and ONLY the first 5 hexadecimal characters of the hash are queried against the breach registry. The server responds with hundreds of candidate suffixes, and your browser completes the matching locally. Your password and remaining 35 hash characters NEVER leave your machine.',
      category: 'Audit & Integrity',
    },
    {
      q: 'What is HMAC and why should I use it over a standard SHA hash?',
      a: 'A standard SHA hash only verifies integrity (detecting accidental corruption). An HMAC (Keyed-Hash Message Authentication Code) incorporates a secret shared key, which cryptographically proves both that the data has not been altered AND that it originated from a sender holding the secret key.',
      category: 'Audit & Integrity',
    },
    {
      q: 'How does the DoD 5220.22-M File Shredder prevent data recovery?',
      a: 'Unlike normal OS deletion which merely removes directory pointers, Cipherly overwrites the physical file sectors with random bytes and binary complements across multiple passes before truncating and unlinking.',
      category: 'Destruction',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <SecurityBadge text="Frequently Asked Questions" variant="amber" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked <span className="text-gradient-amber">Questions</span>
        </h1>
        <p className="text-slate-300 text-sm">
          Everything you need to know about Cipherly's zero-trust architecture, mobile builds, 2FA, capsules, and cryptographic tools.
        </p>

        {/* Search Bar */}
        <div className="relative pt-4">
          <Search className="absolute left-4 top-7 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. 2FA, Capsules, k-Anonymity, Steganography, Android)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-dark-800 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-500/50 shadow-xl"
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-dark-800/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-dark-800/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] font-bold uppercase">
                    {faq.category}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
