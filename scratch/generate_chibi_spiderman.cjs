const fs = require('fs');

const colors = {
  'O': '#111111', // Black/Outline
  'R': '#E23636', // Red
  'B': '#285CC4', // Blue
  'W': '#FFFFFF', // White
  'L': '#111111', // Web Line
};

// Base 32x32 Grid
// 1. Idle / Cling (Inspired by reference 2 - standing/compact)
const idleFrame = [
"................................",
"...........OOOOOOO..............",
".........OOORRRRROOO............",
"........OORRRRRRRRROO...........",
".......OORRRRRRRRRRROO..........",
"......OORRWWWRRRWWWRROO.........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRRWWWRRRWWWRRRO.........",
".......ORRRRRRRRRRRRRO..........",
".......OORRRRRRRRRRROO..........",
"........OORRRRRRRRROO...........",
".........OOORRRRROOO............",
".......OOOORROORROOOO...........",
"......OORRROOBBOORRROO..........",
".....OORRRROOBBOORRRROO.........",
"....OORRRRRROBBOORRRRRRO........",
"....ORRRROOOOBBOOOORRRRO........",
"....OOOOO...OBBO...OOOOO........",
"............OBBO................",
"..........OOBBBBOO..............",
".........OOBBBBBBOO.............",
"........OOBBBOOBBBOO............",
".......OOBBOO..OOBBOO...........",
".......ORRO......ORRO...........",
"......OORRO......OORRO..........",
".....OORRRO......OORRRO.........",
"....OORRRRO......OORRRRO........",
"...OOOOOOOO......OOOOOOOO.......",
"................................",
"................................"
];

// 2. Swinging (Diagonal pose, arm reaching up)
const swingingFrame = [
"......................LL........",
"......................LL........",
".....................OOO........",
"....................ORRO........",
"...........OOOOOOO..ORRO........",
".........OOORRRRROOO.OOO........",
"........OORRRRRRRRROOOOO........",
".......OORRWWWRRRWWWRRRO........",
"......OORRWWWWWRWWWWWRRO........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRRWWWRRRWWWRRRO.........",
".......ORRRRRRRRRRRRRO..........",
".......OORRRRRRRRRRROO..........",
"........OORRRRRRRRROO...........",
".......OOOORROORROOO............",
"......OOBBBROOBBOORROO..........",
".....OOBBBBBOOBBOORRROO.........",
"....OOBBBBBBOBBOORRRRRRO........",
"....OOBBBOOOOBBOOOORRRRO........",
"....OOOOO...OBBO...OOOOO........",
"............OBBO................",
"..........OOBBBBOO..............",
".........OOBBBBBBOO.............",
"........OOBBBOOBBBOO............",
".......OOBBOO..OOBBOO...........",
".......ORRO......OOOO...........",
"......OORRO.......ORRO..........",
".....OORRRO.......ORRRO.........",
"....OOOOOOO.......OOOOO.........",
"................................",
"................................"
];

// 3. Crawling (Crouched on wall)
const crawlingFrame = [
"................................",
"................................",
"................................",
"...........OOOOOOO..............",
".........OOORRRRROOO............",
"........OORRRRRRRRROO...........",
".......OORRWWWRRRWWWRRO.........",
"......OORRWWWWWRWWWWWRRO........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRRWWWRRRWWWRRRO.........",
".......ORRRRRRRRRRRRRO..........",
".......OORRRRRRRRRRROO..........",
"........OORRRRRRRRROO...........",
"......OOOOORRRRRRROOOO..........",
".....OORRROOBBBBBOORRRO.........",
"....OORRRROOBBBBBOORRRRO........",
"...OORRRRROOBBBBBOORRRRRO.......",
"...OOOOOOOOOBBBBBOOOOOOOO.......",
".......OOBBBBBBBBBBBOO..........",
"......OOBBBBBBBBBBBBBBO.........",
".....OOBBBOOOOBBBBOOOBBO........",
"....OOBBBO...OBBBO...OBBO.......",
"...OOBBBOO...OBBBO...OOBBO......",
"...ORRRROO...OOOOO...OORRRO.....",
"..OORRRROO..........OORRRRO.....",
"..OOOOOOOO..........OOOOOOOO....",
"................................",
"................................",
"................................",
"................................",
"................................"
];

// 4. Ascending / Climbing Up
const ascendingFrame = [
"...............LL...............",
"...............LL...............",
"..............OOOO..............",
".............OORRO..............",
".............OORRO..............",
"...........OOOOOOOO.............",
".........OOORRRRRRROO...........",
"........OORRRRRRRRRRRO..........",
".......OORRWWWRRRWWWRRO.........",
"......OORRWWWWWRWWWWWRRO........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRWWWWWRWWWWWRRO.........",
"......ORRRWWWRRRWWWRRRO.........",
".......ORRRRRRRRRRRRRO..........",
".......OORRRRRRRRRRROO..........",
"........OORRRRRRRRROO...........",
".........OOOBBBBBOOO............",
"........OOBBBBBBBBBOO...........",
".......OOBBBBBBBBBBBOO..........",
"......OOBBBOOOOOBBBOO...........",
"......OBBBO....OBBBO............",
"......OOOO......OOOO............",
".......ORRO....ORRO.............",
".......ORRO....ORRO.............",
"......OORRRO..OORRRO............",
".....OORRRRO..OORRRRO...........",
".....OOOOOOO..OOOOOOO...........",
"................................",
"................................",
"................................",
"................................",
"................................"
];

function generatePaths(frame) {
  const width = frame[0].length;
  const height = frame.length;
  const colorPaths = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = frame[y][x];
      if (char !== '.') {
        const hex = colors[char];
        if (!colorPaths[hex]) colorPaths[hex] = [];
        colorPaths[hex].push(`M${x},${y} h1 v1 h-1 Z`);
      }
    }
  }

  return Object.keys(colorPaths).map(hex => {
    return `<path fill="${hex}" d="${colorPaths[hex].join(' ')}" />`;
  }).join('\\n');
}

const idleSVG = generatePaths(idleFrame);
const swingingSVG = generatePaths(swingingFrame);
const crawlingSVG = generatePaths(crawlingFrame);
const ascendingSVG = generatePaths(ascendingFrame);

const componentCode = `import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function SpiderManScroller() {
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const [state, setState] = useState('idle'); // idle, swinging, crawling, ascending
  const { playWebFlick, playCrawlTick } = useSoundEffects();
  const prevState = useRef('idle');

  useEffect(() => {
    return smoothVelocity.on('change', (latest) => {
      let newState = 'idle';
      
      // Determine pose based on velocity
      if (latest > 150) newState = 'swinging';
      else if (latest > 20) newState = 'crawling';
      else if (latest < -100) newState = 'ascending';
      else newState = 'idle';

      if (newState !== prevState.current) {
        if (newState === 'swinging' || newState === 'ascending') playWebFlick();
        if (newState === 'crawling') playCrawlTick();
        prevState.current = newState;
        setState(newState);
      }
    });
  }, [smoothVelocity, playWebFlick, playCrawlTick]);

  // Smooth travel along paths
  const xPath = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], 
    ['90vw', '10vw', '10vw', '80vw', '80vw', '10vw', '90vw']
  );

  const yPath = useTransform(scrollYProgress,
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
    ['5vh', '25vh', '45vh', '65vh', '80vh', '90vh', '95vh']
  );

  // Subtle rotation for swinging and ascending
  const rotation = useTransform(smoothVelocity, [-1000, 0, 1000], [-25, 0, 25]);

  const getSVGPaths = () => {
    if (state === 'idle') return \`${idleSVG}\`;
    if (state === 'crawling') return \`${crawlingSVG}\`;
    if (state === 'ascending') return \`${ascendingSVG}\`;
    return \`${swingingSVG}\`;
  };

  return (
    <motion.div
      className="fixed z-[95] pointer-events-none flex flex-col items-center"
      style={{ x: xPath, y: yPath }}
    >
      {/* Dynamic Web Line */}
      {(state === 'swinging' || state === 'ascending') && (
        <motion.div 
          className="absolute bottom-[80%] mb-0 w-[2px] bg-black/60 origin-bottom"
          style={{ height: '150vh', rotate: state === 'swinging' ? rotation : 0 }}
        />
      )}

      {/* Spider-Man Sprite */}
      <motion.div 
        className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        style={{ rotate: state === 'swinging' || state === 'ascending' ? rotation : 0 }}
        animate={
          state === 'idle' ? { y: [0, 3, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
          : state === 'crawling' ? { y: [0, 4, 0], transition: { repeat: Infinity, duration: 0.6 } } 
          : state === 'ascending' ? { y: [0, -6, 0], transition: { repeat: Infinity, duration: 0.5 } }
          : { y: [0, 10, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }
        }
      >
        <svg 
          viewBox="0 0 32 32" 
          className="w-full h-full" 
          style={{ imageRendering: 'pixelated' }}
          dangerouslySetInnerHTML={{ __html: getSVGPaths() }}
        />
      </motion.div>
    </motion.div>
  );
}
`;

fs.writeFileSync('src/components/SpiderManScroller.jsx', componentCode);
console.log('SpiderManScroller.jsx generated successfully.');
