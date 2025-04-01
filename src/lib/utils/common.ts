export const makeTitle = (title: string) => {
    return (title ?? '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
}

export const appendToData = (data: Record<string, unknown>, appendObj: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(appendObj)) {
        ; (data as unknown as Record<string, unknown>)[key] = value
    }
    return data
}

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname: string) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const eraseCookie = (cname: string) => {
    document.cookie = cname + '=; Max-Age=0;path=/';
}