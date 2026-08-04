import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Users, Gamepad2, Trash2, RefreshCw, X, Search, CheckCircle2 } from 'lucide-react';
import { fetchAdminLogs, clearAdminLogs } from '../utils/api';

export default function AdminPanel({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [activeTab, setActiveTab] = useState('activities'); // 'activities' | 'scores'
  const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState({
    totalActivities: 0,
    totalLeaderboardEntries: 0,
    activities: [],
    leaderboard: []
  });

  const [loading, setLoading] = useState(false);

  // Authenticate Passcode
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setLoading(true);
    setErrorMsg('');

    const res = await fetchAdminLogs(passcode.trim());
    setLoading(false);

    if (res.success) {
      setAuthenticated(true);
      setData(res);
      sessionStorage.setItem('optimuz_admin_auth', passcode.trim());
    } else {
      setErrorMsg('Incorrect Passcode. Access Denied.');
    }
  };

  // Load logs if already authenticated in session
  useEffect(() => {
    if (isOpen) {
      const savedPass = sessionStorage.getItem('optimuz_admin_auth');
      if (savedPass === 'Warning#dolby') {
        setPasscode('Warning#dolby');
        setAuthenticated(true);
        loadLogs('Warning#dolby');
      }
    }
  }, [isOpen]);

  async function loadLogs(pass = passcode) {
    setLoading(true);
    const res = await fetchAdminLogs(pass);
    setLoading(false);
    if (res.success) setData(res);
  }

  // Clear Logs Handler
  const handleClearLogs = async () => {
    if (window.confirm('Are you sure you want to clear all visitor activity logs?')) {
      await clearAdminLogs(passcode);
      loadLogs();
    }
  };

  if (!isOpen) return null;

  // Filtered Activity Logs
  const filteredActivities = data.activities.filter(a =>
    a.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.sessionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          borderRadius: '24px',
          padding: '36px',
          position: 'relative',
          overflowY: 'auto',
          border: '1px solid var(--neon-purple)',
          boxShadow: '0 0 50px var(--neon-purple-glow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
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

        {/* Authentication Gate Screen */}
        {!authenticated ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '400px', margin: '0 auto' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(157, 0, 255, 0.15)',
                border: '1px solid var(--neon-purple)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 0 25px var(--neon-purple-glow)',
              }}
            >
              <Lock size={32} color="var(--neon-purple)" />
            </div>

            <h3 className="font-heading" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>
              SECRET ADMIN DASHBOARD
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Enter the master passcode to access real-time visitor activity logs &amp; score auditing.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="password"
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--neon-purple)',
                  color: '#fff',
                  fontSize: '1rem',
                  textAlign: 'center',
                  outline: 'none',
                }}
              />

              {errorMsg && (
                <div style={{ color: 'var(--neon-pink)', fontSize: '0.85rem', fontWeight: 600 }}>
                  {errorMsg}
                </div>
              )}

              <button type="submit" className="cyber-button cyber-button-purple" style={{ padding: '14px' }}>
                {loading ? 'VERIFYING...' : 'UNLOCK DASHBOARD'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div>
            {/* Top Admin Header Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={28} color="var(--neon-cyan)" />
                <div>
                  <h2 className="font-heading" style={{ fontSize: '1.6rem', color: '#fff' }}>
                    VISITOR ACTIVITY COMMAND CENTER
                  </h2>
                  <span style={{ fontSize: '0.78rem', color: 'var(--neon-green)', fontWeight: 700 }}>
                    🟢 LIVE SYSTEM AUDIT ACTIVE
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => loadLogs()}
                  className="cyber-button-outline"
                  style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                >
                  <RefreshCw size={14} className={loading ? 'spin' : ''} /> REFRESH
                </button>
                <button
                  onClick={handleClearLogs}
                  style={{
                    background: 'rgba(255, 0, 85, 0.15)',
                    border: '1px solid var(--neon-pink)',
                    color: 'var(--neon-pink)',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Trash2 size={14} /> CLEAR LOGS
                </button>
              </div>
            </div>

            {/* Metrics Overview Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.06)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  TOTAL LOGGED EVENTS
                </div>
                <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--neon-cyan)' }}>
                  {data.activities.length}
                </div>
              </div>

              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(157, 0, 255, 0.06)', border: '1px solid rgba(157, 0, 255, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  UNIQUE SESSIONS
                </div>
                <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--neon-purple)' }}>
                  {new Set(data.activities.map(a => a.sessionId)).size}
                </div>
              </div>

              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255, 184, 0, 0.06)', border: '1px solid rgba(255, 184, 0, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  MINI-GAME PLAYS
                </div>
                <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--neon-gold)' }}>
                  {data.activities.filter(a => a.action.includes('Mini-Game') || a.action.includes('Score')).length}
                </div>
              </div>

              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(0, 255, 136, 0.06)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  HIGH SCORE RECORD
                </div>
                <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--neon-green)' }}>
                  {data.leaderboard[0] ? data.leaderboard[0].score : 0} PTS
                </div>
              </div>
            </div>

            {/* Filter Search & Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setActiveTab('activities')}
                  className={`cyber-button ${activeTab === 'activities' ? '' : 'cyber-button-outline'}`}
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  <Eye size={14} /> VISITOR ACTIVITY LOGS
                </button>
                <button
                  onClick={() => setActiveTab('scores')}
                  className={`cyber-button ${activeTab === 'scores' ? '' : 'cyber-button-outline'}`}
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  <Gamepad2 size={14} /> LEADERBOARD SCORES
                </button>
              </div>

              <div style={{ position: 'relative', maxWidth: '280px', width: '100%' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Filter logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* TAB 1: VISITOR ACTIVITY LOGS TABLE */}
            {activeTab === 'activities' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--neon-cyan)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)' }}>TIMESTAMP</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)' }}>SESSION ID</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)' }}>DEVICE</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)' }}>ACTION</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)' }}>DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No visitor activity logs recorded yet.
                        </td>
                      </tr>
                    ) : (
                      filteredActivities.map((act) => (
                        <tr key={act.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(255, 255, 255, 0.01)' }}>
                          <td style={{ padding: '12px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                            {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </td>
                          <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--neon-purple)' }}>
                            {act.sessionId}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#fff' }}>
                            {act.device}
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--neon-cyan)' }}>
                            {act.action}
                          </td>
                          <td style={{ padding: '12px 16px', color: 'var(--text-main)' }}>
                            {act.details}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: LEADERBOARD AUDIT LOGS */}
            {activeTab === 'scores' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(157, 0, 255, 0.1)', color: 'var(--neon-purple)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(157, 0, 255, 0.2)' }}>RANK</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(157, 0, 255, 0.2)' }}>PLAYER NAME</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(157, 0, 255, 0.2)' }}>HIGH SCORE</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(157, 0, 255, 0.2)' }}>DATE</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(157, 0, 255, 0.2)' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.leaderboard.map((lb, i) => (
                      <tr key={lb.id || i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 900, color: 'var(--neon-gold)' }}>
                          #{i + 1}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: '#fff' }}>
                          {lb.name}
                        </td>
                        <td style={{ padding: '12px 16px', fontFamily: 'var(--font-heading)', color: 'var(--neon-cyan)', fontWeight: 800 }}>
                          {lb.score} PTS
                        </td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                          {lb.date}
                        </td>
                        <td style={{ padding: '12px 16px', color: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={14} /> VERIFIED
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
