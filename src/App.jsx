import React, { useState, useEffect } from 'react';
import './styles/global.css';
import CanvasBackground from './components/CanvasBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GamesShowcase from './components/GamesShowcase';
import HighlightsSection from './components/HighlightsSection';
import VideoGallery from './components/VideoGallery';
import CommunityBanner from './components/CommunityBanner';
import Footer from './components/Footer';
import MiniGameModal from './components/MiniGameModal';
import AdminPanel from './components/AdminPanel';
import { initAutoTracker } from './utils/tracker';
import { X, Tv, ExternalLink } from 'lucide-react';

export default function App() {
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [miniGameOpen, setMiniGameOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Initialize auto-tracker on app mount
  useEffect(() => {
    initAutoTracker();

    // Check for secret admin hash route #admin or #dashboard
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#dashboard' || window.location.pathname === '/admin') {
        setAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToVideos = () => {
    const videoSection = document.getElementById('videos');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* 60FPS Interactive Canvas Background */}
      <CanvasBackground />

      {/* Sticky Cyber Glass Navigation Header */}
      <Navbar
        onOpenLiveModal={() => setLiveModalOpen(true)}
        onOpenMiniGame={() => setMiniGameOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Page Content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection
          onWatchLive={scrollToVideos}
          onOpenMiniGame={() => setMiniGameOpen(true)}
        />
        <GamesShowcase />
        <HighlightsSection />
        <VideoGallery />
        <CommunityBanner />
      </main>

      {/* Platform & Social Footer */}
      <Footer />

      {/* Top-Right Cyberpunk Mini-Game & Leaderboard Modal */}
      <MiniGameModal
        isOpen={miniGameOpen}
        onClose={() => setMiniGameOpen(false)}
      />

      {/* Secret Admin Panel & Visitor Activity Tracker Modal */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => {
          setAdminOpen(false);
          if (window.location.hash === '#admin' || window.location.hash === '#dashboard') {
            window.history.replaceState(null, '', ' ');
          }
        }}
      />

      {/* Live Stream Broadcast Modal */}
      {liveModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setLiveModalOpen(false)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '560px',
              width: '100%',
              borderRadius: '20px',
              padding: '36px',
              position: 'relative',
              textAlign: 'center',
              border: '1px solid var(--neon-cyan)',
              boxShadow: '0 0 40px var(--neon-cyan-glow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLiveModalOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255, 0, 85, 0.15)',
                border: '1px solid var(--neon-pink)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Tv size={28} color="var(--neon-pink)" />
            </div>

            <div className="cyber-tag" style={{ background: 'var(--neon-pink)', color: '#fff', borderColor: 'transparent', marginBottom: '12px', display: 'inline-block' }}>
              🔴 LIVE BROADCAST HUB
            </div>

            <h3 className="font-heading" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '12px' }}>
              OPTIMUZ GAMING IS LIVE!
            </h3>

            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '0.95rem' }}>
              Catch the live stream on YouTube and Kick! High-octane GTA RP, RDR2 Syn County, and PUBG squad clutch runs.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://www.youtube.com/@optimuz_gaming"
                target="_blank"
                rel="noreferrer"
                className="cyber-button"
                style={{ padding: '12px 24px' }}
              >
                YOUTUBE LIVE <ExternalLink size={16} />
              </a>
              <a
                href="https://kick.com/optimuz-gaming"
                target="_blank"
                rel="noreferrer"
                className="cyber-button cyber-button-purple"
                style={{ padding: '12px 24px' }}
              >
                KICK STREAM <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
