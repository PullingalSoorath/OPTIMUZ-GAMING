const API_BASE = 'http://localhost:3001/api';
const ADMIN_PASSCODE = 'Warning#dolby';

// Fallback LocalStorage DB
const LOCAL_KEY_LEADERBOARD = 'optimuz_local_leaderboard';
const LOCAL_KEY_ACTIVITIES = 'optimuz_local_activities';

function sanitize(str, max = 50) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim().slice(0, max);
}

function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY_LEADERBOARD);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [
    { id: '1', name: 'CyberShadow', score: 3200, date: '2026-08-01', verified: true },
    { id: '2', name: 'OptimuzFan_99', score: 2850, date: '2026-08-02', verified: true },
    { id: '3', name: 'VinnieMoretti', score: 2400, date: '2026-08-03', verified: true },
    { id: '4', name: 'GunslingerArthur', score: 1950, date: '2026-08-03', verified: true },
    { id: '5', name: 'NeonPulse', score: 1600, date: '2026-08-04', verified: true }
  ];
}

function saveLocalLeaderboard(data) {
  try {
    localStorage.setItem(LOCAL_KEY_LEADERBOARD, JSON.stringify(data));
  } catch (e) {}
}

function getLocalActivities() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY_ACTIVITIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function saveLocalActivities(data) {
  try {
    localStorage.setItem(LOCAL_KEY_ACTIVITIES, JSON.stringify(data));
  } catch (e) {}
}

export async function fetchLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/leaderboard`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.leaderboard)) {
        saveLocalLeaderboard(data.leaderboard);
        return data.leaderboard;
      }
    }
  } catch (err) {
    console.log('API offline, using local leaderboard');
  }
  return getLocalLeaderboard().slice(0, 5);
}

export async function submitScore(name, score, timePlayed) {
  const cleanName = sanitize(name, 20) || 'Anonymous';
  const cleanScore = parseInt(score, 10) || 0;

  try {
    const res = await fetch(`${API_BASE}/leaderboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, score: cleanScore, timePlayed })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data;
    }
  } catch (err) {
    console.log('API offline, updating local leaderboard');
  }

  // Fallback update
  const local = getLocalLeaderboard();
  const newEntry = {
    id: Date.now().toString(),
    name: cleanName,
    score: cleanScore,
    date: new Date().toISOString().split('T')[0],
    verified: true
  };
  local.push(newEntry);
  local.sort((a, b) => b.score - a.score);
  saveLocalLeaderboard(local);
  const top5 = local.slice(0, 5);
  return { success: true, leaderboard: top5, isTop5: top5.some(e => e.id === newEntry.id) };
}

export async function logActivity(sessionId, device, action, details = '') {
  const payload = {
    sessionId: sanitize(sessionId, 40),
    device: sanitize(device, 20),
    action: sanitize(action, 50),
    details: sanitize(details, 200)
  };

  const local = getLocalActivities();
  local.unshift({
    id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 4),
    ...payload,
    timestamp: new Date().toISOString()
  });
  if (local.length > 500) local.length = 500;
  saveLocalActivities(local);

  try {
    await fetch(`${API_BASE}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {}
}

export async function fetchAdminLogs(passcode) {
  try {
    const res = await fetch(`${API_BASE}/admin/logs`, {
      headers: { 'x-admin-passcode': passcode }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data;
    }
  } catch (err) {}

  // Fallback local check
  if (passcode === ADMIN_PASSCODE) {
    const acts = getLocalActivities();
    const lb = getLocalLeaderboard();
    return {
      success: true,
      totalActivities: acts.length,
      totalLeaderboardEntries: lb.length,
      activities: acts,
      leaderboard: lb
    };
  }
  return { success: false, message: 'Invalid Passcode' };
}

export async function clearAdminLogs(passcode) {
  try {
    await fetch(`${API_BASE}/admin/clear`, {
      method: 'POST',
      headers: { 'x-admin-passcode': passcode }
    });
  } catch (err) {}
  saveLocalActivities([]);
  return { success: true };
}
