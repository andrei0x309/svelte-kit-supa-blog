import { supabase } from '@/lib/node/supaClientFS'

export const STORE = {
    YUP_SHARE: 'yup-share',
    YUP_PLATFORMS: 'yup-platforms',
    YUP_ACCESS_TOKEN: 'yup-access-token',
    TAG_CLOUD: 'tagCloud',
    GOOD_READS_DATA: 'goodReadsData',
    ETH_PRICE: 'ethPrice',
}

const settingsName = [STORE.YUP_SHARE, STORE.YUP_PLATFORMS]
const allowedStoreNames = Object.values(STORE)


export const getYupSettings = async () => {
    const { data } = await supabase.from('fsk_blog_store').select('*').in('name', [STORE.YUP_SHARE, STORE.YUP_PLATFORMS, STORE.YUP_ACCESS_TOKEN])
    return data
}

export const getSettings = async () => {
    const { data } = await supabase.from('fsk_blog_store').select('*').in('name', settingsName)
    return  data
}

export const getSetting = async (name: string) => {
    const { data } = await supabase.from('fsk_blog_store').select('*').eq('name', name).single()
    return data
}

export const setSetting = async (name: string, value?: any, valueJSON?: any) => {
    if (!value && !valueJSON) {
        throw new Error('No value provided')
    }
    if (!allowedStoreNames.includes(name)) {
        throw new Error('Invalid store name')
    }
    const upsert = {} as Record<string, any>
    upsert[name] = name
    if (valueJSON) {
        upsert['value_json'] = valueJSON
    }
    if(value) {
        upsert['value'] = value
    }
    upsert['updated_at'] = new Date().toISOString()

    const { data: response } = await supabase.from('fsk_blog_store').upsert(upsert)
    return response
}