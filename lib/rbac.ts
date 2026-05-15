export type UserRole = 'super_admin' | 'admin' | 'editor' | 'user' | 'guest';

export const ROLES: Record<string, UserRole> = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  USER: 'user',
  GUEST: 'guest',
};

/**
 * Check if a user has a specific role or higher.
 * In a real app, you would fetch the role from the 'profiles' table in Supabase.
 */
export async function hasRole(user: any, allowedRoles: UserRole[]): Promise<boolean> {
  if (!user) return false;
  
  // Extract role from user metadata or profile table
  // Recommendation: Store role in public.profiles table and use a server-side fetch
  const userRole: UserRole = user.user_metadata?.role || 'user';
  
  return allowedRoles.includes(userRole);
}

export const isAdmin = (user: any) => hasRole(user, ['super_admin', 'admin']);
export const isEditor = (user: any) => hasRole(user, ['super_admin', 'admin', 'editor']);
