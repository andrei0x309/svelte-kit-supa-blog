import { supabase } from "../../lib/deno/supaClientFS.ts";

const resp = await supabase.from('fsk_cert').select(`
title,
open_source,
cat:fsk_prj_cat(
    cat_name
),
techs:fsk_prj_tech_type!inner(
    id,
    name
)
`).in('fsk_prj_tech_type.id', [1,2])

console.log(
    resp.data
)