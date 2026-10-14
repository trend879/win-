import React from 'react';
import { Prize, Language } from '../types';
import { Smartphone, Headphones, Tablet, Watch, Gift, BatteryCharging, Sparkles, ShieldCheck } from 'lucide-react';

interface PrizeGalleryProps {
  prizes: Prize[];
  lang: Language;
}

export const PrizeGallery: React.FC<PrizeGalleryProps> = ({ prizes, lang }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-blue-400" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-purple-400" />;
      case 'Tablet':
        return <Tablet className="w-6 h-6 text-pink-400" />;
      case 'Watch':
        return <Watch className="w-6 h-6 text-cyan-400" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-amber-400" />;
      default:
        return <BatteryCharging className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'পুরস্কার ক্যাটালগ' : 'Wheel Rewards Catalog'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {lang === 'bn' ? 'হালনাগাদ গ্যাজেট ও অফারসমূহ' : 'Available Prize Tier Showcase'}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mt-1">
          {lang === 'bn'
            ? 'চাকাটিতে রয়েছে আইফোন ১৮ প্রো ম্যাক্স, আইপ্যাড প্রো, এয়ারপডস প্রো এবং অন্যান্য আকর্ষণীয় গ্যাজেট।'
            : 'Spin to win authentic premium items including the iPhone 18 Pro Max, iPad Pro, AirPods Pro, and smart wearables.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {prizes.map((prize) => (
          <div
            key={prize.id}
            className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,41,59,0.5)] flex flex-col justify-between"
          >
            {/* Top Row with Badge & Value */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  {renderIcon(prize.iconName)}
                </div>
                {prize.badge ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {prize.badge}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-400">
                    {lang === 'bn' ? prize.valueBn : prize.value}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {lang === 'bn' ? prize.categoryBn : prize.category}
              </span>
              <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {lang === 'bn' ? prize.nameBn : prize.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {lang === 'bn' ? prize.descriptionBn : prize.description}
              </p>

              {/* Specs Chips */}
              <div className="mt-3.5 space-y-1.5">
                {(lang === 'bn' ? prize.specsBn : prize.specs).slice(0, 3).map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400/80 flex-shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Value & Indicator */}
            <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                {lang === 'bn' ? 'আনুমানিক মূল্য:' : 'Approx. Value:'}
              </span>
              <span className="font-extrabold text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                {lang === 'bn' ? prize.valueBn : prize.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
