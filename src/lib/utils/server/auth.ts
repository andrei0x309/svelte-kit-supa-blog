import { supabase } from '#/lib/node/supaClientFS.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import { SECRET_AUTH_SESSION } from '$app/env/private';


const SESSION_COOKIE = 'session';
const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 90;

const toBase64Url = (value: Uint8Array) => {
  let binary = '';
  value.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const fromBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized + padding);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const constantTimeEqual = (left: string, right: string) => {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
};

const getSessionSecret = () => {
  return SECRET_AUTH_SESSION ?? 'dev-dummy-secret';
};

const createSignature = async (payload: string) => {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(getSessionSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signature));
};

const verifySignature = async (payload: string, signature: string) => {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(getSessionSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const expectedSignature = await createSignature(payload);
  const validSignature = constantTimeEqual(expectedSignature, signature);
  if (!validSignature) {
    return false;
  }
  return crypto.subtle.verify('HMAC', key, fromBase64Url(signature), new TextEncoder().encode(payload));
};

export const createSessionToken = async (username: string, userId: number) => {
  const payload = {
    username,
    userId,
    exp: Date.now() + DEFAULT_SESSION_TTL_MS
  };
  const encodedPayload = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await createSignature(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

export const verifySessionToken = async (value: string | null) => {
  if (!value) {
    return null;
  }

  const [encodedPayload, signature] = value.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  try {
    const validSignature = await verifySignature(encodedPayload, signature);
    if (!validSignature) {
      return null;
    }
    const payloadText = new TextDecoder().decode(fromBase64Url(encodedPayload));
    const payload = JSON.parse(payloadText) as { username?: string; userId?: number; exp?: number };
    if (!payload.username || !payload.userId || typeof payload.exp !== 'number') {
      return null;
    }
    if (Date.now() > payload.exp) {
      return null;
    }
    return {
      username: payload.username,
      userId: Number(payload.userId)
    };
  } catch {
    return null;
  }
};

export const getValidatedSession = async (req: ICookies) => {
  const sessionToken = req.cookies.get(SESSION_COOKIE);
  return verifySessionToken(sessionToken);
};

export const checkAuth = async (req: ICookies) => {
  const session = await getValidatedSession(req);
  if (!session) {
    throw 'denied';
  }

  const user = (await supabase.from('fsk_blog_author').select('*').eq('username', session.username).single()).data;
  if (!user) {
    throw 'denied';
  }

  if (user.id !== session.userId) {
    throw 'denied';
  }

  return user as {
    id: number;
    username: string;
    email: string;
    avatar: string;
    name: string;
    description: string;
    social_links: string;
    password_hash: string;
    role: string;
    created_at: string;
  };
};
