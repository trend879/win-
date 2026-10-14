import confetti from 'canvas-confetti';

/**
 * High-energy multi-cannon celebration effect with fireworks and stars
 */
export function triggerGrandCelebration() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // 1. Initial explosive bursts
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ffffff', '#fbbf24', '#f43f5e', '#60a5fa'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  // 2. Lateral cannon bursts from both bottom corners
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#3b82f6', '#ec4899', '#fbbf24', '#ffffff'],
      zIndex: 9999,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#10b981', '#8b5cf6', '#f59e0b', '#ffffff'],
      zIndex: 9999,
    });
  }, 250);

  // 3. Falling gold stars cascade
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.3 },
      shapes: ['star', 'circle'],
      colors: ['#fbbf24', '#f59e0b', '#fef08a'],
      scalar: 1.3,
      zIndex: 9999,
    });
  }, 600);
}

/**
 * Continuous celebration rain for when the modal is open
 */
export function triggerContinuousRain(durationMs = 2500) {
  const animationEnd = Date.now() + durationMs;
  const colors = ['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#a855f7'];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
}
