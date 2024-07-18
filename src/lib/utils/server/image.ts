export const optimizeGoogleCDNImage = (url: string, width: number = 500) => {
    try {
        let { origin, pathname } = new URL(url)
        if (!origin.includes('googleusercontent')) return url
        pathname = pathname.split('=').length > 1 ? pathname.split('=')[0] : pathname
        const newUrl = `${origin}${pathname}=w${width}-rw`
        return newUrl
    } catch {
        return url
    }
}