# Svelte Kit & SupaBase blog - `blog.flashsoft.eu`

## Description

This is a fast lightweight blog/blog-engine source and can be used by anyone, with small adjustments, to config and its code.

It is based on Svelte Kit and SupaBase.

It can be used with Netlify or Vercel.
Most of the features were made to suit my needs, but I hope they will also be useful to others.

Deployed on [https://blog.flashsoft.eu](https://blog.flashsoft.eu)

[![Netlify Status](https://api.netlify.com/api/v1/badges/fc8f8d80-365f-4e3a-8dc4-ee441c44eef5/deploy-status)](https://app.netlify.com/sites/bfsk/deploys)

## Features

Should run on serverless functions, and functions/edge both Node and Deno

Lightweight blog with SupaBase database with the following features:

- Admin panel for managing posts/users & other settings
- Multi-user system with roles (admin, contributor, demo)
- Simple auth system with no third-party services
- Deno Script for importing posts from WordPress
- SSR on edge functions
- Support for categories
- Support for tags
- Support for inserting highlighted code
- Support for any HTML in content
- WYSIWYG editor for posts based on Jodit
- Support for External Featured Images with alt text
- Support for SEO custom SEO description
- Support for pages under tags/categories
- RSS paginated feed Atom/RSS2
- Support for EVM wallet post-signing
- Support for related posts either by tags or manually
- Support for ld+json structured data
- Custom page type schema per post
- FTS search with Supabase
- Support Giscus comments
- Few to no dependencies
- Component for sharing posts (copy link, x, farcasterXYZ, fosscaster, whatsapp, pinterest, bluesky, reddit, telegram)
- Tag cloud widget with cache
- GoodReads widget with cache
- XML Sitemap
- Optimizations function for Google CDN images
- Draft support
- Guarded preview route for previewing drafts
- Desktop/Mobile menu

## Demo Admin Panel

Visit [https://blog.flashsoft.eu/login](https://blog.flashsoft.eu/login) and log in with the following credentials:
> user: admin
> password: demo

The demo user will not allow any changes, and is just for viewing the admin panel.
