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
