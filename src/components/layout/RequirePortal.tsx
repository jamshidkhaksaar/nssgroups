import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { getSession, type AuthRole } from '@/lib/auth';

interface RequirePortalProps {
  role: AuthRole;
  children: ReactNode;
}

// Demo guard: redirects to the matching login page when there is no session
// for the requested portal role.
export default function RequirePortal({ role, children }: RequirePortalProps) {
  const session = getSession();
  if (!session || session.role !== role) {
    return <Navigate to={`/login/${role}`} replace />;
  }
  return <>{children}</>;
}
