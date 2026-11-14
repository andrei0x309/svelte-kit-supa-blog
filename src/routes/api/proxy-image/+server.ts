import type { RequestEvent } from '@sveltejs/kit';

const ALLOWED_DOMAINS = [
  'i.gr-assets.com',
  's.gr-assets.com',
];

export async function GET({ url, fetch, request }: RequestEvent) {
  const imageUrl = url.searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing image URL', { status: 400 });
  }

  const referer = request.headers.get('referer');
  // Use host header but strip port if present (e.g., blog.flashsoft.eu:3000 -> blog.flashsoft.eu)
  const currentHost = request.headers.get('host')?.split(':')[0];

  if (referer && currentHost) {
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.hostname !== currentHost && refererUrl.hostname !== 'localhost') {
        return new Response('Unauthorized referer', { status: 403 });
      }
    } catch (e) {
      return new Response('Invalid Referer', { status: 400 });
    }
  }

  try {
    const parsedUrl = new URL(imageUrl);
    
    if (!ALLOWED_DOMAINS.includes(parsedUrl.hostname)) {
      return new Response('Domain not allowed', { status: 403 });
    }

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new Response('Failed to fetch image', { status: 502 });
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType ?? 'image/jpeg', // Defaulting to an image type is safer for browsers
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (err) {
    return new Response('Invalid URL', { status: 400 });
  }
}