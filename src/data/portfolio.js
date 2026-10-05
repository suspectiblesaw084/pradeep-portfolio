// Import Brandbooks (PDFs) and their placeholders
const brandbookFiles = import.meta.glob('/public/brandbooks/*.pdf');
const placeholderFiles = import.meta.glob('/public/brandbook-logo-placeholders/*.png');

const autoBrandbooks = Object.keys(brandbookFiles).map((path, index) => {
  const publicPath = path.replace('/public', '');
  
  // Extract base filename without extension
  const filenameMatch = path.match(/\/([^\/]+)\.pdf$/i);
  const baseFilename = filenameMatch ? filenameMatch[1] : `Brandbook ${index + 1}`;

  // Find matching placeholder image by matching base filename
  let matchedThumbnail = 'PDF';
  const placeholderKeys = Object.keys(placeholderFiles);
  for (const pKey of placeholderKeys) {
    const pMatch = pKey.match(/\/([^\/]+)\.png$/i);
    if (pMatch && pMatch[1] === baseFilename) {
      matchedThumbnail = pKey.replace('/public', '');
      break;
    }
  }

  return {
    id: `auto-brand-${index}`,
    title: baseFilename,
    category: 'Brand Identity & Brandbooks',
    year: '',
    description: '',
    thumbnail: matchedThumbnail,
    type: 'pdf',
    details: { pdfLink: publicPath }
  };
});

// Import Logos
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
    details: { images: [publicPath] }
  };
});

// Import Social Media
const socialMediaFiles = import.meta.glob('/public/social-media/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}');
const autoSocialMedia = Object.keys(socialMediaFiles).map((path, index) => {
  const publicPath = path.replace('/public', '');
  return {
    id: `auto-social-${index}`,
    title: '',
    category: 'Social Media',
    year: '',
    description: '',
    thumbnail: publicPath,
    type: 'image',
    details: { images: [publicPath] }
  };
});

export const CATEGORIES = [
  'All',
  'Brand Identity & Brandbooks',
  'Logo Design',
  'Social Media'
];

export const projects = [...autoBrandbooks, ...autoLogos, ...autoSocialMedia];
