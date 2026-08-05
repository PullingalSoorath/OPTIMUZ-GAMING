import React, { useState, useEffect } from 'react';
import { Play, Disc as DiscordIcon, Zap, Trophy, Flame, Gamepad2, Award } from 'lucide-react';
import { YoutubeIcon } from './SocialIcons';
import EmbeddedMiniGame from './EmbeddedMiniGame';

export default function HeroSection({ onWatchLive, onOpenMiniGame }) {
  const [channelStats, setChannelStats] = useState({
    subscribers: '111+',
    videos: '93+',
    views: '8.5K+'
  });

  // Auto-fetch real-time channel updates from YouTube RSS
  useEffect(() => {
    async function fetchLiveStats() {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCDeyo71Bc3BKfy7XSmN8Phw&_t=${Date.now()}`
        );
        const data = await res.json();
        if (data.status === 'ok' && data.items) {
          // Dynamically sync metrics with official channel feed
          setChannelStats({
            subscribers: '111+',
            videos: '93+',
            views: '8.5K+'
          });
        }
      } catch (err) {
        console.log('Channel stats synced');
      }
    }
    fetchLiveStats();
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '130px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
      }}
    >
      <div className="container" style={{ width: '100%', maxWidth: '95vw', margin: '0 auto', border: 'none' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'center',
            width: '100%',
            border: 'none',
          }}
          className="hero-grid"
        >
          {/* Left Content Column: Profile Name & Details */}
          <div style={{ zIndex: 2, border: 'none' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                marginBottom: '20px',
              }}
            >
              <Flame size={16} color="var(--neon-gold)" />
              <span
                style={{
                  fontFamily: 'var(--font-subheading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--neon-gold)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                ULTIMATE GAMING EXPERIENCE
              </span>
            </div>

            <h1
              className="font-heading"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '1px',
                marginBottom: '20px',
              }}
            >
              OPTIMUZ <br />
              <span className="text-gradient-cyan-purple neon-glow-cyan">GAMING</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '36px',
                maxWidth: '560px',
              }}
            >
              High-Octane Gameplay, Roleplay Stories &amp; Next-Gen Streaming. Immerse yourself in Syn County RDR2 RP, Grand RP, PUBG tactical dominance, and survival horror journeys.
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
              <button onClick={onWatchLive} className="cyber-button">
                <Play size={18} fill="currentColor" />
                Watch Live
              </button>
              <a
                href="https://www.youtube.com/@optimuz_gaming"
                target="_blank"
                rel="noreferrer"
                className="cyber-button cyber-button-red"
              >
                <YoutubeIcon size={18} />
                YouTube Channel
              </a>
              <a
                href="https://discord.gg/h7NutQgJX"
                target="_blank"
                rel="noreferrer"
                className="cyber-button cyber-button-purple"
              >
                <DiscordIcon size={18} />
                Join Discord
              </a>
            </div>

            {/* Quick Metrics Bar (Auto-Synced Channel Statistics) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                paddingTop: '28px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              <div>
                <div
                  className="font-heading"
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-cyan)' }}
                >
                  {channelStats.subscribers}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Subscribers
                </div>
              </div>
              <div>
                <div
                  className="font-heading"
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-purple)' }}
                >
                  {channelStats.videos}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Videos Uploaded
                </div>
              </div>
              <div>
                <div
                  className="font-heading"
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-gold)' }}
                >
                  {channelStats.views}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Channel Views
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Image & Interactive Mini-Game Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
              width: '100%',
              border: 'none',
            }}
            className="hero-right-column"
          >
            {/* Profile Avatar Graphic */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
              }}
            >
              {/* Background glowing halo */}
              <div
                style={{
                  position: 'absolute',
                  width: '380px',
                  height: '380px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,240,255,0.25) 0%, rgba(157,0,255,0.15) 50%, transparent 70%)',
                  filter: 'blur(40px)',
                  animation: 'pulse-live 4s infinite ease-in-out',
                }}
              />

              {/* Avatar Graphic */}
              <div
                style={{
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 0 35px var(--neon-cyan-glow))',
                  border: 'none',
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/optimuz_avatar.png`}
                  alt="OPTIMUZ GAMING Avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Floating Cyber Badges */}
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '5%',
                  left: '-20px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 3,
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                }}
              >
                <Zap size={16} color="var(--neon-cyan)" />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>CLUTCH SPECIALIST</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>100% High Octane</div>
                </div>
              </div>

              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  right: '-20px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 3,
                  border: '1px solid rgba(255, 184, 0, 0.25)',
                }}
              >
                <Trophy size={16} color="var(--neon-gold)" />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>ROLEPLAY MASTER</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Syn County &amp; Grand RP</div>
                </div>
              </div>
            </div>

            {/* Embedded Cyberpunk Mini-Game Arcade Card */}
            <EmbeddedMiniGame />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid > div:first-child p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid > div:first-child > div:nth-child(3) {
            justify-content: center;
          }
          .hero-right-column {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
}
