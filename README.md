# Svelte Kit & supaBase blog

## Description

This is a blog repo with many features, very lightweight and fast.

It is based on Svelte Kit and SupaBase.

It can be used with Netlify or Vercel.
Most of the features were made to suit my needs, but I hope they will also be useful to others.

Deployed on [https://blog.flashsoft.eu](https://blog.flashsoft.eu)

## Features

Should run on serverless functions, and functions/edge both Node and Deno

Lightweight blog with SupaBase database with the following features:

- Admin panel for managing posts/users & other settings
- Multi-user system with roles (admin, contributor)
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
- Support for ECHO commenting / other features third-party service
- Few to no dependencies
- Tag cloud widget with cache
- Good Reads widget with cache
- XML Sitemap
- Optimizations function for Google CDN images
- Draft support
- Guarded preview route for previewing drafts
