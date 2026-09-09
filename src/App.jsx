import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';

// Pages
import HomePage from './pages/HomePage';
import DownloadsPage from './pages/DownloadsPage';
import DocsPage from './pages/DocsPage';
import FaqPage from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import Error404Page from './pages/Error404Page';
import CookieBanner from './components/CookieBanner';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#090b10] text-slate-100 bg-grid-pattern relative selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
        <NotificationToast />
      </div>
    </AppProvider>
  );
}
