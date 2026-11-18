// Auto-discover Brandbooks (PDFs) and their matching logo placeholders
const brandbookFiles = import.meta.glob('/public/brandbooks/*.pdf');
const placeholderFiles = import.meta.glob('/public/brandbook-logo-placeholders/*.png');

// Rich, deep editorial cover tones (ensuring white/light brandbook logos have strong contrast)
const BRANDBOOK_THEMES = {
  'Aanya Hospital': {
    coverBg: '#1D3338',
    spineBg: '#142428',
    accent: '#8AC8EB',
    tag: 'Brandbook',
  },
  'CRIME STOPPER': {
    coverBg: '#1E1D1B',
    spineBg: '#141311',
    accent: '#D98772',
    tag: 'Brandbook',
  },
  'Kovedaa': {
    coverBg: '#272338',
    spineBg: '#1B1828',
    accent: '#B8A7CE',
    tag: 'Brandbook',
  },
  'Locally Groomed': {
    coverBg: '#1E3156',
    spineBg: '#15223D',
    accent: '#E9D88E',
    tag: 'Brandbook',
  },
  'Nearby Studio': {
    coverBg: '#243329',
    spineBg: '#19241D',
    accent: '#9EAD91',
    tag: 'Brandbook',
  },
  'NKR TV': {
    coverBg: '#32221E',
    spineBg: '#241714',
    accent: '#D98772',
    tag: 'Brandbook',
  },
};

const placeholderKeys = Object.keys(placeholderFiles);

export const brandbookProjects = Object.keys(brandbookFiles)
  .sort()
  .map((path, index) => {
    const publicPath = path.replace('/public', '');
    const filenameMatch = path.match(/\/([^/]+)\.pdf$/i);
    const baseFilename = filenameMatch ? filenameMatch[1] : `Brandbook ${index + 1}`;

    let matchedThumbnail = 'PDF';
    for (const pKey of placeholderKeys) {
      const pMatch = pKey.match(/\/([^/]+)\.png$/i);
      if (pMatch && pMatch[1] === baseFilename) {
        matchedThumbnail = pKey.replace('/public', '');
        break;
      }
    }

    const theme = BRANDBOOK_THEMES[baseFilename] || {
      coverBg: '#24231F',
      spineBg: '#191815',
      accent: '#E9D88E',
      tag: 'Brand Guidelines',
    };

    return {
      id: `auto-brand-${index}`,
      indexLabel: String(index + 1).padStart(2, '0'),
      title: baseFilename,
      category: 'Brand Identity & Brandbooks',
      tag: theme.tag,
      coverBg: theme.coverBg,
      spineBg: theme.spineBg,
      accent: theme.accent,
      thumbnail: matchedThumbnail,
      type: 'pdf',
      details: { pdfLink: publicPath },
    };
  });

// Auto-discover Logos (legacy folder kept intact for backward compatibility)
const logoFiles = import.meta.glob('/public/logos/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}');
const autoLogos = Object.keys(logoFiles).map((path, index) => {
  const publicPath = path.replace('/public', '');
  return {
    id: `auto-logo-${index}`,
    title: '',
    category: 'Logo Design',
    year: '',
    description: '',
    thumbnail: publicPath,
    type: 'image',
    details: { images: [publicPath] },
  };
});

// Client label mapping for real Social Media assets (derived from filename prefixes)
const SOCIAL_CLIENT_META = {
  sripadastudios: { name: 'Sripada Studios', accent: '#5277C7' },
  locallygroomed_bangalore: { name: 'Locally Groomed', accent: '#5277C7' },
  samratrestaurant: { name: 'Samrat Restaurant', accent: '#D98772' },
  aanya_hospital: { name: 'Aanya Hospital', accent: '#7DD3C8' },
  buzziwah: { name: 'Buzziwah', accent: '#E9D88E' },
  fitnessfactoryisrolayout: { name: 'Fitness Factory', accent: '#D98772' },
  hearfonclinics: { name: 'Hearfon Clinics', accent: '#8AC8EB' },
  lilbeez_preschoolbooks: { name: 'Lil Beez Books', accent: '#E9D88E' },
  littlekidzschool: { name: 'Little Kidz School', accent: '#9EAD91' },
  svatantrarehab: { name: 'Svatantra Rehab', accent: '#9EAD91' },
  wmndoctors: { name: 'WMN Doctors', accent: '#B8A7CE' },
  lifeatsripadastudios: { name: 'Life at Sripada', accent: '#8AC8EB' },
  g9communication_media: { name: 'G9 Communication', accent: '#B8A7CE' },
};

function extractClientKey(path) {
  const filename = path.split('/').pop() || '';
  const rawPrefix = filename.split('2026_')[0].toLowerCase();
  if (rawPrefix.startsWith('samratrestaurant')) return 'samratrestaurant';
  return rawPrefix;
}

// Auto-discover Social Media artworks
const socialMediaFiles = import.meta.glob(
  '/public/social-media/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}'
);

export const socialProjects = Object.keys(socialMediaFiles)
  .sort()
  .map((path, index) => {
    const publicPath = path.replace('/public', '');
    const clientKey = extractClientKey(path);
    const meta = SOCIAL_CLIENT_META[clientKey] || {
      name: clientKey.replace(/[_.-]+/g, ' '),
      accent: '#9EAD91',
    };

    return {
      id: `auto-social-${index}`,
      clientKey,
      clientName: meta.name,
      accent: meta.accent,
      title: meta.name,
      category: 'Social Media',
      thumbnail: publicPath,
      type: 'image',
      details: { images: [publicPath] },
    };
  });

// Build client groups ordered with visually diverse campaigns first
const CLIENT_PRIORITY = [
  'sripadastudios',
  'locallygroomed_bangalore',
  'samratrestaurant',
  'aanya_hospital',
  'buzziwah',
  'fitnessfactoryisrolayout',
  'hearfonclinics',
  'svatantrarehab',
  'wmndoctors',
  'lilbeez_preschoolbooks',
  'littlekidzschool',
  'lifeatsripadastudios',
  'g9communication_media',
];

export const socialClientGroups = (() => {
  const map = new Map();
  for (const item of socialProjects) {
    if (!map.has(item.clientKey)) {
      map.set(item.clientKey, {
        key: item.clientKey,
        name: item.clientName,
        accent: item.accent,
        items: [],
      });
    }
    map.get(item.clientKey).items.push(item);
  }

  return Array.from(map.values()).sort((a, b) => {
    const idxA = CLIENT_PRIORITY.indexOf(a.key);
    const idxB = CLIENT_PRIORITY.indexOf(b.key);
    const rankA = idxA === -1 ? 999 : idxA;
    const rankB = idxB === -1 ? 999 : idxB;
    return rankA - rankB;
  });
})();

// Interleaved curated sequence for the "All Campaigns" editorial grid so every row shows brand variety
export const curatedSocialSequence = (() => {
  const result = [];
  const queues = socialClientGroups.map((g) => [...g.items]);
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const q of queues) {
      if (q.length > 0) {
        result.push(q.shift());
        remaining = true;
      }
    }
  }
  return result;
})();

// Curated hero preview frames drawn strictly from real social media artworks
export const heroShowcaseItems = (() => {
  const wanted = [
    'sripadastudios',
    'locallygroomed_bangalore',
    'samratrestaurant',
    'aanya_hospital',
    'fitnessfactoryisrolayout',
    'buzziwah',
  ];
  const picks = [];
  for (const key of wanted) {
    const group = socialClientGroups.find((g) => g.key === key);
    if (group && group.items.length > 0) {
      picks.push(group.items[0]);
    }
  }
  return picks;
})();

export const CATEGORIES = [
  'All',
  'Brand Identity & Brandbooks',
  'Logo Design',
  'Social Media',
];

export const projects = [...brandbookProjects, ...autoLogos, ...socialProjects];
