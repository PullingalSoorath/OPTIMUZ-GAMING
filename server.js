import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'db.json');
const ADMIN_PASSCODE = 'Warning#dolby';

app.use(cors());
app.use(express.json({ limit: '100kb' }));

// Helper: Sanitize strings to prevent XSS injection
function sanitizeString(str, maxLength = 50) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim()
    .slice(0, maxLength);
}

// Load DB with exception handling
function loadDb() {
  const initialDb = {
    leaderboard: [
      { id: '1', name: 'CyberShadow', score: 3200, date: '2026-08-01', verified: true },
      { id: '2', name: 'OptimuzFan_99', score: 2850, date: '2026-08-02', verified: true },
      { id: '3', name: 'VinnieMoretti', score: 2400, date: '2026-08-03', verified: true },
      { id: '4', name: 'GunslingerArthur', score: 1950, date: '2026-08-03', verified: true },
      { id: '5', name: 'NeonPulse', score: 1600, date: '2026-08-04', verified: true }
    ],
    activities: []
  };

  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
      return initialDb;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(data);
    return {
      leaderboard: Array.isArray(parsed.leaderboard) ? parsed.leaderboard : initialDb.leaderboard,
      activities: Array.isArray(parsed.activities) ? parsed.activities : []
    };
  } catch (err) {
    console.error('Safe DB Load Fallback:', err.message);
    return initialDb;
  }
}

// Atomic Safe DB Save
function saveDb(data) {
  try {
    const tempPath = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2));
    fs.renameSync(tempPath, DB_FILE);
  } catch (err) {
    console.error('Error saving db.json:', err.message);
  }
}

// 1. GET /api/leaderboard (Top 5 scores)
app.get('/api/leaderboard', (req, res) => {
  try {
    const db = loadDb();
    const sorted = [...db.leaderboard]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    res.json({ success: true, leaderboard: sorted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 2. POST /api/leaderboard (Submit High Score with Anti-Cheat & Sanitization)
app.post('/api/leaderboard', (req, res) => {
  try {
    const { name, score, timePlayed } = req.body;

    const sanitizedName = sanitizeString(name, 20);
    const parsedScore = parseInt(score, 10);

    if (!sanitizedName || isNaN(parsedScore) || parsedScore < 0) {
      return res.status(400).json({ success: false, message: 'Invalid payload parameters' });
    }

    // Anti-Cheat score validation
    if (parsedScore > 50000 || (timePlayed && parsedScore / timePlayed > 400)) {
      return res.status(400).json({ success: false, message: 'Score validation anomaly detected' });
    }

    const db = loadDb();
    const newEntry = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 4),
      name: sanitizedName || 'Anonymous Player',
      score: parsedScore,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    db.leaderboard.push(newEntry);
    db.leaderboard.sort((a, b) => b.score - a.score);
    // Limit store total leaderboard to top 100
    if (db.leaderboard.length > 100) db.leaderboard.length = 100;
    saveDb(db);

    const top5 = db.leaderboard.slice(0, 5);
    res.json({ success: true, leaderboard: top5, isTop5: top5.some(e => e.id === newEntry.id) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to process score submission' });
  }
});

// 3. POST /api/activity (Log Visitor Activity with Sanitization)
app.post('/api/activity', (req, res) => {
  try {
    const { sessionId, device, action, details } = req.body;

    const sanitizedAction = sanitizeString(action, 50);
    if (!sanitizedAction) {
      return res.status(400).json({ success: false, message: 'Action required' });
    }

    const db = loadDb();
    const newLog = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 4),
      sessionId: sanitizeString(sessionId, 40) || 'anon-session',
      device: sanitizeString(device, 20) || 'Desktop',
      action: sanitizedAction,
      details: sanitizeString(details, 200),
      timestamp: new Date().toISOString()
    };

    db.activities.unshift(newLog);
    if (db.activities.length > 500) {
      db.activities = db.activities.slice(0, 500);
    }
    saveDb(db);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to log activity' });
  }
});

// 4. GET /api/admin/logs (Secret Admin Dashboard - Protected by Warning#dolby)
app.get('/api/admin/logs', (req, res) => {
  try {
    const passcode = req.headers['x-admin-passcode'];
    if (passcode !== ADMIN_PASSCODE) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const db = loadDb();
    res.json({
      success: true,
      totalActivities: db.activities.length,
      totalLeaderboardEntries: db.leaderboard.length,
      activities: db.activities,
      leaderboard: db.leaderboard
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin logs' });
  }
});

// 5. POST /api/admin/clear (Clear Activity Logs - Protected by Warning#dolby)
app.post('/api/admin/clear', (req, res) => {
  try {
    const passcode = req.headers['x-admin-passcode'];
    if (passcode !== ADMIN_PASSCODE) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const db = loadDb();
    db.activities = [];
    saveDb(db);

    res.json({ success: true, message: 'Activity logs cleared' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to clear activity logs' });
  }
});

// Global Error Handler middleware
app.use((err, req, res, next) => {
  console.error('Global API Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`OPTIMUZ GAMING REST API Server running on port ${PORT}`);
});
