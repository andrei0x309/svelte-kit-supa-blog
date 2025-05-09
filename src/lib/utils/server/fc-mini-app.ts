import { FCConfig } from '$lib/config/farcaster';

export const generateFcWellKnown = async () => {

    const json = {} as { [key: string]: any }
    json.accountAssociation = FCConfig.JFS.accountAssociation;
    json.frame = FCConfig.FrameConfig

    return JSON.stringify(json, null, 2)
}

