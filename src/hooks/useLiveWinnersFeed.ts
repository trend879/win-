import { useState, useEffect } from 'react';
import { Prize, Language } from '../types';

export interface WinnerEvent {
  id: string;
  name: string;
  city: string;
  cityBn: string;
  prizeName: string;
  prizeNameBn: string;
  prizeIcon: string;
  prizeValue: string;
  timestamp: string;
  timestampBn: string;
  avatarColor: string;
  isNew?: boolean;
}

const SAMPLE_NAMES = [
  'Tanvir Ahmed', 'Farhana Yasmin', 'Sabbir Hossain', 'Ayesha Siddika', 
  'Naimur Rahman', 'Sadia Islam', 'Zubair Khan', 'Mehedi Hasan',
  'Tasnim Akter', 'Rayhan Chowdhury', 'Anika Tabassum', 'Shakib Al Hasan',
  'Nahid Parvez', 'Fariha Jannat', 'Mahmudul Karim', 'Sumaiya Zaman'
];

const SAMPLE_CITIES = [
  { en: 'Dhaka', bn: 'ঢাকা' },
  { en: 'Chittagong', bn: 'চট্টগ্রাম' },
  { en: 'Sylhet', bn: 'সিলেট' },
  { en: 'Rajshahi', bn: 'রাজশাহী' },
  { en: 'Khulna', bn: 'খুলনা' },
  { en: 'Barisal', bn: 'বরিশাল' },
  { en: 'Comilla', bn: 'কুমিল্লা' },
  { en: 'Mymensingh', bn: 'ময়মনসিংহ' },
  { en: 'Bogra', bn: 'বগুড়া' },
  { en: 'Gazipur', bn: 'গাজীপুর' },
];

const AVATAR_COLORS = [
  'from-blue-600 to-indigo-600',
  'from-emerald-600 to-teal-600',
  'from-purple-600 to-pink-600',
  'from-amber-600 to-orange-600',
  'from-rose-600 to-red-600',
  'from-cyan-600 to-blue-600',
];

export function useLiveWinnersFeed(prizes: Prize[], maxItems = 7) {
  const [feed, setFeed] = useState<WinnerEvent[]>(() => {
    // Initial batch
    return [
      {
        id: 'w-1',
        name: 'Tanvir Ahmed',
        city: 'Dhaka',
        cityBn: 'ঢাকা',
        prizeName: 'iPhone 18 Pro Max',
        prizeNameBn: 'আইফোন ১৮ প্রো ম্যাক্স',
        prizeIcon: 'Smartphone',
        prizeValue: '$1,399',
        timestamp: 'Just now',
        timestampBn: 'এইমাত্র',
        avatarColor: 'from-blue-600 to-indigo-600',
      },
      {
        id: 'w-2',
        name: 'Farhana Yasmin',
        city: 'Chittagong',
        cityBn: 'চট্টগ্রাম',
        prizeName: 'AirPods Pro 2',
        prizeNameBn: 'এয়ারপডস প্রো ২',
        prizeIcon: 'Headphones',
        prizeValue: '$249',
        timestamp: '12s ago',
        timestampBn: '১২ সে. আগে',
        avatarColor: 'from-purple-600 to-pink-600',
      },
      {
        id: 'w-3',
        name: 'Sabbir Hossain',
        city: 'Sylhet',
        cityBn: 'সিলেট',
        prizeName: 'iPad Pro 13"',
        prizeNameBn: 'আইপ্যাড প্রো ১৩"',
        prizeIcon: 'Tablet',
        prizeValue: '$1,199',
        timestamp: '34s ago',
        timestampBn: '৩৪ সে. আগে',
        avatarColor: 'from-emerald-600 to-teal-600',
      },
      {
        id: 'w-4',
        name: 'Sadia Islam',
        city: 'Rajshahi',
        cityBn: 'রাজশাহী',
        prizeName: 'Smart Watch Ultra',
        prizeNameBn: 'স্মার্ট ওয়াচ আল্ট্রা',
        prizeIcon: 'Watch',
        prizeValue: '$799',
        timestamp: '1m ago',
        timestampBn: '১ মিনিট আগে',
        avatarColor: 'from-amber-600 to-orange-600',
      },
    ];
  });

  const [totalSimulatedToday, setTotalSimulatedToday] = useState(1480);

  useEffect(() => {
    if (!prizes || prizes.length === 0) return;

    const interval = setInterval(() => {
      // Pick random prize, name, city
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      const randomName = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
      const randomCity = SAMPLE_CITIES[Math.floor(Math.random() * SAMPLE_CITIES.length)];
      const randomAvatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

      const newWinner: WinnerEvent = {
        id: `w-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: randomName,
        city: randomCity.en,
        cityBn: randomCity.bn,
        prizeName: randomPrize.name,
        prizeNameBn: randomPrize.nameBn,
        prizeIcon: randomPrize.iconName,
        prizeValue: randomPrize.value,
        timestamp: 'Just now',
        timestampBn: 'এইমাত্র',
        avatarColor: randomAvatarColor,
        isNew: true,
      };

      setFeed(prev => [newWinner, ...prev.slice(0, maxItems - 1)]);
      setTotalSimulatedToday(prev => prev + 1);

      // Clean the "isNew" flag after 1.5s
      setTimeout(() => {
        setFeed(prevFeed =>
          prevFeed.map(item =>
            item.id === newWinner.id ? { ...item, isNew: false } : item
          )
        );
      }, 1500);

    }, 4500); // Trigger every 4.5 seconds

    return () => clearInterval(interval);
  }, [prizes, maxItems]);

  return { feed, totalSimulatedToday };
}
