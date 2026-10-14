import React, { useState, useRef, useEffect } from 'react';
import { Prize, Language } from '../types';
import { sounds } from '../utils/audio';
import { triggerGrandCelebration, triggerContinuousRain } from '../utils/confetti';
import { Smartphone, Headphones, Tablet, Watch, Gift, BatteryCharging, Sparkles } from 'lucide-react';

interface LuckyWheelProps {
  prizes: Prize[];
  onSpinEnd: (prize: Prize) => void;
  lang: Language;
  spinsLeft: number;
}

export const LuckyWheel: React.FC<LuckyWheelProps> = ({
  prizes,
  onSpinEnd,
  lang,
  spinsLeft,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [pointerBounce, setPointerBounce] = useState<boolean>(false);
  const currentRotationRef = useRef<number>(0);
  const tickIntervalRef = useRef<number | null>(null);

  const numSegments = prizes.length;
  const segmentAngle = 360 / numSegments;

  // Icon mapping
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Tablet':
        return <Tablet className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Watch':
        return <Watch className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Gift':
        return <Gift className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-6 h-6 sm:w-7 sm:h-7" />;
      default:
        return <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />;
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;

    sounds.playSpinStart();
    setIsSpinning(true);

    // Pick a winning segment with weighted probability favoring high-value gadgets
    const targetIndex = Math.floor(Math.random() * prizes.length);
    const targetPrize = prizes[targetIndex];

    // Minimum 5 full spins (1800 deg) + offset to align target prize with top pointer (270 deg or 0 deg depending on orientation)
    // The pointer is positioned at top (0 degrees / 12 o'clock).
    // Segment i starts at i * segmentAngle and centers at i * segmentAngle + segmentAngle / 2.
    // When wheel rotates R degrees, item at angle theta arrives at top (0 deg) when (R + theta) % 360 === 0.
    const segmentCenter = targetIndex * segmentAngle + segmentAngle / 2;
    const targetAngle = 360 - segmentCenter;

    // Full rotations + target angle adjustment
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const newRotation = currentRotationRef.current + (extraRounds * 360) + targetAngle - (currentRotationRef.current % 360);
    
    currentRotationRef.current = newRotation;
    setRotation(newRotation);

    // Dynamic ticking sound effect that slows down as wheel decelerates
    let tickCount = 0;
    const totalTicks = extraRounds * numSegments;
    const spinDuration = 5500; // 5.5 seconds
    const startTime = Date.now();

    const runTicks = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      sounds.playTick();
      setPointerBounce(true);
      setTimeout(() => setPointerBounce(false), 50);

      tickCount++;
      if (progress < 1) {
        // Deceleration formula for ticking intervals
        const nextDelay = 40 + Math.pow(progress, 3) * 400;
        tickIntervalRef.current = window.setTimeout(runTicks, nextDelay);
      }
    };

    runTicks();

    // Wheel completes spin
    setTimeout(() => {
      setIsSpinning(false);
      if (tickIntervalRef.current) clearTimeout(tickIntervalRef.current);
      
      // Trigger celebratory animations!
      sounds.playVictoryFanfare();
      triggerGrandCelebration();
      triggerContinuousRain(2000);

      onSpinEnd(targetPrize);
    }, spinDuration + 100);
  };

  useEffect(() => {
    return () => {
      if (tickIntervalRef.current) clearTimeout(tickIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-full blur-2xl opacity-75 animate-pulse pointer-events-none" />

      {/* Decorative Outer Ring with LED Bulbs */}
      <div className="relative p-3.5 sm:p-5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-md">
        
        {/* Pointer / Ticker at 12 o'clock */}
        <div 
          className={`absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-30 transition-transform duration-75 origin-top drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] ${
            pointerBounce ? '-rotate-12 scale-110' : 'rotate-0'
          }`}
        >
          <div className="relative flex flex-col items-center">
            {/* Pointer Triangle */}
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-amber-400 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            <div className="absolute -top-1 w-4 h-4 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-md border border-amber-200" />
          </div>
        </div>

        {/* LED Bulbs Around the Perimeter */}
        <div className="absolute inset-0 rounded-full pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_#fbbf24]"
                style={{
                  top: `${50 - 48.5 * Math.cos((angle * Math.PI) / 180)}%`,
                  left: `${50 + 48.5 * Math.sin((angle * Math.PI) / 180)}%`,
                  backgroundColor: i % 2 === 0 ? '#fbbf24' : '#60a5fa',
                  boxShadow: i % 2 === 0 ? '0 0 8px #fbbf24' : '0 0 8px #60a5fa',
                }}
              />
            );
          })}
        </div>

        {/* Spinning Wheel Container with CSS Transform */}
        <div 
          className="relative w-[310px] h-[310px] sm:w-[420px] sm:h-[420px] rounded-full overflow-hidden shadow-inner border-4 border-slate-800"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? 'transform 5.5s cubic-bezier(0.12, 0.8, 0.32, 1.0)'
              : 'none',
          }}
        >
          {/* SVG Pie Slices */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              {prizes.map((p, idx) => (
                <linearGradient key={`grad-${idx}`} id={`slice-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={p.color} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={p.color} stopOpacity="0.75" />
                </linearGradient>
              ))}
            </defs>
            {prizes.map((prize, idx) => {
              const startAngle = idx * segmentAngle - 90;
              const endAngle = (idx + 1) * segmentAngle - 90;

              const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);

              const largeArcFlag = segmentAngle > 180 ? 1 : 0;
              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

              return (
                <path
                  key={prize.id}
                  d={pathData}
                  fill={`url(#slice-grad-${idx})`}
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
              );
            })}
          </svg>

          {/* Segment Content (Icons & Labels) */}
          {prizes.map((prize, idx) => {
            const sliceCenterAngle = idx * segmentAngle + segmentAngle / 2;
            return (
              <div
                key={`content-${prize.id}`}
                className="absolute inset-0 flex items-start justify-center pointer-events-none"
                style={{
                  transform: `rotate(${sliceCenterAngle}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <div className="flex flex-col items-center pt-3 sm:pt-5 text-white max-w-[90px] sm:max-w-[120px] text-center">
                  <div className="p-1 sm:p-1.5 rounded-lg bg-black/30 backdrop-blur-sm shadow-md mb-1 text-white">
                    {renderIcon(prize.iconName)}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold leading-tight tracking-tight drop-shadow-md text-slate-100">
                    {lang === 'bn' ? prize.nameBn : prize.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-amber-300 drop-shadow">
                    {lang === 'bn' ? prize.valueBn : prize.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Spin Hub & Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={handleSpin}
            disabled={isSpinning || spinsLeft <= 0}
            className={`group relative flex flex-col items-center justify-center w-20 h-20 sm:w-26 sm:h-26 rounded-full font-black text-white shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50 ${
              isSpinning
                ? 'bg-slate-800 cursor-not-allowed scale-95 opacity-90'
                : 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.6)] cursor-pointer'
            }`}
          >
            {/* Spinning pulse effect */}
            {!isSpinning && (
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 opacity-60 blur-sm animate-ping pointer-events-none" />
            )}
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="text-xs sm:text-sm tracking-wider font-extrabold uppercase drop-shadow">
                {isSpinning ? (lang === 'bn' ? 'ঘুরছে...' : 'SPINNING') : (lang === 'bn' ? 'স্পিন' : 'SPIN')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium text-amber-100 opacity-90">
                {isSpinning ? '...' : (lang === 'bn' ? 'ক্লিক করুন' : 'PRESS')}
              </span>
            </div>
          </button>
        </div>

      </div>

      {/* Wheel Control Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleSpin}
          disabled={isSpinning || spinsLeft <= 0}
          className={`px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl transition-all duration-200 ${
            isSpinning || spinsLeft <= 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5'
          }`}
        >
          <Sparkles className="w-5 h-5 text-yellow-200" />
          <span>
            {isSpinning
              ? (lang === 'bn' ? 'চাকাটি ঘুরছে...' : 'Wheel is Spinning...')
              : (lang === 'bn' ? 'এখনই স্পিন করুন' : 'Spin the Lucky Wheel')}
          </span>
        </button>
      </div>
    </div>
  );
};
