import React, { useState, useEffect } from 'react';
import { Play, Disc as DiscordIcon, Zap, Trophy, Flame } from 'lucide-react';
import { YoutubeIcon } from './SocialIcons';
import EmbeddedMiniGame from './EmbeddedMiniGame';
import { fetchLiveYouTubeChannelStats } from '../utils/api';

export default function HeroSection({ onWatchLive, onOpenMiniGame }) {
  const [channelStats, setChannelStats] = useState({
    subscribers: '135+',
    videos: '96+',
    views: '8.8K+'
  });

  useEffect(() => {
    async function updateYouTubeStats() {
      const data = await fetchLiveYouTubeChannelStats();
      if (data && data.subscribers) {
        setChannelStats({
          subscribers: data.subscribers,
          videos: data.videos || '96+',
          views: data.views || '8.8K+'
        });
      }
    }

    updateYouTubeStats();
    const interval = setInterval(updateYouTubeStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'clamp(90px, 12vw, 130px)',
        paddingBottom: '60px',
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
      }}
    >
      <div className="container" style={{ width: '100%', maxWidth: '95vw', margin: '0 auto', border: 'none' }}>
        <div className="hero-layout-wrapper">
          
          {/* 1. DP (Profile Avatar Graphic) */}
          <div className="hero-dp-wrapper">
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
              }}
            >
              {/* Glowing Background Halo */}
              <div
                style={{
                  position: 'absolute',
                  width: 'clamp(240px, 50vw, 360px)',
                  height: 'clamp(240px, 50vw, 360px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,240,255,0.25) 0%, rgba(157,0,255,0.15) 50%, transparent 70%)',
                  filter: 'blur(35px)',
                  animation: 'pulse-live 4s infinite ease-in-out',
                }}
              />

              {/* DP Avatar Graphic */}
              <div
                style={{
                  width: 'clamp(210px, 45vw, 300px)',
                  height: 'clamp(210px, 45vw, 300px)',
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 0 30px var(--neon-cyan-glow))',
                  border: 'none',
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/optimuz_avatar.png`}
                  alt="OPTIMUZ GAMING DP Avatar"
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
                className="glass-panel floating-badge-left"
                style={{
                  position: 'absolute',
                  top: '5%',
                  left: '-10px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 3,
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                }}
              >
                <Zap size={14} color="var(--neon-cyan)" />
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#fff' }}>CLUTCH SPECIALIST</div>
                  <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>100% High Octane</div>
                </div>
              </div>

              <div
                className="glass-panel floating-badge-right"
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  right: '-10px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 3,
                  border: '1px solid rgba(255, 184, 0, 0.25)',
                }}
              >
                <Trophy size={14} color="var(--neon-gold)" />
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#fff' }}>ROLEPLAY MASTER</div>
                  <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>Syn County &amp; Grand RP</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Name & Channel Title Details */}
          <div className="hero-name-wrapper">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                marginBottom: '16px',
              }}
            >
              <Flame size={14} color="var(--neon-gold)" />
              <span
                style={{
                  fontFamily: 'var(--font-subheading)',
                  fontSize: '0.8rem',
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
              className="font-heading hero-title"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '1px',
                marginBottom: '16px',
              }}
            >
              OPTIMUZ <br />
              <span className="text-gradient-cyan-purple neon-glow-cyan">GAMING</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '24px',
                maxWidth: '560px',
              }}
            >
              High-Octane Gameplay, Roleplay Stories &amp; Next-Gen Streaming. Immerse yourself in Syn County RDR2 RP, Grand RP, PUBG tactical dominance, and survival horror journeys.
            </p>
          </div>

          {/* 3. Action Buttons (Watch Live, YouTube Channel, Join Discord) */}
          <div className="hero-buttons-wrapper">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '28px',
              }}
              className="hero-cta-group"
            >
              <button onClick={onWatchLive} className="cyber-button">
                <Play size={16} fill="currentColor" />
                Watch Live
              </button>
              <a
                href="https://www.youtube.com/@optimuz_gaming"
                target="_blank"
                rel="noreferrer"
                className="cyber-button cyber-button-red"
              >
                <YoutubeIcon size={16} />
                YouTube Channel
              </a>
              <a
                href="https://discord.gg/h7NutQgJX"
                target="_blank"
                rel="noreferrer"
                className="cyber-button cyber-button-purple"
              >
                <DiscordIcon size={16} />
                Join Discord
              </a>
            </div>
          </div>

          {/* 4. Mini-Game Arcade Card */}
          <div className="hero-game-wrapper">
            <EmbeddedMiniGame />
          </div>

          {/* 5. Metrics Bar (Subscribers, Videos, Views) */}
          <div className="hero-metrics-wrapper">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: 'none',
                borderRight: 'none',
                width: '100%',
              }}
            >
              <div>
                <div
                  className="font-heading"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: 'var(--neon-cyan)' }}
                >
                  {channelStats.subscribers}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Subscribers
                </div>
              </div>
              <div>
                <div
                  className="font-heading"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: 'var(--neon-purple)' }}
                >
                  {channelStats.videos}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Videos Uploaded
                </div>
              </div>
              <div>
                <div
                  className="font-heading"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: 'var(--neon-gold)' }}
                >
                  {channelStats.views}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Channel Views
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* DESKTOP LAYOUT (>= 900px): 2-Column Side-by-Side Widescreen */
        @media (min-width: 900px) {
          .hero-layout-wrapper {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            grid-template-areas:
              "name dp"
              "buttons game"
              "metrics game";
            gap: 24px 60px;
            align-items: center;
          }
          .hero-name-wrapper { grid-area: name; }
          .hero-dp-wrapper { grid-area: dp; display: flex; justify-content: center; }
          .hero-buttons-wrapper { grid-area: buttons; }
          .hero-metrics-wrapper { grid-area: metrics; }
          .hero-game-wrapper { grid-area: game; display: flex; justify-content: center; }
        }

        /* TABLET & SMARTPHONE LAYOUT (< 900px): Exact Requested Vertical Order */
        /* Order: 1. DP -> 2. Name -> 3. Buttons -> 4. Game -> 5. Metrics */
        @media (max-width: 899px) {
          .hero-layout-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 28px;
            width: 100%;
          }
          .hero-dp-wrapper { order: 1; }
          .hero-name-wrapper { order: 2; }
          .hero-name-wrapper p { margin-left: auto; margin-right: auto; }
          .hero-buttons-wrapper { order: 3; width: 100%; }
          .hero-cta-group { justify-content: center; }
          .hero-cta-group > * {
            flex: 1 1 100%;
            max-width: 320px;
            margin: 0 auto;
          }
          .hero-game-wrapper { order: 4; width: 100%; display: flex; justify-content: center; }
          .hero-metrics-wrapper { order: 5; width: 100%; }
          .floating-badge-left { left: 0px !important; }
          .floating-badge-right { right: 0px !important; }
        }
      `}</style>
    </section>
  );
}
