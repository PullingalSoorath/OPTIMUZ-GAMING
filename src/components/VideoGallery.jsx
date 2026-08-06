import React, { useState, useEffect } from 'react';
import { Play, Eye, Clock, RefreshCw } from 'lucide-react';
import { YoutubeIcon } from './SocialIcons';

export default function VideoGallery() {
  const channelId = 'UCDeyo71Bc3BKfy7XSmN8Phw';

  // Pre-populated real recent videos from @optimuz_gaming channel
  const initialVideos = [
    {
      id: 'pY2ICSrQ7SU',
      title: 'ഒളിച്ചു കളിക്കാം ഗയ്സ്! | #OPTIMUZGAMING',
      category: 'MECCA CHAMELEON',
      views: 'Live Stream',
      duration: 'STREAM',
      date: 'Aug 3, 2026',
      thumbnail: 'https://i.ytimg.com/vi/pY2ICSrQ7SU/hqdefault.jpg',
      description: 'High-octane Mecca Chameleon hide and seek gameplay live stream on OPTIMUZ GAMING!'
    },
    {
      id: '0SyL0Nl64Tk',
      title: 'കണ്ടുപിടിക്കാൻ പറ്റിയില്ലെങ്കിൽ സബ്‌സ്‌ക്രൈബ് ചെയ്യണം! 😎 | Live #meccachameleon',
      category: 'MECCA CHAMELEON',
      views: '357 views',
      duration: 'STREAM',
      date: 'Aug 2, 2026',
      thumbnail: 'https://i.ytimg.com/vi/0SyL0Nl64Tk/hqdefault.jpg',
      description: 'Epic Mecca Chameleon hide and seek challenge stream with Malayalam live commentary.'
    },
    {
      id: 'pFLnnF4Pw9o',
      title: 'MLYS Clan Scrims Live | One Team • One Aim • One Legacy',
      category: 'COMPETITIVE',
      views: '37 views',
      duration: 'STREAM',
      date: 'Aug 2, 2026',
      thumbnail: 'https://i.ytimg.com/vi/pFLnnF4Pw9o/hqdefault.jpg',
      description: 'MLYS Clan tournament scrims live dominance. High-IQ rotations and team coordination.'
    },
    {
      id: 'X9rlmG-B_sg',
      title: 'ഒരു ഗതിയും ഇല്ലാത്തതുകൊണ്ട് പട്ടിപ്പണി എടുക്കുന്നു! 💸🐴 | Red Dead Redemption RP',
      category: 'RDR2 RP',
      views: '54 views',
      duration: 'HIGHLIGHT',
      date: 'Jul 28, 2026',
      thumbnail: 'https://i.ytimg.com/vi/X9rlmG-B_sg/hqdefault.jpg',
      description: 'Arthur Optimuz takes on hard labor and outlaw hustles in Syn County Wild West Roleplay.'
    },
    {
      id: 'cxWYJ65VyY4',
      title: 'പട്ടിപ്പണിക്ക് പോവാം ഗയ്സ്! 🤠 | 🐎Third Day in RDR RP! Syn County',
      category: 'RDR2 RP',
      views: '52 views',
      duration: 'RP EPISODE',
      date: 'Jul 28, 2026',
      thumbnail: 'https://i.ytimg.com/vi/cxWYJ65VyY4/hqdefault.jpg',
      description: 'Day 3 in Syn County RP. Exploring the frontier, earning gold, and encountering rival outlaws.'
    },
    {
      id: 't5UNyZx0w7Y',
      title: 'കുതിരയെ വാങ്ങാൻ പോവാം ഗയ്‌സ് 🐎First Day in RDR RP! Syn County',
      category: 'RDR2 RP',
      views: '72 views',
      duration: 'RP EPISODE',
      date: 'Jul 21, 2026',
      thumbnail: 'https://i.ytimg.com/vi/t5UNyZx0w7Y/hqdefault.jpg',
      description: 'The journey begins in Syn County RDR2 Roleplay! Buying the first horse and settling in Valentine.'
    },
    {
      id: 'veD7ps2xDeo',
      title: 'എന്നതാടാ ഇത്, പച്ചിലപ്പാമ്പോ? | MECCHA CHAMELEON',
      category: 'MECCA CHAMELEON',
      views: '1,066 views',
      duration: 'VIRAL CLIP',
      date: 'Jul 6, 2026',
      thumbnail: 'https://i.ytimg.com/vi/veD7ps2xDeo/hqdefault.jpg',
      description: 'Insane stealth camo hiding spot in Mecca Chameleon! Over 1K views.'
    },
    {
      id: 'M9elK6hOkMQ',
      title: 'ഒളിച്ചു കളി തുടങ്ങാം! പറ്റുമെങ്കിൽ കണ്ടുപിടിക്കെടാ Day 6 | Meccha Chameleon',
      category: 'MECCA CHAMELEON',
      views: '451 views',
      duration: 'STREAM',
      date: 'Jul 6, 2026',
      thumbnail: 'https://i.ytimg.com/vi/M9elK6hOkMQ/hqdefault.jpg',
      description: 'Day 6 hide-and-seek battle in Mecca Chameleon.'
    }
  ];

  const [videos, setVideos] = useState(initialVideos);
  const [currentVideo, setCurrentVideo] = useState(initialVideos[0]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(false);

  // Live RSS Feed auto-fetch with real-time polling
  useEffect(() => {
    async function fetchLiveFeed() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}&_t=${Date.now()}`
        );
        const data = await response.json();
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const liveFetched = data.items.map((item) => {
            const videoId = item.guid.replace('yt:video:', '');
            let cat = 'MECCA CHAMELEON';
            const lowerTitle = item.title.toLowerCase();
            if (lowerTitle.includes('rdr') || lowerTitle.includes('red dead')) {
              cat = 'RDR2 RP';
            } else if (lowerTitle.includes('gta') || lowerTitle.includes('grand rp')) {
              cat = 'GTA RP';
            } else if (lowerTitle.includes('scrim') || lowerTitle.includes('bgmi') || lowerTitle.includes('pubg')) {
              cat = 'COMPETITIVE';
            }

            return {
              id: videoId,
              title: item.title,
              category: cat,
              views: 'Official Upload',
              duration: 'WATCH NOW',
              date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              description: `Latest official upload on @optimuz_gaming YouTube channel.`
            };
          });

          setVideos(liveFetched);
          setCurrentVideo(liveFetched[0]);
        }
      } catch (err) {
        console.log('Using fallback video feed:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveFeed();
    const interval = setInterval(fetchLiveFeed, 180000);
    return () => clearInterval(interval);
  }, []);

  const filteredVideos =
    activeCategory === 'ALL'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <section id="videos">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="cyber-tag" style={{ display: 'inline-block', marginBottom: '12px' }}>
            🔴 LIVE CHANNEL FEED (@OPTIMUZ_GAMING)
          </div>
          <h2 className="section-title text-gradient-cyan-purple">
            LATEST UPLOADS &amp; STREAMS
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Real-time video feed synchronized directly with official <strong>OPTIMUZ GAMING</strong> YouTube channel.
          </p>
        </div>

        {/* Featured Main Video Player */}
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(16px, 3vw, 24px)',
            borderRadius: '20px',
            marginBottom: '36px',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 0 35px rgba(0, 240, 255, 0.15)',
          }}
        >
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              background: '#000',
              marginBottom: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=1&rel=0`}
              title={currentVideo.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Player Info Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ flex: '1 1 280px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="cyber-tag">{currentVideo.category}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={14} color="var(--neon-cyan)" /> {currentVideo.views}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} color="var(--neon-purple)" /> {currentVideo.date}
                </span>
              </div>
              <h3 className="font-heading" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#fff', marginBottom: '6px' }}>
                {currentVideo.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                {currentVideo.description}
              </p>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${currentVideo.id}`}
              target="_blank"
              rel="noreferrer"
              className="cyber-button-outline"
              style={{ padding: '8px 16px', fontSize: '0.8rem', whiteSpace: 'nowrap', width: 'auto' }}
            >
              <YoutubeIcon size={14} /> WATCH ON YOUTUBE
            </a>
          </div>
        </div>

        {/* Playlist Category Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
            {['ALL', 'MECCA CHAMELEON', 'RDR2 RP', 'COMPETITIVE'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  cursor: 'pointer',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-subheading)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: activeCategory === cat ? 'none' : '1px solid rgba(0, 240, 255, 0.2)',
                  background: activeCategory === cat ? 'linear-gradient(135deg, var(--neon-cyan), #00b8ff)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeCategory === cat ? 'var(--bg-dark)' : 'var(--neon-cyan)',
                  boxShadow: activeCategory === cat ? '0 0 15px var(--neon-cyan-glow)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} color="var(--neon-cyan)" />
            {loading ? 'Syncing...' : 'Auto-Synced'}
          </div>
        </div>

        {/* Playlist Feed Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            width: '100%',
          }}
        >
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="glass-panel"
              style={{
                borderRadius: '14px',
                cursor: 'pointer',
                overflow: 'hidden',
                border: currentVideo.id === video.id ? '2px solid var(--neon-cyan)' : '1px solid var(--border-glass)',
                boxShadow: currentVideo.id === video.id ? '0 0 20px rgba(0, 240, 255, 0.3)' : 'none',
                transition: 'all 0.3s ease',
              }}
              onClick={() => {
                setCurrentVideo(video);
                window.scrollTo({ top: document.getElementById('videos').offsetTop + 100, behavior: 'smooth' });
              }}
            >
              <div style={{ position: 'relative', height: '175px' }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: currentVideo.id === video.id ? 1 : 0.75,
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 15px var(--neon-cyan-glow)',
                    }}
                  >
                    <Play size={18} fill="#07070a" color="#07070a" />
                  </div>
                </div>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(7, 7, 10, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    color: 'var(--neon-cyan)',
                    fontWeight: 700,
                  }}
                >
                  {video.duration}
                </span>
              </div>

              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--neon-cyan)', marginBottom: '4px' }}>
                  {video.category}
                </div>
                <h4
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.4,
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {video.title}
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {video.date} • {video.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
