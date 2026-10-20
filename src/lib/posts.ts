import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'> & {
  /** Revision letter in publish order: first post is A, then B … Z, AA … */
  rev: string;
  /** Drawing number, e.g. "001" */
  num: string;
  minutes: number;
};

export function revLetter(index: number): string {
  let n = index + 1;
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

export function readingTime(body = ''): number {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Published posts, newest first. Drafts show up only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return all
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .map((p, i) => ({
      ...p,
      rev: revLetter(i),
      num: String(i + 1).padStart(3, '0'),
      minutes: readingTime(p.body),
    }))
    .reverse();
}

/** URL for a tag's page. */
export function tagHref(tag: string): string {
  return `/log/tags/${tag}/`;
}

/** Every tag with its post count, most used first. */
export function allTags(posts: Post[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Other posts sharing tags with `post`, most shared tags first, then newest. */
export function relatedPosts(post: Post, posts: Post[], limit = 3): Post[] {
  const tags = new Set(post.data.tags);
  return posts
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, shared: p.data.tags.filter((t) => tags.has(t)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .slice(0, limit)
    .map(({ p }) => p);
}
