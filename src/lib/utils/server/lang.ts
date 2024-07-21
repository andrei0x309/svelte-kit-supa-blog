import { config } from "@/lib/config/index"

export const getLangFromPath = (path: string): string => {
    const { supportedLanguages } = config
    let lang = path.split('/')[0]
    if (supportedLanguages.includes(lang)) {
        lang = lang.replace('en', 'en-US')
        return lang
    }
    return 'en-US'
}

export const isSupportedLang = (lang: string): boolean => {
    const { supportedLanguages } = config
    return supportedLanguages.includes(lang)
}