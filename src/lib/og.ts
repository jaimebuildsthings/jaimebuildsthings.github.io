// Link preview images (Open Graph), drawn as a blueprint sheet and rendered at build time.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../site.config';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));

const fonts = [
  { name: 'Display', data: font('big-shoulders-display', 'big-shoulders-display-latin-900-normal.woff'), weight: 900 as const },
  { name: 'Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'), weight: 500 as const },
];

// Blueprint palette, matching global.css
const C = {
  ground: '#0d2b4e',
  ink: '#d6e6f5',
  soft: '#b9d0e6',
  muted: '#93b3d3',
  accent: '#ffa552',
  line: (a: number) => `rgba(214, 230, 245, ${a})`,
};

const W = 1200;
const H = 630;
const PAD = 28;

export interface OgCard {
  /** Small mono line above the title, e.g. "LOG-002 · REV B · 2026-10-20" */
  eyebrow: string;
  title: string;
  description?: string;
  sheet: string;
  rev?: string;
}

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

function grid(): Node[] {
  const lines: Node[] = [];
  for (let x = 0; x <= W; x += 30) {
    lines.push(el('div', { position: 'absolute', left: x, top: 0, width: 1, height: H, background: C.line(x % 150 === 0 ? 0.09 : 0.035) }));
  }
  for (let y = 0; y <= H; y += 30) {
    lines.push(el('div', { position: 'absolute', top: y, left: 0, height: 1, width: W, background: C.line(y % 150 === 0 ? 0.09 : 0.035) }));
  }
  return lines;
}

function titleSize(title: string): number {
  if (title.length <= 18) return 132;
  if (title.length <= 32) return 104;
  return 80;
}

function cell(label: string, value: string, flex = 1, accent = false): Node {
  return el('div', { flexDirection: 'column', gap: 6, flex, padding: '14px 20px', borderRight: `1.5px solid ${C.line(0.35)}` }, [
    el('div', { fontFamily: 'Mono', fontSize: 14, letterSpacing: 2, color: C.muted }, label.toUpperCase()),
    el('div', { fontFamily: 'Mono', fontSize: 20, color: accent ? C.accent : C.ink }, value),
  ]);
}

export async function renderOg(card: OgCard): Promise<Buffer> {
  const sheet = el(
    'div',
    {
      position: 'absolute',
      left: PAD,
      top: PAD,
      width: W - PAD * 2,
      height: H - PAD * 2,
      flexDirection: 'column',
      border: `2px solid ${C.line(0.55)}`,
    },
    [
      // header
      el('div', { alignItems: 'center', padding: '22px 36px', borderBottom: `1.5px solid ${C.line(0.35)}` }, [
        el('div', { fontFamily: 'Mono', fontSize: 22, color: C.ink }, [
          el('span', {}, 'jaimebuildsthings'),
          el('span', { color: C.accent }, '.dev'),
        ]),
      ]),
      // body
      el('div', { flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 18, padding: '0 36px' }, [
        el('div', { fontFamily: 'Mono', fontSize: 20, letterSpacing: 3, color: C.accent }, card.eyebrow.toUpperCase()),
        el(
          'div',
          { fontFamily: 'Display', fontWeight: 900, fontSize: titleSize(card.title), lineHeight: 0.9, color: C.ink, maxWidth: 1040 },
          card.title.toUpperCase(),
        ),
        ...(card.description
          ? [el('div', { fontFamily: 'Sans', fontSize: 28, lineHeight: 1.35, color: C.soft, maxWidth: 940, lineClamp: 2 }, card.description)]
          : []),
      ]),
      // title block
      el('div', { borderTop: `1.5px solid ${C.line(0.55)}` }, [
        cell('Project', SITE.name, 2),
        cell('Drawn by', SITE.author),
        cell('Sheet', card.sheet),
        el('div', { flexDirection: 'column', gap: 6, flex: 1, padding: '14px 20px' }, [
          el('div', { fontFamily: 'Mono', fontSize: 14, letterSpacing: 2, color: C.muted }, 'REV'),
          el('div', { fontFamily: 'Mono', fontSize: 20, color: C.accent }, card.rev ?? '—'),
        ]),
      ]),
    ],
  );

  const svg = await satori(el('div', { width: W, height: H, position: 'relative', background: C.ground }, [...grid(), sheet]) as never, {
    width: W,
    height: H,
    fonts,
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
}
