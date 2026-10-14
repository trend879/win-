import React, { useState, useEffect } from 'react';
import { Prize, Language } from '../types';
import { triggerGrandCelebration } from '../utils/confetti';
import { 
  Trophy, 
  X, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Sparkles, 
  Smartphone, 
  Headphones, 
  Tablet, 
  Watch, 
  Gift, 
  BatteryCharging,
  ArrowRight
} from 'lucide-react';

interface WinModalProps {
  prize: Prize | null;
  onClose: () => void;
  lang: Language;
  onSpinAgain: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  prize,
  onClose,
  lang,
  onSpinAgain,
}) => {
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);

  useEffect(() => {
    if (prize) {
      // Generate randomized voucher code
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const code = `WIN-${prize.id.substring(0, 4).toUpperCase()}-${randomSuffix}`;
      setVoucherCode(code);
      setIsClaimed(false);
      setCopied(false);
      setShared(false);
    }
  }, [prize]);

  if (!prize) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'TechSpin Rewards - Lucky Wheel',
      text: `🎉 I just won ${prize.name} on the TechSpin Lucky Wheel! Check out this interactive gadget simulator:`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(
        `🎉 I just won ${prize.name} on the TechSpin Lucky Wheel! Check it out: ${window.location.href}`
      );
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }
  };

  const renderIcon = (iconName: string) => {
    const iconClass = "w-12 h-12 text-amber-400";
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className={iconClass} />;
      case 'Headphones':
        return <Headphones className={iconClass} />;
      case 'Tablet':
        return <Tablet className={iconClass} />;
      case 'Watch':
        return <Watch className={iconClass} />;
      case 'Gift':
        return <Gift className={iconClass} />;
      default:
        return <BatteryCharging className={iconClass} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* Glow Backdrop */}
      <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.35)] overflow-hidden text-slate-100 flex flex-col">
        
        {/* Top Header Banner with Confetti Trigger */}
        <div className="relative px-6 pt-7 pb-6 bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border-b border-slate-800 flex flex-col items-center text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Celebratory Trophy Badge */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-[0_0_25px_rgba(245,158,11,0.5)] mb-3">
            <Trophy className="w-8 h-8 text-slate-950" />
            <button 
              onClick={() => triggerGrandCelebration()}
              title="More Confetti!"
              className="absolute -bottom-1 -right-1 p-1 bg-purple-600 hover:bg-purple-500 rounded-full text-white shadow-md text-[10px] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
            {lang === 'bn' ? '🎉 অভিনন্দন!' : '🎉 CONGRATULATIONS!'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'আপনি জিতেছেন' : 'You Won'} {lang === 'bn' ? prize.nameBn : prize.name}!
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {lang === 'bn' ? prize.taglineBn : prize.tagline}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[65vh]">
          
          {/* Prize Showcase Card */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center border border-slate-600 shadow-inner">
              {renderIcon(prize.iconName)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase text-blue-400">
                  {lang === 'bn' ? prize.categoryBn : prize.category}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {lang === 'bn' ? prize.valueBn : prize.value}
                </span>
              </div>
              <h4 className="text-base font-bold text-white truncate">
                {lang === 'bn' ? prize.nameBn : prize.name}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                {lang === 'bn' ? prize.descriptionBn : prize.description}
              </p>
            </div>
          </div>

          {/* Key Specifications Pill List */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'bn' ? 'ফিচারসমূহ' : 'Key Specifications'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(lang === 'bn' ? prize.specsBn : prize.specs).map((spec, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Voucher Code Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-300">
                {lang === 'bn' ? 'ডিজিটাল ভাউচার কোড' : 'Digital Voucher Code'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'bn' ? 'ডেমো কোড' : 'Demo Code'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider text-center select-all">
                {voucherCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-600 transition-colors"
                title="Copy code"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Claim Status & Simulated Confirmation */}
          {isClaimed ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold">{lang === 'bn' ? 'ভাউচার সংরক্ষিত হয়েছে!' : 'Voucher Saved Successfully!'}</p>
                <p className="text-[11px] text-emerald-400/80">
                  {lang === 'bn'
                    ? 'আপনার ডেমো ভাউচার রেজিস্টার করা হয়েছে। আপনি পুনরায় স্পিন করতে পারেন।'
                    : 'Your simulation record has been saved to your session.'}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsClaimed(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-sm text-white shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ভাউচার কনফার্ম করুন' : 'Confirm & Save Voucher'}</span>
            </button>
          )}

          {/* Social Share (Voluntary) Button */}
          <div className="pt-1">
            <button
              onClick={handleShare}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>
                {shared
                  ? (lang === 'bn' ? 'লিংক শেয়ার করা হয়েছে!' : 'Link shared / copied!')
                  : (lang === 'bn' ? 'বন্ধুদের সাথে শেয়ার করুন (ঐচ্ছিক)' : 'Share with Friends (Optional)')}
              </span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
          <button
            onClick={() => {
              onClose();
              onSpinAgain();
            }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <span>{lang === 'bn' ? 'আবার স্পিন করুন' : 'Spin Again'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
