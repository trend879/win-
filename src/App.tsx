/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRIZES } from './data/prizes';
import { Prize, Language } from './types';
import { LuckyWheel } from './components/LuckyWheel';
import { WinModal } from './components/WinModal';
import { PrizeGallery } from './components/PrizeGallery';
import { RecentWinnersTicker } from './components/RecentWinnersTicker';
import { WinnersMapFeed } from './components/WinnersMapFeed';
import { sounds } from './utils/audio';
import { triggerGrandCelebration } from './utils/confetti';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Globe, 
  HelpCircle,
  Trophy,
  Zap,
  CheckCircle,
  Smartphone
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('bn'); // Default to Bengali as requested by user
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [spinsLeft, setSpinsLeft] = useState<number>(5);
  const [currentWin, setCurrentWin] = useState<Prize | null>(null);
  const [totalSpins, setTotalSpins] = useState<number>(0);
  const [winHistory, setWinHistory] = useState<Prize[]>([]);

  const handleToggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const handleToggleLang = () => {
    setLang(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleSpinEnd = (prize: Prize) => {
    setCurrentWin(prize);
    setSpinsLeft(prev => Math.max(0, prev - 1));
    setTotalSpins(prev => prev + 1);
    setWinHistory(prev => [prize, ...prev]);
  };

  const handleAddSpins = () => {
    setSpinsLeft(prev => prev + 3);
    triggerGrandCelebration();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo / Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <span>TechSpin</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                  REWARDS
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                {lang === 'bn' ? 'লাকি হুইল ও গ্যাজেট রিওয়ার্ডস' : 'Lucky Wheel & Gadget Rewards'}
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Spins Counter Badge */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-full px-3 py-1 text-xs">
              <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span className="font-semibold text-slate-300">
                {lang === 'bn' ? 'স্পিন বাকি:' : 'Spins:'}
              </span>
              <span className="font-extrabold text-amber-400 text-sm">{spinsLeft}</span>
              {spinsLeft === 0 && (
                <button
                  onClick={handleAddSpins}
                  className="ml-1 text-[10px] text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
                >
                  {lang === 'bn' ? '+রিফিল' : '+Refill'}
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={handleToggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Live Recent Winners Banner */}
      <RecentWinnersTicker lang={lang} />

      {/* Main Hero & Wheel Stage */}
      <main className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-4xl mx-auto px-4 pt-6 sm:pt-8 text-center">
          
          {/* Hero Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-amber-500/10 border border-slate-700/80 text-xs font-semibold text-blue-300 mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {lang === 'bn'
                ? 'আইফোন ১৮ প্রো ম্যাক্স • আইপ্যাড • এয়ারপডস প্রো'
                : 'iPhone 18 Pro Max • iPad Pro • AirPods Pro'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {lang === 'bn' ? (
              <>
                চাকা ঘোরান এবং জিতুন{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                  আইফোন ১৮ প্রো ম্যাক্স
                </span>
              </>
            ) : (
              <>
                Spin the Lucky Wheel to Win{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                  iPhone 18 Pro Max
                </span>
              </>
            )}
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            {lang === 'bn'
              ? 'চাকাটি ঘুরিয়ে জিতে নিন আধুনিক ফ্ল্যাগশিপ আইফোন, আইপ্যাড ও প্রিমিয়াম অডিও ডিভাইস। প্রতিটি স্পিনেই রয়েছে রোমাঞ্চকর পুরষ্কার!'
              : 'Interactive promotional lucky wheel simulator featuring next-gen tech gadgets, physics-based rotation, and celebratory victory animations.'}
          </p>

          {/* Interactive Wheel Component */}
          <div className="mt-4 sm:mt-6">
            <LuckyWheel
              prizes={PRIZES}
              onSpinEnd={handleSpinEnd}
              lang={lang}
              spinsLeft={spinsLeft}
            />
          </div>

          {/* Out of Spins Helper */}
          {spinsLeft === 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 max-w-md mx-auto flex items-center justify-between gap-3 text-left">
              <div>
                <p className="text-xs font-bold text-amber-300">
                  {lang === 'bn' ? 'আপনার স্পিন শেষ হয়েছে' : 'No Spins Remaining'}
                </p>
                <p className="text-[11px] text-amber-200/80">
                  {lang === 'bn' ? 'ফ্রি রিফিল বাটনে ক্লিক করে আরও ৩টি স্পিন নিন।' : 'Click to add 3 more free practice spins.'}
                </p>
              </div>
              <button
                onClick={handleAddSpins}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-xs text-slate-950 shadow-md cursor-pointer flex-shrink-0"
              >
                {lang === 'bn' ? 'রিফিল (+৩)' : 'Add +3 Spins'}
              </button>
            </div>
          )}

        </div>

        {/* User Session Win History (if any) */}
        {winHistory.length > 0 && (
          <div className="w-full max-w-4xl mx-auto px-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'bn' ? 'আপনার আজকের জয়সমূহ' : 'Your Spin Wins'} ({winHistory.length})</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'মোট স্পিন: ' : 'Total Spins: '} {totalSpins}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {winHistory.map((prize, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold text-slate-200">
                      {lang === 'bn' ? prize.nameBn : prize.name}
                    </span>
                    <span className="text-[10px] text-amber-300 font-mono">
                      {lang === 'bn' ? prize.valueBn : prize.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feature / How It Works Strip */}
        <section className="w-full max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <RotateCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'bn' ? '১. স্পিন করুন' : '1. Spin the Wheel'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn' ? 'মাঝের বাটনে চাপ দিয়ে চাকাটি ঘোরান।' : 'Click the central gold hub to spin the physics-based wheel.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'bn' ? '২. কনফেটি ও সেলিব্রেশন' : '2. Confetti Win'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn' ? 'চাকা থামলে আনন্দঘন কনফেটি ও ফ্যানফেয়ার শুরু হবে।' : 'Experience celebratory animations with falling confetti and sound effects.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'bn' ? '৩. ভাউচার সংগ্রহ' : '3. Save Voucher'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn' ? 'আপনার ডেমো কোডটি সংরক্ষণ করুন বা বন্ধুদের সাথে শেয়ার করুন।' : 'Generate your simulated digital reward voucher code.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Dynamic Winners Map & Activity Feed */}
        <WinnersMapFeed prizes={PRIZES} lang={lang} />

        {/* Prize Showcase Gallery */}
        <PrizeGallery prizes={PRIZES} lang={lang} />

      </main>

      {/* Celebratory Victory Modal */}
      <WinModal
        prize={currentWin}
        onClose={() => setCurrentWin(null)}
        lang={lang}
        onSpinAgain={() => {
          if (spinsLeft === 0) setSpinsLeft(3);
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>TechSpin Rewards Simulator</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-lg">
            {lang === 'bn'
              ? 'এটি একটি বিনোদনমূলক লাকি হুইল ডেমো এবং গ্যাজেট শোকেস সিমুলেটর। কোনো বাধ্যতামূলক অর্থ প্রদান বা বিভ্রান্তিকর শেয়ার শর্ত ছাড়া স্বচ্ছভাবে পরিচালিত।'
              : 'This is an interactive promotional and gadget simulator for showcase and entertainment purposes. Features fair, transparent game mechanics.'}
          </p>
          <p className="text-[10px] text-slate-600 mt-1">
            © {new Date().getFullYear()} TechSpin Rewards. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
