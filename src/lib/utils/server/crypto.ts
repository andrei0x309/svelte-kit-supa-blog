
declare const Deno: any;
declare const Bun: any;

export const getSha256 = async (password: string) => {
    if (typeof crypto !== 'undefined' && crypto.subtle) { // Check for Web Crypto API
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
        return btoa(String.fromCharCode(...new Uint8Array(hash)));
    } else if (typeof Deno !== 'undefined' || typeof Bun !== 'undefined') { // Deno or Bun
        try {
            const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
            return btoa(String.fromCharCode(...new Uint8Array(hash)));
        } catch (error) {
            // Fallback to Node.js crypto if Web Crypto API fails in Bun
            const cryptoModule = await import('node:crypto');
            return cryptoModule.createHash('sha256').update(password).digest('base64');
        }
    } else { // Node.js
        const cryptoModule = await import('node:crypto');
        return cryptoModule.createHash('sha256').update(password).digest('base64');
    }
};