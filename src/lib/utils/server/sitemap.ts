import { config } from '#/lib/config/index.ts';
import { supabase } from '#/lib/node/supaClientFS.ts';

const CAT_PATH = 'category';
const TAG_PATH = 'tag';
const AUTHOR_PATH = 'author';
const CACHE_TTL_MS = 60 * 60 * 1000 * 48;
const PAGE_SIZE = 1000;

type SitemapPath = {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
};

type SitemapCache = {
  value_json: SitemapPath[];
  updated_at: string;
};

const getLastmod = (updatedAt?: string | null) => {
  if (!updatedAt) return undefined;
  const timestamp = Date.parse(updatedAt);
  return Number.isNaN(timestamp) ? undefined : new Date(timestamp).toISOString();
};

const fetchAll = async <T>(loadPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>) => {
  const rows: T[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await loadPage(from, from + PAGE_SIZE - 1);
    if (error) throw error;

    const page = data ?? [];
    rows.push(...page);
    if (page.length < PAGE_SIZE) return rows;
  }
};

const checkCache = async (): Promise<SitemapPath[] | undefined> => {
  const { data, error } = await supabase.from('fsk_blog_store').select('value_json, updated_at').eq('name', 'sitemap').maybeSingle();
  if (error) throw error;

  const cache = data as SitemapCache | null;
  const cacheAge = cache?.updated_at ? Date.now() - Date.parse(cache.updated_at) : Number.POSITIVE_INFINITY;
  if (Array.isArray(cache?.value_json) && cacheAge >= 0 && cacheAge < CACHE_TTL_MS) {
    console.info('Sitemap cache is up to date, using cached version');
    return cache.value_json;
  }
};

export const invalidateSitemapCache = async (waitUntil?: (promise: Promise<unknown>) => void) => {
  const { error } = await supabase.from('fsk_blog_store').delete().eq('name', 'sitemap');
  if (error) throw error;

  const regeneration = generatePaths().catch((cause) => {
    console.error('Failed to regenerate sitemap cache after invalidation:', cause);
  });
  if (waitUntil) {
    waitUntil(regeneration);
  } else {
    void regeneration;
  }
};

export const generatePosts = async () => {
  const posts = await fetchAll((from, to) =>
    supabase.from('fsk_blog_posts').select('slug, updated_at').eq('draft', false).order('created_at', { ascending: false }).range(from, to)
  );

  return posts.map((post) => ({
    url: post.slug,
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: getLastmod(post.updated_at)
  }));
};

export const generateCategories = async () => {
  const categories = await fetchAll((from, to) => supabase.from('fsk_blog_cat').select('slug, updated_at').order('created_at', { ascending: false }).range(from, to));

  return categories.map((cat) => ({
    url: `${CAT_PATH}/${cat.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: getLastmod(cat.updated_at)
  }));
};

export const generateAuthors = async () => {
  const authors = await fetchAll((from, to) => supabase.from('fsk_blog_author').select('username').order('created_at', { ascending: false }).range(from, to));

  return authors.map((author) => ({
    url: `${AUTHOR_PATH}/${author.username}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));
};

export const generateTags = async () => {
  const tags = await fetchAll((from, to) => supabase.from('fsk_blog_tag').select('slug, updated_at').order('created_at', { ascending: false }).range(from, to));

  return tags.map((tag) => ({
    url: `${TAG_PATH}/${tag.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: getLastmod(tag.updated_at)
  }));
};

export const generatePaths = async (): Promise<SitemapPath[]> => {
  const sitemapCache = await checkCache();
  if (sitemapCache) return sitemapCache;

  const [posts, authors, categories, tags] = await Promise.all([
    generatePosts(),
    config.authorPageEnabled ? generateAuthors() : Promise.resolve([]),
    generateCategories(),
    generateTags()
  ]);
  const paths: SitemapPath[] = [{ url: '', priority: '1.0', changefreq: 'daily', lastmod: posts?.[0]?.lastmod }, ...posts, ...authors, ...categories, ...tags];

  const { error } = await supabase.from('fsk_blog_store').upsert({
    name: 'sitemap',
    value_json: paths,
    updated_at: new Date().toISOString()
  });
  if (error) console.error('Failed to update sitemap cache:', error);

  return paths;
};
