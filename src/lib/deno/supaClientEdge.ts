import { createClient } from "https://esm.sh/@supabase/supabase-js";

const token =  Deno.env.get("TOKEN");

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

export const supabase = createClient(
  "https://lcspcmmpolegvalxkfsu.supabase.co",
  token,
  options,
);
