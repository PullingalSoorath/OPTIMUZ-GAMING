import React from 'react';
import { Disc as DiscordIcon, Users, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function CommunityBanner() {
  return (
    <section id="community" style={{ padding: '60px 0' }}>
      <div className="container">
        <div
          className="glass-panel"
          style={{
            borderRadius: '24px',
            padding: '56px 40px',
            background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(157, 0, 255, 0.1) 50%, rgba(0, 240, 255, 0.05) 100%)',
            border: '1px solid rgba(88, 101, 242, 0.4)',
            boxShadow: '0 0 50px rgba(88, 101, 242, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(88, 101, 242, 0.3) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '40px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
            className="community-grid"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(88, 101, 242, 0.2)',
                  border: '1px solid rgba(88, 101, 242, 0.4)',
                  marginBottom: '16px',
                }}
              >
                <Users size={16} color="#5865F2" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>
                  14,280 SOLDIERS ONLINE NOW
                </span>
              </div>

              <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '16px' }}>
                JOIN THE OPTIMUZ GAMING <br />
                <span style={{ color: '#5865F2' }}>ARMY ON DISCORD</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '580px', lineHeight: 1.6 }}>
                Get instant stream alerts, participate in community game nights, suggest RP storylines, and hang out with the crew in 24/7 active voice channels.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <a
                href="https://discord.gg/h7NutQgJX"
                target="_blank"
                rel="noreferrer"
                className="cyber-button cyber-button-discord"
                style={{ padding: '16px 36px', fontSize: '1.05rem', width: '100%', justifyContent: 'center' }}
              >
                <DiscordIcon size={22} />
                ENTER DISCORD HQ
                <ArrowUpRight size={18} />
              </a>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare size={14} color="var(--neon-green)" /> Daily Giveaways
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} color="var(--neon-cyan)" /> LFG Squad Finding
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .community-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .community-grid > div:last-child {
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
}
