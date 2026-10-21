import type { APIRoute } from 'astro';
import { getPosts, isoDate } from '../../lib/posts';
import { renderOg, type OgCard } from '../../lib/og';
import { SITE } from '../../site.config';

// One preview image for the site (/og/index.png) and one per post (/og/log/<slug>.png).
export async function getStaticPaths() {
  const posts = await getPosts();
  const site: OgCard = {
    eyebrow: 'Dwg. no. JBT-001 · Full-stack engineer',
    title: SITE.title + '.',
    description: SITE.description,
    sheet: 'HOME',
    rev: posts[0]?.rev,
  };
  return [
    { params: { slug: 'index' }, props: { card: site } },
    ...posts.map((post) => ({
      params: { slug: `log/${post.id}` },
      props: {
        card: {
          eyebrow: `LOG-${post.num} · Rev ${post.rev} · ${isoDate(post.data.date)}`,
          title: post.data.title,
          description: post.data.description,
          sheet: `LOG-${post.num}`,
          rev: post.rev,
        } satisfies OgCard,
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props.card as OgCard);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
