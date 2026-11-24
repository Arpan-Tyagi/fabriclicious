import 'server-only';
import { createClient } from '@/lib/supabase/server';

export interface UserSession {
  id: string;
  email?: string;
  role: string;
  customerCode?: string;
}

/**
 * Server-Side Data Access Layer (DAL) Session Verifier
 * 
 * In accordance with Non-Negotiable Invariant #1:
 * 100% of data reads and writes MUST pass through an `import 'server-only'` DAL
 * that re-verifies session validity and database role inside every Server Component,
 * Server Action, and Route Handler.
 * Zero reliance on Next.js middleware for authorization.
 */
export async function verifySession(): Promise<UserSession> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('UNAUTHORIZED: Authentication required');
  }

  // Derive role securely from locked public.user_roles or verified profile
  const { data: roleRecords } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id);

  const roles = roleRecords?.map(r => r.role) || [];

  const { data: profile } = await supabase
    .from('profiles')
    .select('customer_code, role')
    .eq('id', user.id)
    .single();

  const isAdmin = roles.includes('admin') || profile?.role === 'admin';
  const resolvedRole = isAdmin ? 'admin' : (profile?.role || 'customer');

  return {
    id: user.id,
    email: user.email,
    role: resolvedRole,
    customerCode: profile?.customer_code || undefined,
  };
}

/**
 * Enforces admin authorization. Rejects non-admins with an explicit error.
 */
export async function requireAdmin(): Promise<UserSession> {
  const session = await verifySession();
  if (session.role !== 'admin') {
    throw new Error('FORBIDDEN: Administrator privilege required');
  }
  return session;
}

/**
 * Asserts authenticated customer session.
 */
export async function requireCustomer(): Promise<UserSession> {
  return await verifySession();
}
