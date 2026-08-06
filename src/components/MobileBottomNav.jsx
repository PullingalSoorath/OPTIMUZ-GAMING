import React from 'react';
import { Home, Gamepad2, Film, Calendar, Shield, Lock } from 'lucide-react';

export default function MobileBottomNav({ onOpenMiniGame, onOpenAdmin }) {
  const scrollTo = (id) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 180,
        background: 'rgba(7, 7, 12, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 -4px 25px rgba(0, 0, 0, 0.6)',
        padding: '8px 12px',
        display: 'none', // Shown via CSS media query on <= 899px
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {/* 1. Home */}
      <button
        onClick={() => scrollTo('')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: '0.68rem',
          fontWeight: 700,
        }}
      >
        <Home size={18} color="var(--neon-cyan)" />
        <span style={{ color: '#fff' }}>Home</span>
      </button>

      {/* 2. Games */}
      <button
        onClick={() => scrollTo('games')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: '0.68rem',
          fontWeight: 700,
        }}
      >
        <Gamepad2 size={18} color="var(--neon-purple)" />
        <span style={{ color: '#fff' }}>Games</span>
      </button>

      {/* 3. Mini-Game Launcher */}
      <button
        onClick={() => {
          scrollTo('');
          onOpenMiniGame();
        }}
        style={{
          background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 15px var(--neon-cyan-glow)',
          marginTop: '-18px',
        }}
        title="Play Mini-Game"
      >
        <Gamepad2 size={22} color="#fff" />
      </button>

      {/* 4. Videos */}
      <button
        onClick={() => scrollTo('videos')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: '0.68rem',
          fontWeight: 700,
        }}
      >
        <Film size={18} color="var(--neon-gold)" />
        <span style={{ color: '#fff' }}>Videos</span>
      </button>

      {/* 5. Secret Admin */}
      <button
        onClick={onOpenAdmin}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: '0.68rem',
          fontWeight: 700,
        }}
      >
        <Lock size={18} color="var(--neon-pink)" />
        <span style={{ color: '#fff' }}>Admin</span>
      </button>

      <style>{`
        @media (max-width: 899px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
          /* Add bottom padding to body on mobile so footer content isn't covered by bottom nav */
          body {
            padding-bottom: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
