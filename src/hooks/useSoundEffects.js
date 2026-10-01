import { useState, useEffect, useCallback, useRef } from 'react';

let audioCtx = null;
let ambientOscillator = null;
let ambientGain = null;

// Initialize context safely on interaction
const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(true); // Default muted to respect browser policy
  const isInitialized = useRef(false);

  useEffect(() => {
    // Check local storage for preference
    const saved = localStorage.getItem('arcade_sound_muted');
    if (saved !== null) {
      setIsMuted(saved === 'true');
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem('arcade_sound_muted', String(next));
      if (next && ambientOscillator) {
        stopAmbient();
      } else if (!next) {
        initAudio();
        startAmbient();
      }
      return next;
    });
  }, []);

  // Shared synth trigger
  const playSynth = useCallback((type, freq, duration, vol, glideTo = null) => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(freq, now);
    if (glideTo) {
      osc.frequency.exponentialRampToValueAtTime(glideTo, now + duration);
    }

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }, [isMuted]);

  const playClick = useCallback(() => {
    playSynth('square', 400, 0.1, 0.1, 200); // crisp click dropping in pitch
  }, [playSynth]);

  const playHover = useCallback(() => {
    playSynth('triangle', 800, 0.05, 0.05); // tiny soft blip
  }, [playSynth]);

  const playScroll = useCallback(() => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx) return;
    // noise burst for scroll tick
    const bufferSize = ctx.sampleRate * 0.02; // 20ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Lowpass to make it a dull "tick"
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  }, [isMuted]);

  const startAmbient = useCallback(() => {
    if (isMuted || ambientOscillator) return;
    const ctx = initAudio();
    if (!ctx) return;

    ambientOscillator = ctx.createOscillator();
    ambientGain = ctx.createGain();

    // Low rumble arcade hum
    ambientOscillator.type = 'sine';
    ambientOscillator.frequency.value = 55; // Low hum

    ambientGain.gain.setValueAtTime(0, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2); // Fade in slowly

    ambientOscillator.connect(ambientGain);
    ambientGain.connect(ctx.destination);
    ambientOscillator.start();
  }, [isMuted]);

  const stopAmbient = useCallback(() => {
    if (ambientGain && audioCtx) {
      ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
      setTimeout(() => {
        if (ambientOscillator) {
          ambientOscillator.stop();
          ambientOscillator.disconnect();
          ambientOscillator = null;
        }
      }, 1000);
    }
  }, []);

  const playWebFlick = useCallback(() => {
    // Quick ascending high pitched 'thwip'
    playSynth('sawtooth', 800, 0.1, 0.03, 2000);
  }, [playSynth]);

  const playCrawlTick = useCallback(() => {
    // Short muted tick
    playSynth('square', 150, 0.05, 0.02, 100);
  }, [playSynth]);

  // Handle global interaction to start ambient if not muted
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isInitialized.current) {
        isInitialized.current = true;
        if (!isMuted) {
          startAmbient();
        }
      }
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    
    return () => {
      stopAmbient(); // Cleanup on unmount if used globally
    };
  }, [isMuted, startAmbient, stopAmbient]);

  return {
    isMuted,
    toggleMute,
    playClick,
    playHover,
    playScroll,
    playWebFlick,
    playCrawlTick
  };
}
