import { createClient } from '@supabase/supabase-js'
import { SECRET_SUPA_TOKEN } from '$env/static/private'

export const supabase = createClient('https://lcspcmmpolegvalxkfsu.supabase.co', SECRET_SUPA_TOKEN)
