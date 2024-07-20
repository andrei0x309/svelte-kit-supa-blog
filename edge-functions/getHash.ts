
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPA_TOKEN = Deno.env.get('TOKEN')

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: false,
  detectSessionInUrl: true,
};

const supabase = createClient(
  "https://lcspcmmpolegvalxkfsu.supabase.co",
  SUPA_TOKEN,
  options,
);

export default async (request: Request) => {
    setTimeout(async () => { 
        await supabase.from('fsk_email_copy').insert({json: JSON.stringify(
            {
                name: 'test',
                email: 'test',
                message: 'test',
            }
        )})
        }, 7000);
    return Response.json('Hello world', {status: 200})
}
