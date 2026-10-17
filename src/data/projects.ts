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
      'Free calculators and guides for setting up a car at home: string alignment, coilover travel and corner balance, plus a garage to keep your specs in.',
    tags: ['TypeScript', 'React', 'Web'],
    live: 'https://stringline.ing',
    image: '/images/stringline.webp',
    imageAlt: 'Stringline homepage with a top-down car diagram showing toe, camber and cross-weight readouts',
  },
  {
    name: 'corner-scales',
    status: 'Prototype',
    summary:
      'DIY wireless corner-weight scales. Each pad is its own instrument; pads share readings over ESP-NOW, so connecting to any one of them gives all four corners with no network.',
    tags: ['Rust', 'Embassy', 'ESP32-S3', 'ESP-NOW'],
    source: 'https://github.com/jaimebuildsthings/corner-scales',
  },
  {
    name: 'pit-pyro',
    status: 'Design',
    summary:
      'Handheld tire pyrometer. A thermal camera reads outer, middle and inner tread temps in one trigger pull and logs every reading on the device, so four tires take under a minute.',
    tags: ['OpenSCAD', 'ESP32-S3', 'MLX90640', 'Rust'],
    source: 'https://github.com/jaimebuildsthings/pit-pyro',
    image: '/images/pit-pyro.webp',
    imageAlt: 'Cutaway render of the pistol-grip enclosure with the camera, screen, board and battery in place',
  },
];
