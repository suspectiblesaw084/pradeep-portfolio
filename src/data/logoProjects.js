/**
 * Logo Design Projects — Centralized Three-State Logo Asset Mapping
 *
 * State 1 (Default):       Dark card (#141311) + white monochrome logo
 * State 2 (Card hover):    Pure white card (#FFFFFF) + complete black monochrome logo
 * State 3 (Logo hover):    Pure white card (#FFFFFF) + coloured logo revealed inside
 *                          a soft cursor-following circular spotlight over the black logo
 *
 * Asset folders (consistent filenames across all three):
 *   - public/logos/white/<slug>.png
 *   - public/logos/black/<slug>.png
 *   - public/logos/colored/<slug>.png
 *
 * Replacing any PNG in these folders with the same filename updates the gallery
 * automatically without requiring code changes.
 */

const logoProjects = [
  {
    id: 'logo-locally-groomed',
    brand: 'Locally Groomed',
    category: 'Apparel & Corporate Gifting',
    white: '/logos/white/locally-groomed.png',
    black: '/logos/black/locally-groomed.png',
    colored: '/logos/colored/locally-groomed.png',
  },
  {
    id: 'logo-kovedaa',
    brand: 'Kovedaa',
    category: 'Corporate Identity',
    white: '/logos/white/kovedaa.png',
    black: '/logos/black/kovedaa.png',
    colored: '/logos/colored/kovedaa.png',
  },
  {
    id: 'logo-aanya-hospital',
    brand: 'Aanya Hospital',
    category: 'Healthcare',
    white: '/logos/white/aanya-hospital.png',
    black: '/logos/black/aanya-hospital.png',
    colored: '/logos/colored/aanya-hospital.png',
  },
  {
    id: 'logo-crime-stopper',
    brand: 'Crime Stopper',
    category: 'Security Services',
    white: '/logos/white/crime-stopper.png',
    black: '/logos/black/crime-stopper.png',
    colored: '/logos/colored/crime-stopper.png',
  },
  {
    id: 'logo-nearby-studio',
    brand: 'Nearby Studio',
    category: 'Creative Studio',
    white: '/logos/white/nearby-studio.png',
    black: '/logos/black/nearby-studio.png',
    colored: '/logos/colored/nearby-studio.png',
  },
  {
    id: 'logo-nkr-tv',
    brand: 'NKR TV',
    category: 'Broadcast Network',
    white: '/logos/white/nkr-tv.png',
    black: '/logos/black/nkr-tv.png',
    colored: '/logos/colored/nkr-tv.png',
  },
  {
    id: 'logo-buzziwah',
    brand: 'Buzziwah',
    category: 'Digital Commerce',
    white: '/logos/white/buzziwah.png',
    black: '/logos/black/buzziwah.png',
    colored: '/logos/colored/buzziwah.png',
  },
];

export default logoProjects;
