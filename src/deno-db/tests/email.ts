import { supabase } from "../../lib/deno/supaClientFS.ts";

const resp = await supabase.from('fsk_email_token').select('*').eq('id', 1)
const { data, error } = resp
const exporationTs = (new Date(data[0].expiration)).getTime()

console.log(
    exporationTs
)