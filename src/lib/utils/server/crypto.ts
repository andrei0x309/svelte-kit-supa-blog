declare const Deno: any

export const getSha256 = async (password: string) => {
    let crypto
    if(typeof Deno !== 'undefined'){
        const hash = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
        return btoa(String.fromCharCode(...new Uint8Array(hash)))
    } else {
        crypto = await import('node:crypto')
    }
    return crypto.createHash('sha256').update(password).digest('base64')
}
