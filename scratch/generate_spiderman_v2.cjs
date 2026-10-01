const fs = require('fs');

const colors = {
  'O': '#111111', // Black/Outline
  'R': '#E23636', // Red
  'B': '#285CC4', // Blue
  'W': '#FFFFFF', // White
  'L': '#111111', // Web Line
};

// We will use a 64x64 grid
function emptyGrid(w, h) {
    return Array.from({length: h}, () => ".".repeat(w).split(''));
}

// Helper to draw filled rect
function drawRect(grid, x, y, w, h, char) {
    for(let i=0; i<h; i++) {
        for(let j=0; j<w; j++) {
            if (y+i >= 0 && y+i < grid.length && x+j >= 0 && x+j < grid[0].length) {
                grid[y+i][x+j] = char;
            }
        }
    }
}

function drawLine(grid, x0, y0, x1, y1, char) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while(true) {
        if (y0 >= 0 && y0 < grid.length && x0 >= 0 && x0 < grid[0].length) {
            grid[y0][x0] = char;
        }
        if ((x0 === x1) && (y0 === y1)) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}

// Draw spider-man swinging
function createSwingingFrame() {
    let g = emptyGrid(64, 64);
    
    // Web line from top right
    drawLine(g, 63, 0, 42, 18, 'L');
    drawLine(g, 62, 0, 41, 18, 'L');

    // Right arm (reaching up to web)
    drawLine(g, 38, 22, 42, 18, 'O');
    drawLine(g, 40, 24, 44, 20, 'O');
    drawLine(g, 39, 22, 43, 19, 'R');
    drawLine(g, 40, 22, 43, 20, 'R');
    
    // Hand grabbing
    drawRect(g, 41, 17, 4, 4, 'O');
    drawRect(g, 42, 18, 2, 2, 'R');

    // Head (Large, angled)
    drawRect(g, 26, 16, 12, 14, 'O');
    drawRect(g, 27, 17, 10, 12, 'R');
    drawRect(g, 29, 16, 6, 14, 'R');
    drawRect(g, 25, 19, 14, 8, 'R');
    drawRect(g, 24, 20, 16, 6, 'O');
    drawRect(g, 25, 20, 14, 6, 'R');
    
    // Large white eyes (classic spidey style)
    // Left eye
    drawLine(g, 26, 21, 31, 19, 'O');
    drawLine(g, 26, 21, 31, 24, 'O');
    drawLine(g, 31, 19, 31, 24, 'O');
    drawRect(g, 28, 20, 3, 4, 'W');
    drawRect(g, 27, 21, 4, 2, 'W');
    // Right eye
    drawLine(g, 33, 19, 38, 21, 'O');
    drawLine(g, 33, 24, 38, 21, 'O');
    drawLine(g, 33, 19, 33, 24, 'O');
    drawRect(g, 34, 20, 3, 4, 'W');
    drawRect(g, 34, 21, 4, 2, 'W');

    // Torso Outline
    drawRect(g, 24, 28, 16, 18, 'O');
    
    // Torso Blue sides
    drawRect(g, 25, 29, 4, 16, 'B');
    drawRect(g, 35, 29, 4, 16, 'B');
    
    // Torso Red Center (Spider symbol area)
    drawRect(g, 29, 29, 6, 16, 'R');
    // Spider logo (black)
    drawRect(g, 31, 32, 2, 4, 'O');
    drawLine(g, 31, 33, 28, 31, 'O');
    drawLine(g, 32, 33, 35, 31, 'O');
    drawLine(g, 31, 34, 28, 36, 'O');
    drawLine(g, 32, 34, 35, 36, 'O');

    // Web lines on red torso
    drawLine(g, 32, 29, 32, 45, 'O');
    drawLine(g, 29, 38, 35, 38, 'O');
    drawLine(g, 29, 42, 35, 42, 'O');
    
    // Left arm (hanging down and back)
    drawLine(g, 24, 30, 16, 38, 'O');
    drawLine(g, 26, 32, 18, 40, 'O');
    drawLine(g, 23, 31, 17, 39, 'B');
    // Left hand/glove (Red)
    drawRect(g, 12, 38, 6, 6, 'O');
    drawRect(g, 13, 39, 4, 4, 'R');

    // Right leg (Knee brought up forward)
    // Thigh
    drawLine(g, 35, 44, 46, 38, 'O');
    drawLine(g, 35, 48, 48, 42, 'O');
    drawLine(g, 36, 45, 46, 40, 'B');
    // Calf (bent down)
    drawLine(g, 46, 38, 50, 50, 'O');
    drawLine(g, 48, 42, 53, 48, 'O');
    drawLine(g, 47, 40, 51, 49, 'B');
    // Boot (Red)
    drawRect(g, 48, 49, 8, 8, 'O');
    drawRect(g, 49, 50, 6, 6, 'R');
    drawLine(g, 49, 53, 55, 53, 'O'); // Web line on boot

    // Left leg (Extended down/back)
    drawLine(g, 26, 46, 22, 54, 'O');
    drawLine(g, 30, 46, 26, 56, 'O');
    drawLine(g, 27, 47, 24, 55, 'B');
    // Boot (Red)
    drawRect(g, 18, 54, 8, 8, 'O');
    drawRect(g, 19, 55, 6, 6, 'R');
    drawLine(g, 19, 58, 25, 58, 'O'); // Web line on boot

    return g.map(row => row.join(''));
}

// Draw spider-man crawling/clinging
function createCrawlingFrame() {
    let g = emptyGrid(64, 64);

    // He is clinging to a wall on the left (but we'll just draw the pose)
    // Head (Facing left/forward)
    drawRect(g, 18, 24, 14, 14, 'O');
    drawRect(g, 19, 25, 12, 12, 'R');
    // Eyes
    drawRect(g, 20, 28, 4, 6, 'W');
    drawLine(g, 19, 29, 24, 27, 'O');
    drawLine(g, 19, 33, 24, 35, 'O');

    drawRect(g, 26, 28, 4, 6, 'W');
    drawLine(g, 25, 27, 30, 29, 'O');
    drawLine(g, 25, 35, 30, 33, 'O');

    // Torso (Arched back)
    drawRect(g, 30, 28, 16, 12, 'O');
    drawRect(g, 31, 29, 14, 10, 'B');
    drawRect(g, 31, 31, 14, 6, 'R');

    // Left Arm (Reaching up to cling)
    drawLine(g, 28, 30, 20, 16, 'O');
    drawLine(g, 32, 30, 24, 16, 'O');
    drawLine(g, 29, 29, 22, 17, 'R');
    drawRect(g, 18, 12, 6, 6, 'O');
    drawRect(g, 19, 13, 4, 4, 'R');

    // Right Arm (Reaching down to cling)
    drawLine(g, 30, 36, 22, 50, 'O');
    drawLine(g, 34, 36, 26, 50, 'O');
    drawLine(g, 31, 37, 24, 49, 'R');
    drawRect(g, 20, 48, 6, 6, 'O');
    drawRect(g, 21, 49, 4, 4, 'R');

    // Left Leg (Bent out high)
    drawLine(g, 42, 30, 52, 20, 'O');
    drawLine(g, 44, 32, 54, 22, 'O');
    drawLine(g, 43, 31, 53, 21, 'B');
    drawRect(g, 50, 16, 8, 8, 'O');
    drawRect(g, 51, 17, 6, 6, 'R');

    // Right Leg (Bent out low)
    drawLine(g, 42, 38, 52, 48, 'O');
    drawLine(g, 44, 36, 54, 46, 'O');
    drawLine(g, 43, 37, 53, 47, 'B');
    drawRect(g, 50, 46, 8, 8, 'O');
    drawRect(g, 51, 47, 6, 6, 'R');

    return g.map(row => row.join(''));
}

// Draw spider-man ascending (climbing up a web)
function createAscendingFrame() {
    let g = emptyGrid(64, 64);
    
    // Web line going straight up
    drawLine(g, 32, 0, 32, 20, 'L');
    drawLine(g, 33, 0, 33, 20, 'L');

    // Hands grabbing web
    drawRect(g, 29, 18, 8, 6, 'O');
    drawRect(g, 30, 19, 6, 4, 'R');

    // Arms extending down to torso
    drawLine(g, 30, 22, 24, 32, 'O');
    drawLine(g, 34, 22, 28, 32, 'O');
    drawLine(g, 31, 23, 26, 31, 'R');

    drawLine(g, 35, 22, 41, 32, 'O');
    drawLine(g, 31, 22, 37, 32, 'O');
    drawLine(g, 34, 23, 39, 31, 'R');

    // Head (looking up)
    drawRect(g, 26, 26, 14, 14, 'O');
    drawRect(g, 27, 27, 12, 12, 'R');
    
    // Eyes pointing up
    drawRect(g, 28, 28, 4, 4, 'W');
    drawRect(g, 34, 28, 4, 4, 'W');

    // Torso
    drawRect(g, 24, 38, 18, 14, 'O');
    drawRect(g, 25, 39, 16, 12, 'B');
    drawRect(g, 29, 39, 8, 12, 'R');

    // Legs hanging/climbing
    drawLine(g, 26, 50, 20, 60, 'O');
    drawLine(g, 30, 50, 24, 60, 'O');
    drawLine(g, 27, 51, 22, 59, 'B');
    drawRect(g, 18, 58, 8, 8, 'O');
    drawRect(g, 19, 59, 6, 6, 'R');

    drawLine(g, 39, 50, 45, 60, 'O');
    drawLine(g, 35, 50, 41, 60, 'O');
    drawLine(g, 38, 51, 43, 59, 'B');
    drawRect(g, 41, 58, 8, 8, 'O');
    drawRect(g, 42, 59, 6, 6, 'R');

    return g.map(row => row.join(''));
}

const swingingFrame = createSwingingFrame();
const crawlingFrame = createCrawlingFrame();
const ascendingFrame = createAscendingFrame();

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
const ascendingSVG = generatePaths(ascendingFrame);

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

  // Movement paths
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
          className="absolute bottom-full mb-[-15px] w-[2px] bg-black/60 origin-bottom"
          style={{ height: '150vh', rotate: state === 'swinging' ? rotation : 0 }}
        />
      )}

      {/* Spider-Man Sprite */}
      <motion.div 
        className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        style={{ rotate: state === 'swinging' ? rotation : 0 }}
        animate={
          state === 'crawling' ? { y: [0, 4, 0], transition: { repeat: Infinity, duration: 0.6 } } 
          : state === 'ascending' ? { y: [0, -8, 0], transition: { repeat: Infinity, duration: 0.4 } }
          : { y: [0, 10, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }
        }
      >
        <svg 
          viewBox="0 0 64 64" 
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
