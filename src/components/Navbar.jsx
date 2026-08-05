import React, { useState, useEffect } from 'react';
import { Gamepad2, Film, Calendar, Cpu, Users, Menu, X, ShieldAlert, Lock } from 'lucide-react';

export default function Navbar({ onOpenLiveModal, onOpenMiniGame, onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Games', href: '#games', icon: <Gamepad2 size={16} /> },
    { name: 'RP Lore', href: '#highlights', icon: <ShieldAlert size={16} /> },
    { name: 'Schedule', href: '#schedule', icon: <Calendar size={16} /> },
    { name: 'Videos', href: '#videos', icon: <Film size={16} /> },
    { name: 'Rig Specs', href: '#rig', icon: <Cpu size={16} /> },
    { name: 'Community', href: '#community', icon: <Users size={16} /> },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '18px 0',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(7, 7, 10, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand / Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              padding: '2px',
              background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
              boxShadow: '0 0 15px var(--neon-cyan-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/optimuz_avatar.png`}
              alt="OPTIMUZ GAMING Logo"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                background: '#0d0d11',
              }}
            />
          </div>
          <div>
            <span
              className="font-heading"
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '1.5px',
                color: '#fff',
                display: 'block',
                lineHeight: 1,
              }}
            >
              OPTIMUZ<span style={{ color: 'var(--neon-cyan)' }}> GAMING</span>
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--neon-purple)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              OFFICIAL CHANNEL
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontFamily: 'var(--font-subheading)',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </div>

        {/* Top-Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Top-Right Mini-Game Launcher Button */}
          <button
            onClick={onOpenMiniGame}
            className="cyber-button"
            style={{
              padding: '8px 18px',
              fontSize: '0.8rem',
              borderRadius: '20px',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, var(--neon-purple), #5865F2)',
              boxShadow: '0 0 15px var(--neon-purple-glow)',
            }}
          >
            <Gamepad2 size={16} />
            MINI-GAME
          </button>

          {/* Live Status CTA */}
          <button
            onClick={onOpenLiveModal}
            className="cyber-button-outline"
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <span className="live-pulse-dot" />
            <span style={{ color: '#fff', fontFamily: 'var(--font-subheading)', fontWeight: 700, letterSpacing: '1px' }}>
              LIVE
            </span>
          </button>

          {/* Secret Admin Panel Trigger */}
          <button
            onClick={onOpenAdmin}
            title="Secret Admin Panel"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              padding: '6px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-purple)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            <Lock size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'none',
              padding: '6px',
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 15, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-glass)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenMiniGame(); }}
            className="cyber-button"
            style={{ padding: '12px', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}
          >
            <Gamepad2 size={18} /> PLAY MINI-GAME &amp; LEADERBOARD
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontFamily: 'var(--font-subheading)',
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
