export const getSha256 = async (password: string) => {
    let crypto
    if(typeof Deno !== 'undefined'){
        crypto = await import('node:crypto')
    } else {
        crypto = await import('crypto')
    }
    return crypto.createHash('sha256').update(password).digest('base64')
}
