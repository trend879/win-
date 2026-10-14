import React from 'react';
import { Language } from '../types';
import { Gift, Zap } from 'lucide-react';

interface RecentWinnersTickerProps {
  lang: Language;
}

const WINNERS = [
  { name: 'Sabbir H.', prize: 'iPhone 18 Pro Max', time: '2m ago', prizeBn: 'আইফোন ১৮ প্রো ম্যাক্স' },
  { name: 'Tanvir A.', prize: 'AirPods Pro 2', time: '4m ago', prizeBn: 'এয়ারপডস প্রো ২' },
  { name: 'Nusrat J.', prize: 'iPad Pro 13"', time: '7m ago', prizeBn: 'আইপ্যাড প্রো ১৩"' },
  { name: 'Rahim K.', prize: 'Smart Watch Ultra', time: '11m ago', prizeBn: 'স্মার্ট ওয়াচ আল্ট্রা' },
  { name: 'Farhana M.', prize: 'iPhone 18 Pro Max', time: '15m ago', prizeBn: 'আইফোন ১৮ প্রো ম্যাক্স' },
  { name: 'Arif B.', prize: '$100 Gift Voucher', time: '18m ago', prizeBn: '১০০ ডলার গিফট ভাউচার' },
];

export const RecentWinnersTicker: React.FC<RecentWinnersTickerProps> = ({ lang }) => {
  return (
    <div className="w-full bg-slate-900/60 border-y border-slate-800/80 py-2.5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider flex-shrink-0 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{lang === 'bn' ? 'সাম্প্রতিক বিজয়ী' : 'Live Winners'}</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs text-slate-300">
          {WINNERS.map((winner, idx) => (
            <div key={idx} className="flex items-center gap-1.5 flex-shrink-0">
              <Gift className="w-3 h-3 text-blue-400" />
              <span className="font-semibold text-slate-200">{winner.name}</span>
              <span className="text-slate-500">{lang === 'bn' ? 'জিতেছেন' : 'won'}</span>
              <span className="font-bold text-amber-300">
                {lang === 'bn' ? winner.prizeBn : winner.prize}
              </span>
              <span className="text-[10px] text-slate-500">({winner.time})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
