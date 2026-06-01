import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) throw new Error('SUPABASE_URL environment variable is required.');
  if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is required.');

  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  return _supabaseAdmin;
}

// Backwards-compatible export (lazy proxy)
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseAdmin() as Record<string | symbol, unknown>)[prop];
  },
});
