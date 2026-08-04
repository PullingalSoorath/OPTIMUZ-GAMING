import React, { useState, useEffect, useRef } from 'react';
import { X, Trophy, Volume2, VolumeX, Play, RotateCcw, Award, Sparkles, Send } from 'lucide-react';
import { fetchLeaderboard, submitScore } from '../utils/api';
import { audioSynth } from '../utils/audio';
import { trackUserEvent } from '../utils/tracker';

export default function MiniGameModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('game'); // 'game' | 'leaderboard'
  const [gameState, setGameState] = useState('start'); // 'start' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isTop5, setIsTop5] = useState(false);
  const [muted, setMuted] = useState(false);

  const canvasRef = useRef(null);
  const timerRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Targets state inside ref for 60fps loop
  const gameData = useRef({
    targets: [],
    particles: [],
    score: 0,
    combo: 1,
    lastHitTime: 0,
    timePlayed: 0
  });

  // Load Leaderboard data on mount / tab change
  useEffect(() => {
    if (isOpen) {
      loadLeaderboardData();
      const savedName = localStorage.getItem('optimuz_player_name');
      if (savedName) setPlayerName(savedName);
    }
  }, [isOpen, activeTab]);

  async function loadLeaderboardData() {
    const data = await fetchLeaderboard();
    setLeaderboard(data);
  }

  // Toggle Mute
  const handleToggleMute = () => {
    const isMuted = audioSynth.toggleMute();
    setMuted(isMuted);
  };

  // Start Mini-Game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setCombo(1);
    setSubmitted(false);
    setIsTop5(false);

    gameData.current = {
      targets: [],
      particles: [],
      score: 0,
      combo: 1,
      lastHitTime: Date.now(),
      timePlayed: 30
    };

    trackUserEvent('Started Mini-Game', 'Cyber Target Blaster 2077');

    // Timer countdown
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

  // End Game
  const endGame = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(gameLoopRef.current);
    setGameState('gameover');
    setScore(gameData.current.score);
    audioSynth.playGameOver();
    trackUserEvent('Finished Mini-Game', `Final Score: ${gameData.current.score}`);
  };

  // Canvas Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 360;

    const width = canvas.width;
    const height = canvas.height;

    // Target Spawner
    let spawnTimer = 0;

    const spawnTarget = () => {
      const isGold = Math.random() > 0.75;
      const radius = isGold ? 18 : Math.floor(Math.random() * 12) + 20;
      gameData.current.targets.push({
        x: Math.random() * (width - 60) + 30,
        y: Math.random() * (height - 60) + 30,
        radius,
        color: isGold ? '#FFB800' : Math.random() > 0.5 ? '#00F0FF' : '#9D00FF',
        isGold,
        points: isGold ? 300 : 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1.0,
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

          // Combo Calculation
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

          // Spawn Particles
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

      // Draw background grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Spawn target logic
      spawnTimer++;
      if (spawnTimer % 35 === 0 && gameData.current.targets.length < 7) {
        spawnTarget();
      }

      // Render Targets
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
        ctx.shadowBlur = 15;
        ctx.shadowColor = t.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner glowing ring
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Render Particles
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

  // Submit Score Handler
  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!playerName.trim() || submitted) return;

    localStorage.setItem('optimuz_player_name', playerName.trim());
    const res = await submitScore(playerName.trim(), score, 30);

    setSubmitted(true);
    if (res.isTop5) setIsTop5(true);
    setLeaderboard(res.leaderboard);
    setActiveTab('leaderboard');
    trackUserEvent('Submitted Score to Leaderboard', `${playerName}: ${score}`);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '750px',
          width: '100%',
          borderRadius: '24px',
          padding: '32px',
          position: 'relative',
          border: '1px solid var(--neon-cyan)',
          boxShadow: '0 0 50px var(--neon-cyan-glow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>
              🕹️ CYBER TARGET BLASTER <span style={{ color: 'var(--neon-cyan)' }}>2077</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleToggleMute}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: muted ? 'var(--neon-pink)' : 'var(--neon-cyan)',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
              }}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {muted ? 'MUTED' : 'AUDIO ON'}
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('game')}
            className={`cyber-button ${activeTab === 'game' ? '' : 'cyber-button-outline'}`}
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            PLAY ARCADE GAME
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`cyber-button ${activeTab === 'leaderboard' ? '' : 'cyber-button-outline'}`}
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            <Trophy size={16} color="var(--neon-gold)" /> TOP 5 LEADERBOARD
          </button>
        </div>

        {/* TAB 1: MINI GAME */}
        {activeTab === 'game' && (
          <div>
            {/* Start Screen */}
            {gameState === 'start' && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <Sparkles size={48} color="var(--neon-cyan)" style={{ marginBottom: '16px' }} />
                <h3 className="font-heading" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
                  READY TO TEST YOUR REFLEXES?
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.6 }}>
                  Blast as many cyber targets as you can in 30 seconds! Build up high combo multipliers for maximum points and claim a spot on the <strong>Top 5 Global Leaderboard</strong>.
                </p>

                <button onClick={startGame} className="cyber-button" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                  <Play size={20} fill="currentColor" /> START GAME
                </button>
              </div>
            )}

            {/* Playing State Screen */}
            {gameState === 'playing' && (
              <div>
                {/* HUD Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 8px' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--neon-cyan)' }}>
                    SCORE: <span style={{ color: '#fff' }}>{score}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: combo > 1 ? 'var(--neon-gold)' : 'var(--text-muted)' }}>
                    COMBO: <span>x{combo}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: timeLeft <= 5 ? 'var(--neon-pink)' : 'var(--neon-green)' }}>
                    TIME: <span>{timeLeft}s</span>
                  </div>
                </div>

                <div style={{ width: '100%', height: '360px', position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0, 240, 255, 0.3)', background: '#050508' }}>
                  <canvas ref={canvasRef} style={{ width: '100%', height: '100%', cursor: 'crosshair' }} />
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameover' && (
              <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                <Trophy size={48} color="var(--neon-gold)" style={{ marginBottom: '12px' }} />
                <h3 className="font-heading" style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>
                  GAME OVER!
                </h3>
                <div style={{ fontSize: '1.4rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)', marginBottom: '24px' }}>
                  FINAL SCORE: {score} POINTS
                </div>

                {/* Score Submission Form */}
                {!submitted ? (
                  <form onSubmit={handleSubmitScore} style={{ maxWidth: '420px', margin: '0 auto 24px', display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="Enter Your Display Name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      required
                      maxLength={20}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid var(--neon-cyan)',
                        color: '#fff',
                        fontFamily: 'var(--font-subheading)',
                        fontSize: '1rem',
                        outline: 'none',
                      }}
                    />
                    <button type="submit" className="cyber-button" style={{ padding: '12px 24px' }}>
                      <Send size={16} /> SUBMIT
                    </button>
                  </form>
                ) : (
                  <div style={{ color: 'var(--neon-green)', fontWeight: 700, marginBottom: '24px' }}>
                    ✅ Score Submitted Successfully!
                  </div>
                )}

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button onClick={startGame} className="cyber-button" style={{ padding: '12px 28px' }}>
                    <RotateCcw size={16} /> PLAY AGAIN
                  </button>
                  <button onClick={() => setActiveTab('leaderboard')} className="cyber-button-outline" style={{ padding: '12px 28px' }}>
                    VIEW LEADERBOARD
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div style={{ padding: '12px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 className="font-heading text-gradient-gold" style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
                TOP 5 HIGHEST SCORED PLAYERS
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Global high scores verified by OPTIMUZ GAMING anti-cheat engine.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {leaderboard.map((entry, index) => {
                const rankColor = index === 0 ? 'var(--neon-gold)' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'var(--neon-cyan)';
                return (
                  <div
                    key={entry.id || index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr 140px 120px',
                      alignItems: 'center',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: index === 0 ? 'rgba(255, 184, 0, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: index === 0 ? '1px solid var(--neon-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award size={18} color={rankColor} />
                      <span className="font-heading" style={{ fontWeight: 900, color: rankColor, fontSize: '1.1rem' }}>
                        #{index + 1}
                      </span>
                    </div>

                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>
                      {entry.name}
                    </div>

                    <div className="font-heading" style={{ fontWeight: 800, color: rankColor, fontSize: '1.1rem' }}>
                      {entry.score} PTS
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                      {entry.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
