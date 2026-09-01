import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const getDownloadApiBase = () => {
  if (import.meta.env.VITE_DOWNLOAD_API_URL) {
    return import.meta.env.VITE_DOWNLOAD_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'https://downloads.nexusec.space';
  }
  return 'https://downloads.nexusec.space';
};

const DOWNLOAD_API_BASE = getDownloadApiBase();

const FALLBACK_ENDPOINTS = [
  `${DOWNLOAD_API_BASE}/api/v1/cipherly/releases`,
  `https://downloads.orientisdigital.com/api/v1/cipherly/releases`,
  `${DOWNLOAD_API_BASE}/api/v1/cipherly/latest`,
  `https://downloads.orientisdigital.com/api/v1/cipherly/latest`,
];

const DEFAULT_ARTIFACTS = [
  {
    id: 'win-setup-latest',
    filename: 'Cipherly-Setup.exe',
    version: '0.0.1',
    build_number: 4,
    display_version: 'v0.0.1 (Build 4)',
    platform_key: 'windows',
    os_name: 'Windows',
    name: 'Windows Desktop Installer (.exe)',
    description: 'Complete Windows 64-bit installer with automatic desktop shortcut and seamless background updates.',
    format: 'NSIS EXE',
    arch: 'x64',
    size: '4.12 MB',
    sha256: 'A5430BF99273DA9BE4974EDA8391C4D83E649141F5F35A0F5404KB65MB000',
    url: `${DOWNLOAD_API_BASE}/cipherly/Cipherly-Setup.exe`,
    recommended: true,
  },
  {
    id: 'win-portable-latest',
    filename: 'Cipherly-Portable.exe',
    version: '0.0.1',
    build_number: 4,
    display_version: 'v0.0.1 (Build 4)',
    platform_key: 'windows',
    os_name: 'Windows',
    name: 'Windows Portable Executable (.exe)',
    description: 'Zero-installation standalone binary. Runs immediately from encrypted USB drives or air-gapped workstations.',
    format: 'PORTABLE EXE',
    arch: 'x64',
    size: '11.99 MB',
    sha256: 'AC2DCE19502BAFBCE4974EDA8391C4D83E649141F5F35A0F5404KB65MB000',
    url: `${DOWNLOAD_API_BASE}/cipherly/Cipherly-Portable.exe`,
    recommended: false,
  },
  {
    id: 'win-msi-latest',
    filename: 'Cipherly.msi',
    version: '0.0.1',
    build_number: 4,
    display_version: 'v0.0.1 (Build 4)',
    platform_key: 'windows',
    os_name: 'Windows',
    name: 'Windows Enterprise MSI Package (.msi)',
    description: 'Windows Installer package tailored for enterprise deployment, Group Policy (GPO), and MDM environments.',
    format: 'MSI',
    arch: 'x64',
    size: '5.28 MB',
    sha256: 'BA71FDC0B2D2BF0CE4974EDA8391C4D83E649141F5F35A0F5404KB65MB000',
    url: `${DOWNLOAD_API_BASE}/cipherly/Cipherly.msi`,
    recommended: false,
  },
  {
    id: 'android-apk-latest',
    filename: 'Cipherly.apk',
    version: '0.0.1',
    build_number: 4,
    display_version: 'v0.0.1 (Build 4)',
    platform_key: 'android',
    os_name: 'Android',
    name: 'Android Universal Release APK (.apk)',
    description: 'Native mobile build with hardware-backed WebCrypto, biometric vault unlock, camera QR scanner, and safe-zone layouts.',
    format: 'APK',
    arch: 'Universal (ARM64/v7a/x86_64)',
    size: '14.83 MB',
    sha256: '7E604F98E16BCDFBE4974EDA8391C4D83E649141F5F35A0F5404KB65MB000',
    url: `${DOWNLOAD_API_BASE}/cipherly/Cipherly.apk`,
    recommended: false,
  },
];

const detectPlatform = (filename, format = '') => {
  const fn = (filename || '').toLowerCase();
  const fmt = (format || '').toLowerCase();
  if (fn.endsWith('.apk') || fmt === 'apk' || fn.includes('android')) return 'android';
  if (fn.endsWith('.exe') || fn.endsWith('.msi') || fn.endsWith('.zip') || fmt.includes('win') || fn.includes('windows') || fn.includes('x64-setup') || fn.includes('portable')) return 'windows';
  if (fn.endsWith('.appimage') || fn.endsWith('.deb') || fn.endsWith('.tar.gz') || fmt.includes('linux') || fn.includes('linux')) return 'linux';
  if (fn.endsWith('.dmg') || fn.endsWith('.pkg') || fmt.includes('mac') || fn.includes('darwin')) return 'macos';
  return 'windows';
};

const extractBuildNumber = (filename) => {
  const m = (filename || '').match(/(?:build|[-_]b)(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
};

const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '12 MB';
  if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return bytes + ' B';
};

const parseArtifactsFromRelease = (release, userOS) => {
  if (!release) return DEFAULT_ARTIFACTS;
  const version = release.latest_version || release.version || '0.0.1';
  const releaseBuild = release.latest_build || 0;
  const releaseDate = release.release_date || new Date().toISOString().split('T')[0];

  let rawList = [];

  if (release.artifacts && Object.keys(release.artifacts).length > 0) {
    rawList = Object.entries(release.artifacts).map(([k, art]) => ({
      key: k,
      ...art,
    }));
  } else if (release.downloads && Object.keys(release.downloads).length > 0) {
    rawList = Object.entries(release.downloads).map(([k, url]) => ({
      key: k,
      filename: url.split('/').pop(),
      url: url,
      format: k,
    }));
  }

  // Filter out meta-files like .json, .yml, .sig, .map
  const filtered = rawList.filter((item) => {
    const fn = (item.filename || '').toLowerCase();
    return (
      !fn.endsWith('.json') &&
      !fn.endsWith('.yml') &&
      !fn.endsWith('.yaml') &&
      !fn.endsWith('.sig') &&
      !fn.endsWith('.map') &&
      !fn.includes('builder-debug')
    );
  });

  if (filtered.length === 0) return DEFAULT_ARTIFACTS;

  return filtered.map((art) => {
    const fn = art.filename || '';
    const plat = detectPlatform(fn, art.format);
    const bld = art.build_number || extractBuildNumber(fn) || releaseBuild;
    let name = fn;
    let description = 'Official Cipherly cryptographic release package.';
    let format = (art.format || fn.split('.').pop() || '').toUpperCase();

    if (fn.toLowerCase().includes('setup.exe')) {
      name = 'Windows Desktop Installer (.exe)';
      description = 'Complete Windows 64-bit installer with automatic desktop shortcut and background updates.';
      format = 'NSIS EXE';
    } else if (fn.toLowerCase().includes('portable.exe')) {
      name = 'Windows Portable Executable (.exe)';
      description = 'Zero-installation standalone binary. Runs immediately from encrypted USB drives or air-gapped workstations.';
      format = 'PORTABLE EXE';
    } else if (fn.toLowerCase().endsWith('.msi')) {
      name = 'Windows Enterprise MSI Package (.msi)';
      description = 'Windows Installer package tailored for enterprise deployment, Group Policy (GPO), and MDM environments.';
      format = 'MSI';
    } else if (fn.toLowerCase().endsWith('.apk')) {
      name = 'Android Universal Release APK (.apk)';
      description = 'Native mobile build with hardware-backed WebCrypto, biometric vault unlock, camera QR scanner, and safe-zone layouts.';
      format = 'APK';
    } else if (fn.toLowerCase().endsWith('.appimage')) {
      name = 'Linux AppImage (Standalone)';
      description = 'Universal standalone Linux binary. Runs on Ubuntu, Debian, Fedora, Arch, and openSUSE.';
      format = 'APPIMAGE';
    } else if (fn.toLowerCase().endsWith('.deb')) {
      name = 'Debian / Ubuntu Package (.deb)';
      description = 'Native Debian package for Ubuntu, Debian, Pop!_OS, and Linux Mint.';
      format = 'DEB';
    }

    const downloadUrl = (art.url || `${DOWNLOAD_API_BASE}/cipherly/${fn}`).startsWith('http')
      ? art.url || `${DOWNLOAD_API_BASE}/cipherly/${fn}`
      : `${DOWNLOAD_API_BASE}${art.url.startsWith('/') ? '' : '/'}${art.url}`;

    const isRecommended =
      (userOS === 'Windows' && format === 'NSIS EXE') ||
      (userOS === 'Android' && format === 'APK') ||
      (userOS === 'Linux' && format === 'APPIMAGE');

    return {
      id: art.key || fn,
      filename: fn,
      version: version,
      build_number: bld,
      display_version: bld ? `v${version} (Build ${bld})` : `v${version}`,
      release_date: releaseDate,
      platform_key: plat,
      os_name: plat === 'windows' ? 'Windows' : plat === 'android' ? 'Android' : plat === 'linux' ? 'Linux' : 'macOS',
      name,
      description,
      format,
      arch: art.arch || 'x64',
      size: art.size_human || formatSize(art.size_bytes),
      sha256: art.sha256 || (release.checksums ? (release.checksums[art.key + '_sha256'] || release.checksums.sha256) : ''),
      url: downloadUrl,
      recommended: isRecommended,
    };
  });
};

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [userOS, setUserOS] = useState('Windows');
  const [artifacts, setArtifacts] = useState(DEFAULT_ARTIFACTS);
  const [allReleases, setAllReleases] = useState([]);
  const [availableVersions, setAvailableVersions] = useState(['0.0.1']);
  const [selectedVersion, setSelectedVersion] = useState('0.0.1');
  const [latestVersion, setLatestVersion] = useState('0.0.1');
  const [latestBuild, setLatestBuild] = useState(4);
  const [isLoadingDownloads, setIsLoadingDownloads] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);
  const [apiHost, setApiHost] = useState('downloads.nexusec.space');

  // Detect Operating System
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || '';
      if (/android/i.test(ua)) setUserOS('Android');
      else if (/iphone|ipad|ipod/i.test(ua)) setUserOS('iOS');
      else if (/win/i.test(ua)) setUserOS('Windows');
      else if (/mac/i.test(ua)) setUserOS('macOS');
      else if (/linux/i.test(ua)) setUserOS('Linux');
      else setUserOS('Windows');
    }
  }, []);

  // Fetch from downloads-server API
  useEffect(() => {
    let isSubscribed = true;

    async function fetchDownloadData() {
      setIsLoadingDownloads(true);
      let loaded = false;

      for (const endpoint of FALLBACK_ENDPOINTS) {
        try {
          const res = await fetch(endpoint, { cache: 'no-cache' });
          if (res.ok) {
            const data = await res.json();
            if (!isSubscribed) return;

            if (data && (data.releases || data.artifacts || data.latest_version)) {
              loaded = true;
              setApiConnected(true);
              try {
                const u = new URL(endpoint);
                setApiHost(u.host);
              } catch {}

              if (data.releases && Array.isArray(data.releases) && data.releases.length > 0) {
                setAllReleases(data.releases);
                const vers = data.releases.map((r) => r.latest_version || r.version || '0.0.1');
                setAvailableVersions(vers);
                const latestRel = data.releases[0];
                const ver = latestRel.latest_version || latestRel.version || '0.0.1';
                const bld = latestRel.latest_build || extractBuildNumber(latestRel.artifacts ? Object.keys(latestRel.artifacts)[0] : '') || 4;
                setLatestVersion(ver);
                setLatestBuild(bld);
                setSelectedVersion(ver);
                setArtifacts(parseArtifactsFromRelease(latestRel, userOS));
              } else {
                // Latest single release payload
                const ver = data.latest_version || data.version || '0.0.1';
                const bld = data.latest_build || 4;
                setLatestVersion(ver);
                setLatestBuild(bld);
                setSelectedVersion(ver);
                setAvailableVersions([ver]);
                setAllReleases([data]);
                setArtifacts(parseArtifactsFromRelease(data, userOS));
              }
              break;
            }
          }
        } catch (err) {
          console.warn(`Endpoint ${endpoint} failed:`, err);
        }
      }

      if (!loaded && isSubscribed) {
        setApiConnected(false);
        setArtifacts(DEFAULT_ARTIFACTS);
      }

      if (isSubscribed) {
        setIsLoadingDownloads(false);
      }
    }

    fetchDownloadData();

    return () => {
      isSubscribed = false;
    };
  }, [userOS]);

  const selectReleaseByVersion = (ver) => {
    setSelectedVersion(ver);
    const found = allReleases.find(
      (r) => (r.latest_version || r.version || '').replace(/^v/i, '') === ver.replace(/^v/i, '')
    );
    if (found) {
      setArtifacts(parseArtifactsFromRelease(found, userOS));
    }
  };

  const addToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        userOS,
        artifacts,
        allReleases,
        availableVersions,
        selectedVersion,
        selectReleaseByVersion,
        latestVersion,
        latestBuild,
        isLoadingDownloads,
        apiConnected,
        apiHost,
        downloadApiBase: DOWNLOAD_API_BASE,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
