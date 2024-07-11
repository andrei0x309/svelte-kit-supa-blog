import { supabase } from "../../lib/deno/supaClientFS.ts";

// const resp = await supabase.from('fsk_prj').select(`
// title,
// open_source,
// cat:fsk_prj_cat(
//     cat_name
// ),
// techs:fsk_prj_tech_type!inner(
//     id,
//     name
// )
// `).in('fsk_prj_tech_type.id', [1,2])


// const { data, error } = await supabase.rpc('get_tags', { alltags: false })


// console.log(
//     data
// )

// if(error) {
//     console.error(error)
// }

const resp = await supabase.from('fsk_cert').select(`
cert_name,
cert_file_name,
cert_feature_image,
cat:fsk_cert_cat(
    cat_name,
    cat_icon_name
),
tags:fsk_cert_tag_type!inner(
    id,
    name
)
`).limit(9)

const { data, error } = resp

console.log(
    data
)

if(error) {
    console.error(error)
}