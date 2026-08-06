import { useEffect, useState } from 'react';

export type AuthRole = 'admin' | 'client' | 'partner';

export interface AuthSession {
  role: AuthRole;
  name: string;
  email: string;
  clientId?: string;
  partnerId?: string;
}

const STORAGE_KEY = 'nss-auth-session';

// Demo-only client-side session. Persisted so a page refresh keeps the user
// signed in; there is no backend, so this is not a security boundary.
export function login(role: AuthRole, session: Omit<AuthSession, 'role'>): AuthSession {
  const full: AuthSession = { role, ...session };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  } catch {
    /* storage unavailable — session lasts for the page lifetime only */
  }
  window.dispatchEvent(new Event('nss-auth-change'));
  return full;
}

export function logout(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('nss-auth-change'));
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed || typeof parsed.role !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useAuthSession(): AuthSession | null {
  const [session, setSession] = useState<AuthSession | null>(() => getSession());

  useEffect(() => {
    const onAuthChange = () => setSession(getSession());
    window.addEventListener('nss-auth-change', onAuthChange);
    window.addEventListener('storage', onAuthChange);
    return () => {
      window.removeEventListener('nss-auth-change', onAuthChange);
      window.removeEventListener('storage', onAuthChange);
    };
  }, []);

  return session;
}
