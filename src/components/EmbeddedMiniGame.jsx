import React, { useState, useEffect, useRef } from 'react';
import { Play, Trophy, RotateCcw, Send, Award, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { fetchLeaderboard, submitScore } from '../utils/api';
import { audioSynth } from '../utils/audio';
import { trackUserEvent } from '../utils/tracker';

export default function EmbeddedMiniGame() {
  const [activeTab, setActiveTab] = useState('game'); // 'game' | 'leaderboard'
  const [gameState, setGameState] = useState('start'); // 'start' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [muted, setMuted] = useState(false);

  const canvasRef = useRef(null);
  const timerRef = useRef(null);
  const gameLoopRef = useRef(null);

  const gameData = useRef({
    targets: [],
    particles: [],
    score: 0,
    combo: 1,
    lastHitTime: 0,
    timePlayed: 30
  });

  useEffect(() => {
    loadLeaderboardData();
    const savedName = localStorage.getItem('optimuz_player_name');
    if (savedName) setPlayerName(savedName);
  }, [activeTab]);

  async function loadLeaderboardData() {
    const data = await fetchLeaderboard();
    setLeaderboard(data);
  }

  const handleToggleMute = () => {
    const isMuted = audioSynth.toggleMute();
    setMuted(isMuted);
  };

  const startGame = () => {
    setActiveTab('game');
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setCombo(1);
    setSubmitted(false);

    gameData.current = {
      targets: [],
      particles: [],
      score: 0,
      combo: 1,
      lastHitTime: Date.now(),
      timePlayed: 30
    };

    trackUserEvent('Started Direct Mini-Game', 'Home Section Arcade');

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(gameLoopRef.current);
    setGameState('gameover');
    setScore(gameData.current.score);
    audioSynth.playGameOver();
    trackUserEvent('Finished Direct Mini-Game', `Final Score: ${gameData.current.score}`);
  };

  // Canvas Game Loop for embedded card
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    const width = canvas.width;
    const height = canvas.height;

    let spawnTimer = 0;

    const spawnTarget = () => {
      const isGold = Math.random() > 0.75;
      const radius = isGold ? 18 : Math.floor(Math.random() * 10) + 18;
      gameData.current.targets.push({
        x: Math.random() * (width - 60) + 30,
        y: Math.random() * (height - 60) + 30,
        radius,
        color: isGold ? '#FFB800' : Math.random() > 0.5 ? '#00F0FF' : '#9D00FF',
        isGold,
        points: isGold ? 300 : 100,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
      });
    };

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      audioSynth.playLaser();

      let hit = false;
      const targets = gameData.current.targets;

      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        const dist = Math.hypot(t.x - clickX, t.y - clickY);
        if (dist <= t.radius) {
          hit = true;

          const now = Date.now();
          if (now - gameData.current.lastHitTime < 1200) {
            gameData.current.combo = Math.min(gameData.current.combo + 1, 5);
          } else {
            gameData.current.combo = 1;
          }
          gameData.current.lastHitTime = now;

          const addedScore = t.points * gameData.current.combo;
          gameData.current.score += addedScore;
          setScore(gameData.current.score);
          setCombo(gameData.current.combo);

          if (gameData.current.combo >= 3) {
            audioSynth.playCombo();
          } else {
            audioSynth.playHit();
          }

          for (let p = 0; p < 12; p++) {
            gameData.current.particles.push({
              x: t.x,
              y: t.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              radius: Math.random() * 3 + 1,
              color: t.color,
              life: 1.0,
            });
          }

          targets.splice(i, 1);
          break;
        }
      }

      if (!hit) {
        gameData.current.combo = 1;
        setCombo(1);
      }
    };

    canvas.addEventListener('mousedown', handleCanvasClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      spawnTimer++;
      if (spawnTimer % 30 === 0 && gameData.current.targets.length < 6) {
        spawnTarget();
      }

      const targets = gameData.current.targets;
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        t.x += t.vx;
        t.y += t.vy;

        if (t.x < t.radius || t.x > width - t.radius) t.vx *= -1;
        if (t.y < t.radius || t.y > height - t.radius) t.vy *= -1;

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = t.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      const particles = gameData.current.particles;
      for (let p = particles.length - 1; p >= 0; p--) {
        const pt = particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.04;

        if (pt.life <= 0) {
          particles.splice(p, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      gameLoopRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousedown', handleCanvasClick);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState]);

  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!playerName.trim() || submitted) return;

    localStorage.setItem('optimuz_player_name', playerName.trim());
    const res = await submitScore(playerName.trim(), score, 30);

    setSubmitted(true);
    setLeaderboard(res.leaderboard);
    setActiveTab('leaderboard');
    trackUserEvent('Submitted Score Direct', `${playerName}: ${score}`);
  };

  return (
    <div
      className="glass-panel"
      style={{
        width: '100%',
        maxWidth: '540px',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid var(--neon-purple)',
        boxShadow: '0 0 35px var(--neon-purple-glow)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Mini-Game Card Title & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('game')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: activeTab === 'game' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeTab === 'game' ? 'var(--neon-purple)' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            ARCADE GAME
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: activeTab === 'leaderboard' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeTab === 'leaderboard' ? 'var(--neon-gold)' : 'transparent',
              color: activeTab === 'leaderboard' ? 'var(--bg-dark)' : 'var(--neon-gold)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Trophy size={14} /> LEADERBOARD
          </button>
        </div>

        <button
          onClick={handleToggleMute}
          style={{
            background: 'transparent',
            border: 'none',
            color: muted ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            cursor: 'pointer',
            padding: '4px',
          }}
          title={muted ? 'Unmute SFX' : 'Mute SFX'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* GAME TAB */}
      {activeTab === 'game' && (
        <div>
          {/* START STATE */}
          {gameState === 'start' && (
            <div style={{ padding: '20px 10px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', marginBottom: '8px' }} className="font-heading">
                CYBER TARGET BLASTER <span style={{ color: 'var(--neon-cyan)' }}>2077</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Blast neon targets directly on the home page! Score points &amp; claim top rank on the Leaderboard.
              </p>
              <button onClick={startGame} className="cyber-button cyber-button-purple" style={{ padding: '14px 36px', fontSize: '1rem' }}>
                <Play size={18} fill="currentColor" /> START GAME
              </button>
            </div>
          )}

          {/* PLAYING STATE */}
          {gameState === 'playing' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>
                <span style={{ color: 'var(--neon-cyan)' }}>SCORE: {score}</span>
                <span style={{ color: combo > 1 ? 'var(--neon-gold)' : 'var(--text-muted)' }}>x{combo} COMBO</span>
                <span style={{ color: timeLeft <= 5 ? 'var(--neon-pink)' : 'var(--neon-green)' }}>{timeLeft}s</span>
              </div>

              <div style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', background: '#050508', border: '1px solid var(--neon-cyan)' }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%', cursor: 'crosshair' }} />
              </div>
            </div>
          )}

          {/* GAME OVER STATE */}
          {gameState === 'gameover' && (
            <div style={{ padding: '16px 10px' }}>
              <Trophy size={36} color="var(--neon-gold)" style={{ marginBottom: '8px' }} />
              <div className="font-heading" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>
                GAME OVER!
              </div>
              <div style={{ fontSize: '1.2rem', color: 'var(--neon-cyan)', fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
                SCORE: {score} PTS
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmitScore} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    placeholder="Your Display Name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    required
                    maxLength={18}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--neon-cyan)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                  <button type="submit" className="cyber-button" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                    <Send size={14} /> SUBMIT
                  </button>
                </form>
              ) : (
                <div style={{ color: 'var(--neon-green)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '16px' }}>
                  ✅ Score Saved! Check Leaderboard Tab!
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={startGame} className="cyber-button" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                  <RotateCcw size={14} /> REPLAY
                </button>
                <button onClick={() => setActiveTab('leaderboard')} className="cyber-button-outline" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                  LEADERBOARD
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* LEADERBOARD TAB */}
      {activeTab === 'leaderboard' && (
        <div style={{ padding: '8px 0' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--neon-gold)', marginBottom: '12px' }} className="font-heading">
            🏆 TOP 5 LEADERBOARD
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leaderboard.map((entry, index) => {
              const rankColor = index === 0 ? 'var(--neon-gold)' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'var(--neon-cyan)';
              return (
                <div
                  key={entry.id || index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: index === 0 ? 'rgba(255, 184, 0, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: index === 0 ? '1px solid var(--neon-gold)' : '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={16} color={rankColor} />
                    <span style={{ fontWeight: 800, color: rankColor, fontSize: '0.95rem' }}>#{index + 1}</span>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{entry.name}</span>
                  </div>

                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: rankColor, fontSize: '0.95rem' }}>
                    {entry.score} PTS
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
