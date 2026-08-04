import React, { useState } from 'react';
import { Gamepad2, Sparkles, X, ChevronRight, Trophy, Users, Shield } from 'lucide-react';

export default function GamesShowcase() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showExpansionModal, setShowExpansionModal] = useState(false);

  const games = [
    {
      id: 'pubg-bgmi',
      title: 'PUBG PC & BGMI',
      category: 'Battle Royale Mainstays',
      image: '/assets/pubg.png',
      tag: 'COMPETITIVE',
      tagColor: 'var(--neon-cyan)',
      role: 'Squad Leader & Main Fragger',
      stats: '1500+ Wins | Top Tier Clutching',
      description: 'Tactical survival, intense squad communications, and high-IQ clutch plays in PUBG PC and BGMI. From Pochinki drops to Miramar sniper showdowns.',
      highlights: ['Custom Room Tournaments', '1v4 Clutch Highlight Reels', 'Rank Push Live Streams']
    },
    {
      id: 'rdr2-rp',
      title: 'Red Dead Redemption RP',
      category: 'Syn County Server',
      image: '/assets/rdr2.png',
      tag: 'ROLEPLAY LORE',
      tagColor: 'var(--neon-gold)',
      role: 'Outlaw Gunslinger / Sheriff',
      stats: '500+ Hours Character Arc',
      description: 'Immersive Wild West storytelling in Syn County RP. Deep character arcs, heist planning, campfire lore, and high-stakes law enforcement encounters.',
      highlights: ['Valentine Bank Robbery Arc', 'Dusty Gunslinger Showdowns', 'Custom Server Storylines']
    },
    {
      id: 'gta-rp',
      title: 'GTA V RP',
      category: 'Grand RP Server',
      image: '/assets/gta.png',
      tag: 'CITY CRIME',
      tagColor: 'var(--neon-purple)',
      role: 'Syndicate Boss / High Speed Driver',
      stats: 'Grand RP Legend Status',
      description: 'High-speed pursuits, crime empire management, multi-million dollar business deals, and hilarious encounters across Grand RP server.',
      highlights: ['Police Pursuit Evasions', 'Gang Territory Wars', 'Custom Luxury Car Collection']
    },
    {
      id: 'sons-forest',
      title: 'Sons Of The Forest',
      category: 'Survival & Horror',
      image: '/assets/forest.png',
      tag: 'HARDCORE SURVIVAL',
      tagColor: 'var(--neon-pink)',
      role: 'Base Engineer & Explorer',
      stats: 'Hardcore Mutant Hunter',
      description: 'Co-op survival horror deep inside mutant-infested wilderness. Fortress building, cave exploration, and intense night survival battles.',
      highlights: ['Multi-Level Fortress Build', 'Bunker Exploration Runs', 'Night Mutated Waves']
    },
    {
      id: 'mecha-break',
      title: 'Mecha Break / Mecca Chameleon',
      category: 'Next-Gen Mecha Combat',
      image: '/assets/mecha.png',
      tag: 'ARENA PILOT',
      tagColor: 'var(--neon-cyan)',
      role: 'Ace Combat Mech Pilot',
      stats: '95% Arena Win Rate',
      description: 'High-speed aerial arena dogfights with heavy plasma shields, laser cannons, and lightning-fast dodge maneuvers in Mecha Break.',
      highlights: ['3v3 Arena Championship', 'Custom Mech Paint Customization', 'High-Speed Thruster Maneuvers']
    }
  ];

  const expansionGames = [
    { name: 'Cyberpunk 2077', genre: 'Sci-Fi Action RPG', hours: '200+ hrs' },
    { name: 'Valorant', genre: 'Tactical FPS', hours: 'Peak Diamond' },
    { name: 'Call of Duty: Warzone', genre: 'Battle Royale', hours: 'High Kill Squad' },
    { name: 'Apex Legends', genre: 'Hero Shooter', hours: 'Predator Push' },
    { name: 'Elden Ring', genre: 'Action Souls-like', hours: '100% Boss Defeated' },
    { name: 'Ghost of Tsushima', genre: 'Samurai Action', hours: 'Lethal Difficulty' }
  ];

  return (
    <section id="games">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="cyber-tag" style={{ display: 'inline-block', marginBottom: '12px' }}>
            FEATURED GAMEPLAY
          </div>
          <h2 className="section-title text-gradient-cyan-purple">
            MY MAIN TITLES
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From high-octane battle royales to deep roleplay sagas and hardcore survival builds.
          </p>
        </div>

        {/* Grid Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
            width: '100%',
          }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => setSelectedGame(game)}
            >
              {/* Cover Image Container */}
              <div
                style={{
                  height: '240px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={game.image}
                  alt={game.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                  }}
                >
                  <span
                    className="cyber-tag"
                    style={{
                      borderColor: game.tagColor,
                      color: game.tagColor,
                      background: 'rgba(7, 7, 10, 0.8)',
                    }}
                  >
                    {game.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                    {game.category}
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '12px' }}>
                    {game.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {game.role}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--neon-cyan)' }}>
                    {game.stats}
                  </span>
                  <ChevronRight size={18} color="var(--neon-cyan)" />
                </div>
              </div>
            </div>
          ))}

          {/* "And Many More..." Expansion Card */}
          <div
            className="glass-panel"
            onClick={() => setShowExpansionModal(true)}
            style={{
              borderRadius: '16px',
              cursor: 'pointer',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '32px',
              border: '2px dashed var(--border-glass)',
              background: 'rgba(157, 0, 255, 0.04)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(157, 0, 255, 0.15)',
                border: '1px solid var(--neon-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 0 20px var(--neon-purple-glow)',
              }}
            >
              <Sparkles size={28} color="var(--neon-purple)" />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              AND MANY MORE...
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '240px', marginBottom: '20px' }}>
              Explore the extended games library and stream archives.
            </p>
            <span className="cyber-button-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              VIEW LIBRARY
            </span>
          </div>
        </div>
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '600px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGame(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            <img
              src={selectedGame.image}
              alt={selectedGame.title}
              style={{ width: '100%', height: '240px', objectFit: 'cover' }}
            />

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span className="cyber-tag">{selectedGame.tag}</span>
                <span className="cyber-tag-purple">{selectedGame.category}</span>
              </div>

              <h2 className="font-heading" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
                {selectedGame.title}
              </h2>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                {selectedGame.description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neon-cyan)', marginBottom: '8px' }}>
                  KEY HIGHLIGHTS:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedGame.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-cyan)' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#videos" onClick={() => setSelectedGame(null)} className="cyber-button" style={{ width: '100%' }}>
                WATCH GAMEPLAY CLIPS
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Expansion Library Modal */}
      {showExpansionModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setShowExpansionModal(false)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '650px',
              width: '100%',
              borderRadius: '20px',
              padding: '36px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowExpansionModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Gamepad2 size={28} color="var(--neon-purple)" />
              <h2 className="font-heading" style={{ fontSize: '1.6rem', color: '#fff' }}>
                EXTENDED GAMES LIBRARY
              </h2>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>
              Additional titles frequently played on stream, special challenge runs, and co-op gaming sessions.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {expansionGames.map((g) => (
                <div
                  key={g.name}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>
                    {g.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>
                    {g.genre}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {g.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
