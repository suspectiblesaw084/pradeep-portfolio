const fs = require('fs');

const colors = {
  'O': '#111111', // Black/Outline
  'R': '#E23636', // Red
  'D': '#A31B1B', // Dark Red
  'B': '#285CC4', // Blue
  'S': '#193B82', // Dark Blue
  'W': '#FFFFFF', // White
};

const swingingFrame = [
"........................................",
"...................O....................",
"...................O....................",
"...................O....................",
"...................O....................",
"...................O....................",
"...................O....................",
".................OOOOOO.................",
"................ORRRRRRO................",
"...............ORRWWWRRRO...............",
"..............ORRWWWWWRRO...............",
"..............ORRRRRRRRRO...............",
"...............ORRRRRRRO................",
".............OOOOBBBBOOOOO..............",
"...........OORRRBBBBBBBRRROO............",
"..........ORRRRRBBBBBBBRRRRRO...........",
".........ORRRRROOBBBBOOORRRRRO..........",
"........ORRRRO...OOOO...ORRRRRO.........",
".......ORRRRO............ORRRRRO........",
".......ORRRO..............ORRRRO........",
".......ORRO................ORRRO........",
".......OOO..................OOOO........",
"........O....................O..........",
".......OBBBO..............OBBBO.........",
"......OBBBBO..............OBBBBBO.......",
".....OBBBBBO..............OBBBBBBO......",
"....OBBBBBBO..............OBBBBBBBO.....",
"...OBBBOOOBO..............OBOOOBBBBO....",
"...ORRO...OO..............OO...ORRRO....",
"..ORRRO.........................ORRRO...",
"..ORRO...........................ORRO...",
"..OOO.............................OOO...",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
];

const crawlingFrame = [
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"...................OOOOOO...............",
"..................ORRRRRRO..............",
".................ORRWWWRRRO.............",
".................ORRWWWWWRRO............",
".................ORRRRRRRRRO............",
"..................ORRRRRRRO.............",
"...........OOOOOOOOBBBBOOOOOO...........",
"..........ORRRRRRRBBBBBBRRRRRO..........",
".........ORRRRRRRRBBBBBBRRRRRRO.........",
"........ORRRRRRRROOBBBBOORRRRRRO........",
"........ORRRRROO...OOOO...OORRRRO.......",
".......ORRRRO................ORRRO......",
"......ORRRRO..................ORRRO.....",
".....ORRRRO....................ORRRO....",
"....ORRRRO......................ORRRO...",
"....OOOOO........................OOOO...",
"....OBBBO........................OBBBO..",
"....OBBBO........................OBBBO..",
"....ORRRO........................ORRRO..",
"....ORRRO........................ORRRO..",
".....OOO..........................OOO...",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
"........................................",
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

const swingingSVG = generatePaths(swingingFrame);
const crawlingSVG = generatePaths(crawlingFrame);

const componentCode = `import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function SpiderManScroller() {
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const [state, setState] = useState('swinging'); // swinging, crawling, ascending
  const { playWebFlick, playCrawlTick } = useSoundEffects();
  const prevState = useRef('swinging');

  useEffect(() => {
    return smoothVelocity.on('change', (latest) => {
      let newState = 'hanging';
      if (latest > 100) newState = 'swinging';
      else if (latest > 20) newState = 'crawling';
      else if (latest < -50) newState = 'ascending';

      if (newState !== prevState.current) {
        if (newState === 'swinging' || newState === 'ascending') playWebFlick();
        if (newState === 'crawling') playCrawlTick();
        prevState.current = newState;
        setState(newState);
      }
    });
  }, [smoothVelocity, playWebFlick, playCrawlTick]);

  // Map scroll progress to X and Y positions
  // Spider-Man moves left and right across the screen as user scrolls down
  const xPath = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], 
    ['90vw', '10vw', '10vw', '80vw', '80vw', '10vw', '90vw']
  );

  const yPath = useTransform(scrollYProgress,
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
    ['5vh', '25vh', '45vh', '65vh', '80vh', '90vh', '95vh']
  );

  const rotation = useTransform(smoothVelocity, [-1000, 0, 1000], [-30, 0, 30]);

  const getSVGPaths = () => {
    if (state === 'crawling') return \`${crawlingSVG}\`;
    return \`${swingingSVG}\`;
  };

  return (
    <motion.div
      className="fixed z-[95] pointer-events-none flex flex-col items-center"
      style={{ x: xPath, y: yPath }}
    >
      {/* Web Line */}
      {(state === 'swinging' || state === 'ascending') && (
        <motion.div 
          className="absolute bottom-full mb-[-10px] w-0.5 bg-black/40 origin-bottom"
          style={{ height: '100vh', rotate: rotation }}
        />
      )}

      {/* Spider-Man Sprite */}
      <motion.div 
        className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center drop-shadow-[0_0_8px_rgba(226,54,54,0.4)]"
        style={{ rotate: rotation }}
        animate={
          state === 'crawling' ? { y: [0, 5, 0], transition: { repeat: Infinity, duration: 0.5 } } : {}
        }
      >
        <svg 
          viewBox="0 0 40 40" 
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
