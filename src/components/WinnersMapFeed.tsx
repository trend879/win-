import React, { useState } from 'react';
import { Prize, Language } from '../types';
import { useLiveWinnersFeed, WinnerEvent } from '../hooks/useLiveWinnersFeed';
import { 
  Radio, 
  MapPin, 
  Sparkles, 
  Smartphone, 
  Headphones, 
  Tablet, 
  Watch, 
  Gift, 
  BatteryCharging, 
  Activity,
  Flame
} from 'lucide-react';

interface WinnersMapFeedProps {
  prizes: Prize[];
  lang: Language;
}

// Regional map nodes with percentages for visual geographic radar
const MAP_HOTSPOTS = [
  { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা', top: '48%', left: '52%', wins: 642 },
  { id: 'ctg', name: 'Chittagong', nameBn: 'চট্টগ্রাম', top: '72%', left: '76%', wins: 388 },
  { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট', top: '32%', left: '78%', wins: 215 },
  { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী', top: '38%', left: '26%', wins: 194 },
  { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা', top: '68%', left: '35%', wins: 147 },
];

export const WinnersMapFeed: React.FC<WinnersMapFeedProps> = ({ prizes, lang }) => {
  const { feed, totalSimulatedToday } = useLiveWinnersFeed(prizes, 6);
  const [activeTab, setActiveTab] = useState<'feed' | 'map'>('feed');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const renderIcon = (iconName: string) => {
    const cls = "w-4 h-4";
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className={`${cls} text-blue-400`} />;
      case 'Headphones':
        return <Headphones className={`${cls} text-purple-400`} />;
      case 'Tablet':
        return <Tablet className={`${cls} text-pink-400`} />;
      case 'Watch':
        return <Watch className={`${cls} text-cyan-400`} />;
      case 'Gift':
        return <Gift className={`${cls} text-amber-400`} />;
      default:
        return <BatteryCharging className={`${cls} text-emerald-400`} />;
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Container Card */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Header Strip with Live Pulse & Tab Switcher */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {lang === 'bn' ? 'লাইভ বিজয়ী অ্যাক্টিভিটি ফিড' : 'Live Winners Activity Feed'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 animate-pulse" />
                  <span>{lang === 'bn' ? 'সরাসরি আপডেট' : 'LIVE'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn'
                  ? `আজ মোট ${totalSimulatedToday.toLocaleString()}টি স্পিনে পুরস্কার জয়ী হয়েছে (স্বয়ংক্রিয় আপডেট)`
                  : `Over ${totalSimulatedToday.toLocaleString()} gadget prizes recorded today • Updates every few seconds`}
              </p>
            </div>
          </div>

          {/* Feed / Map View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'feed'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'রিসেন্ট ফিড' : 'Live Feed'}
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'map'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'উইনার্স ম্যাপ' : 'Winners Map'}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'feed' ? (
          /* Dynamic Activity Stream */
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {feed.map((winner) => (
                <div
                  key={winner.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-500 flex items-center gap-3 ${
                    winner.isNew
                      ? 'bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-800/80 border-blue-400/80 scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700/80'
                  }`}
                >
                  {/* User Initial Avatar */}
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${winner.avatarColor} flex items-center justify-center font-bold text-white text-sm shadow-md flex-shrink-0`}
                  >
                    {winner.name.charAt(0)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-200 truncate">
                        {winner.name}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        {lang === 'bn' ? winner.timestampBn : winner.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span>{lang === 'bn' ? winner.cityBn : winner.city}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      {renderIcon(winner.prizeIcon)}
                      <span className="truncate">
                        {lang === 'bn' ? winner.prizeNameBn : winner.prizeName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Feed Note */}
            <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  {lang === 'bn'
                    ? 'সর্বাধিক জনপ্রিয় পুরস্কার: আইফোন ১৮ প্রো ম্যাক্স ও এয়ারপডস প্রো'
                    : 'Trending prizes: iPhone 18 Pro Max & AirPods Pro 2'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                {lang === 'bn' ? 'স্বয়ংক্রিয় রিয়েল-টাইম সিমুলেশন' : 'Real-time dynamic feed simulator'}
              </span>
            </div>
          </div>
        ) : (
          /* Interactive Geographic Radar & Winners Map */
          <div className="p-5 sm:p-6 flex flex-col items-center">
            <div className="relative w-full max-w-2xl h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
              
              {/* Radar Grid Graphic Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-blue-500/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/20 rounded-full" />
              </div>

              {/* Geographic Hotspot Nodes */}
              {MAP_HOTSPOTS.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  className="absolute cursor-pointer group"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-500/40 opacity-75" />
                    <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white shadow-lg border-2 border-slate-950 group-hover:scale-125 transition-transform">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Popover label */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-slate-700 px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-xl whitespace-nowrap opacity-90 group-hover:opacity-100">
                    <span>{lang === 'bn' ? spot.nameBn : spot.name}</span>
                    <span className="text-amber-400 ml-1.5">{spot.wins} {lang === 'bn' ? 'জয়ী' : 'wins'}</span>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                {lang === 'bn'
                  ? 'ম্যাপ পিনগুলোতে ক্লিক করে রিজিওনাল বিজয়ীদের সংখ্যা দেখুন'
                  : 'Interactive geographic distribution of simulated prize claims'}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
