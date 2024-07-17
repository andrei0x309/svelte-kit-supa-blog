export type ICookies = {
    cookies: {
        get: (name: string) => string | null;
        set: (name: string, value: string, options?: { path?: string, maxAge?: number, expires?: Date, domain?: string, secure?: boolean, httpOnly?: boolean, sameSite?: boolean | 'lax' | 'strict' | 'none' }) => void;
        delete: (name: string, options?: { path?: string, maxAge?: number, expires?: Date, domain?: string, secure?: boolean, httpOnly?: boolean, sameSite?: boolean | 'lax' | 'strict' | 'none' }) => void;
        serialize: (name: string, value: string, options?: { path?: string, maxAge?: number, expires?: Date, domain?: string, secure?: boolean, httpOnly?: boolean, sameSite?: boolean | 'lax' | 'strict' | 'none' }) => string;
    }
}
