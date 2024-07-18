export const getSha256 = async (password: string) => {
    let crypto
    if(typeof Deno !== 'undefined'){
        crypto = (await import(`https://deno.land/std@0.170.0/node/crypto${'.ts'}`)).default
    } else {
        // crypto = await import('crypto')
    }
    return crypto.createHash('sha256').update(password).digest('base64')
}
