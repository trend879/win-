export interface Prize {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  categoryBn: string;
  color: string;
  textColor: string;
  iconName: string;
  tagline: string;
  taglineBn: string;
  value: string;
  valueBn: string;
  description: string;
  descriptionBn: string;
  specs: string[];
  specsBn: string[];
  imageGradient: string;
  badge?: string;
  probabilityWeight: number; // for realistic selection
}

export interface WinRecord {
  id: string;
  prizeId: string;
  prizeName: string;
  timestamp: number;
  voucherCode: string;
  claimed: boolean;
}

export type Language = 'en' | 'bn';
