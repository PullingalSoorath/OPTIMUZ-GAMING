import React, { useState } from 'react';
import { Calendar, ShieldAlert, Cpu, Clock, CheckCircle2, Award, Zap, HardDrive, Monitor, Mic } from 'lucide-react';

export default function HighlightsSection() {
  const [activeTab, setActiveTab] = useState('lore');

  const scheduleDays = [
    { day: 'MONDAY', game: 'GTA V RP - Grand RP', time: '10:00 PM IST', status: 'UPCOMING' },
    { day: 'TUESDAY', game: 'PUBG PC Squad Rank Push', time: '10:00 PM IST', status: 'UPCOMING' },
    { day: 'WEDNESDAY', game: 'RDR2 RP - Syn County Lore', time: '10:00 PM IST', status: 'UPCOMING' },
    { day: 'THURSDAY', game: 'BGMI Community Tourneys', time: '10:00 PM IST', status: 'UPCOMING' },
    { day: 'FRIDAY', game: 'Sons Of The Forest Co-Op', time: '10:00 PM IST', status: 'UPCOMING' },
    { day: 'SATURDAY', game: 'Weekend RP Extravaganza', time: '10:00 PM IST', status: 'FEATURED' },
    { day: 'SUNDAY', game: 'Viewer Games & Mecha Arena', time: '10:00 PM IST', status: 'UPCOMING' },
  ];

  const rpLoreProfiles = [
    {
      server: 'RED DEAD REDEMPTION RP (SYN COUNTY)',
      character: 'Arthur "Gunslinger" Optimuz',
      faction: 'The Blackwater Outlaws',
      reputation: 'LEGENDARY OUTLAW',
      quote: '"A revolver doesn\'t lie, and neither do I. We take what\'s ours or die trying."',
      backstory:
        'Emerging from the dust of Valentine, Arthur built a reputation as the fastest trigger in Syn County. Known for orchestrating high-stakes train heists and holding down territory against corrupt law enforcement.',
      badges: ['Master Marksman', 'Train Heist Specialist', 'Bounty Survivor']
    },
    {
      server: 'GTA V RP (GRAND RP)',
      character: 'Vinnie "Optimuz" Moretti',
      faction: 'Moretti Crime Syndicate',
      reputation: 'SYNDICATE KINGPIN',
      quote: '"Loyalty isn\'t bought with cash; it\'s earned on these streets."',
      backstory:
        'Rising from a street racer in Los Santos to owning high-end night clubs and luxury auto imports in Grand RP. Vinnie controls the city\'s high-stakes underground economy.',
      badges: ['Getaway Driver', 'Syndicate Leader', 'Billionaire Empire']
    }
  ];

  const rigSpecs = [
    { category: 'GRAPHICS CARD', name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', icon: <Zap color="var(--neon-cyan)" /> },
    { category: 'PROCESSOR', name: 'AMD Ryzen 9 7950X3D (16-Core 4.5GHz)', icon: <Cpu color="var(--neon-purple)" /> },
    { category: 'RAM & STORAGE', name: '64GB DDR5 6000MHz RGB + 4TB NVMe M.2 SSD', icon: <HardDrive color="var(--neon-gold)" /> },
    { category: 'MONITOR SETUP', name: 'Dual ASUS ROG Swift 27" 240Hz OLED', icon: <Monitor color="var(--neon-cyan)" /> },
    { category: 'AUDIO & MIC', name: 'Shure SM7B + TC Helicon GoXLR Broadcast Mixer', icon: <Mic color="var(--neon-pink)" /> },
  ];

  return (
    <section id="highlights" style={{ background: 'rgba(10, 10, 15, 0.5)', border: 'none' }}>
      <div className="container" style={{ width: '100%', maxWidth: '1720px', margin: '0 auto', border: 'none' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="cyber-tag" style={{ display: 'inline-block', marginBottom: '12px' }}>
            CHANNEL COMMAND CENTER
          </div>
          <h2 className="section-title text-gradient-cyan-purple">
            HIGHLIGHTS &amp; COMMAND LORE
          </h2>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setActiveTab('lore')}
            className={`cyber-button ${activeTab === 'lore' ? '' : 'cyber-button-outline'}`}
            style={{ padding: '12px 24px', fontSize: '0.9rem' }}
          >
            <ShieldAlert size={18} />
            RP LORE DOSSIERS
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`cyber-button ${activeTab === 'schedule' ? '' : 'cyber-button-outline'}`}
            style={{ padding: '12px 24px', fontSize: '0.9rem' }}
          >
            <Calendar size={18} />
            STREAM SCHEDULE
          </button>
          <button
            onClick={() => setActiveTab('rig')}
            className={`cyber-button ${activeTab === 'rig' ? '' : 'cyber-button-outline'}`}
            style={{ padding: '12px 24px', fontSize: '0.9rem' }}
          >
            <Cpu size={18} />
            GAMING RIG SPECS
          </button>
        </div>

        {/* Tab 1: RP Lore Profiles */}
        {activeTab === 'lore' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px',
              border: 'none',
            }}
          >
            {rpLoreProfiles.map((lore, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '36px',
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: idx === 0 ? 'var(--neon-gold)' : 'var(--neon-purple)',
                    marginBottom: '8px',
                    letterSpacing: '1px',
                  }}
                >
                  {lore.server}
                </div>
                <h3 className="font-heading" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                  {lore.character}
                </h3>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <span className="cyber-tag">{lore.faction}</span>
                  <span className="cyber-tag-gold">{lore.reputation}</span>
                </div>

                <div
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: '#e2e8f0',
                    marginBottom: '20px',
                  }}
                >
                  {lore.quote}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  {lore.backstory}
                </p>

                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--neon-cyan)', marginBottom: '10px' }}>
                    CHARACTER BADGES:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {lore.badges.map((b, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          background: 'rgba(0, 240, 255, 0.1)',
                          border: '1px solid rgba(0, 240, 255, 0.25)',
                          color: '#fff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Award size={12} color="var(--neon-cyan)" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Stream Schedule */}
        {activeTab === 'schedule' && (
          <div id="schedule" className="glass-panel" style={{ padding: '36px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: '#fff' }}>
                  WEEKLY BROADCAST SCHEDULE
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  All stream times displayed in IST (Indian Standard Time).
                </p>
              </div>
              <span className="cyber-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> LIVE 6 DAYS A WEEK
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {scheduleDays.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr 140px 120px',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    background: item.status === 'FEATURED' ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: item.status === 'FEATURED' ? '1px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                  className="schedule-row"
                >
                  <div className="font-heading" style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                    {item.day}
                  </div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item.game}</div>
                  <div style={{ color: 'var(--neon-gold)', fontFamily: 'var(--font-subheading)', fontWeight: 700 }}>
                    {item.time}
                  </div>
                  <div>
                    {item.status === 'FEATURED' && (
                      <span className="cyber-tag" style={{ background: 'var(--neon-pink)', color: '#fff', borderColor: 'transparent' }}>
                        🔥 MUST WATCH
                      </span>
                    )}
                    {item.status === 'COMPLETED' && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={14} /> DONE
                      </span>
                    )}
                    {item.status === 'UPCOMING' && (
                      <span className="cyber-tag-purple" style={{ fontSize: '0.75rem' }}>
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Gaming Rig Specs */}
        {activeTab === 'rig' && (
          <div id="rig" className="glass-panel" style={{ padding: '36px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '24px' }}>
              THE OPTIMUZ GAMING BATTLESTATION
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {rigSpecs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.4)' }}>
                    {spec.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {spec.category}
                    </div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                      {spec.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .schedule-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
