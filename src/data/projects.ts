// Featured builds on the homepage.
// `notes`, `source` and `live` are optional; a link only renders when it is set.
export interface Project {
  name: string;
  status: string;
  summary: string;
  tags: string[];
  notes?: string; // e.g. '/log/my-build-writeup/'
  source?: string; // e.g. 'https://github.com/jaimebuildsthings/repo'
  live?: string; // e.g. 'https://example.com'
  image?: string; // e.g. '/images/project.png' (put the file in /public/images)
  imageAlt?: string;
}

export const projects: Project[] = [
  {
    name: 'Stringline',
    status: 'Live',
    summary:
      "Free calculators and guides for doing your own car setup: string alignment, coilover travel and corner balance. Save your car's specs in the garage.",
    tags: ['TypeScript', 'React Router', 'Supabase', 'Cloudflare Workers'],
    live: 'https://stringline.ing',
    image: '/images/stringline.webp',
    imageAlt: 'Stringline homepage with a top-down car diagram showing toe, camber and cross-weight readouts',
  },
  {
    name: 'corner-scales',
    status: 'Prototype',
    summary:
      'DIY wireless corner-weight scales. Four pads with load cells and an ESP32-S3 each, talking over ESP-NOW.',
    tags: ['Rust', 'Embassy', 'ESP32-S3', 'ESP-NOW', 'OpenSCAD'],
    source: 'https://github.com/jaimebuildsthings/corner-scales',
    image: '/images/corner-scales.webp',
    imageAlt: 'Exploded render of a full-size pad: top plate, load cells, base plate and electronics box',
  },
  {
    name: 'pit-pyro',
    status: 'Design',
    summary:
      'DIY handheld tire pyrometer. A thermal camera reads the outer, middle and inner tread temps in one trigger pull and saves every reading on the device.',
    tags: ['OpenSCAD', 'ESP32-S3', 'MLX90640', 'Rust'],
    source: 'https://github.com/jaimebuildsthings/pit-pyro',
    image: '/images/pit-pyro.webp',
    imageAlt: 'Cutaway render of the pistol-grip enclosure with the camera, screen, board and battery in place',
  },
];
