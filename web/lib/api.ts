
const API_BASE = '/api';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (res.status === 401 && typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }

  return res;
}

export async function getMe() {
  const res = await fetchWithAuth('/me');
  if (res.ok) return res.json();
  return null;
}

export async function logout() {
  const res = await fetchWithAuth('/auth/logout', { method: 'POST' });
  if (res.ok) {
    window.location.href = '/login';
  }
}
