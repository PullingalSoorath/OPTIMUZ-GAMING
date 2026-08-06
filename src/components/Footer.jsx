import React from 'react';
import { Disc as DiscordIcon, ArrowUp, Flame } from 'lucide-react';
import { YoutubeIcon, TwitchIcon, InstagramIcon, TwitterIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialPlatforms = [
    { name: 'YouTube', url: 'https://www.youtube.com/@optimuz_gaming', icon: <YoutubeIcon size={20} />, color: '#FF0000' },
    { name: 'Kick', url: 'https://kick.com/optimuz-gaming', icon: <Flame size={20} />, color: '#53FC18' },
    { name: 'Discord', url: 'https://discord.gg/h7NutQgJX', icon: <DiscordIcon size={20} />, color: '#5865F2' },
    { name: 'Twitch', url: 'https://twitch.tv', icon: <TwitchIcon size={20} />, color: '#9146FF' },
    { name: 'Instagram', url: 'https://www.instagram.com/optimuz_gaming_/', icon: <InstagramIcon size={20} />, color: '#E1306C' },
    { name: 'Twitter (X)', url: 'https://x.com', icon: <TwitterIcon size={20} />, color: '#1DA1F2' },
  ];

  return (
    <footer
      style={{
        background: '#050508',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        paddingTop: '60px',
        paddingBottom: '80px', /* Extra padding for mobile bottom bar */
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Top Footer Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Logo & Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
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
                alt="OPTIMUZ GAMING Avatar"
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
              <div className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff' }}>
                OPTIMUZ <span style={{ color: 'var(--neon-cyan)' }}>GAMING</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Next-Gen Content Creator &amp; Roleplay Storyteller
              </div>
            </div>
          </div>

          {/* Social Platform Icon Grid */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {socialPlatforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                title={p.name}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.color;
                  e.currentTarget.style.color = p.color;
                  e.currentTarget.style.boxShadow = `0 0 15px ${p.color}`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {p.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} OPTIMUZ GAMING. All Rights Reserved. Built with Cyberpunk Precision.
          </div>

          <button
            onClick={scrollToTop}
            className="cyber-button-outline"
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowUp size={14} /> TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
