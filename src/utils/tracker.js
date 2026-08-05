import { logActivity } from './api';

function getSessionId() {
  let id = sessionStorage.getItem('optimuz_session_id');
  if (!id) {
    id = 'sess-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    sessionStorage.setItem('optimuz_session_id', id);
  }
  return id;
}

export function trackUserEvent(action, details = '') {
  const sessionId = getSessionId();
  logActivity(sessionId, 'Standard', action, details);
}

export function initAutoTracker() {
  // Track Initial Page View Session
  trackUserEvent('Page Loaded', `URL: ${window.location.hash || 'Home'}`);

  // Track Hash Route Navigation
  window.addEventListener('hashchange', () => {
    trackUserEvent('Navigated Route', `Hash: ${window.location.hash}`);
  });

  // Track Button & Link Clicks
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, [role="button"]');
    if (target) {
      const text = (target.innerText || target.getAttribute('aria-label') || target.title || 'Button').trim().slice(0, 30);
      const href = target.getAttribute('href') || '';
      trackUserEvent('Clicked Element', `Text: "${text}" | Href: "${href}"`);
    }
  });
}
