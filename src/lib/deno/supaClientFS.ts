import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { TOKEN } from './.env.ts';

const options = {
  schema: 'public',
  autoRefreshToken: true,
  persistSession: false,
  detectSessionInUrl: true
};

export const supabase = createClient('https://lcspcmmpolegvalxkfsu.supabase.co', TOKEN, options);
