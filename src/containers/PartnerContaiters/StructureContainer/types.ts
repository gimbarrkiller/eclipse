export type StructureType = {
  id: number,
  referral: string,
  avatar: string,
  trial: boolean,
  numberActiveLicenses: number,
  numberLicensesSold: number,
  email: string,
  personalSales: number,
  refSales: number,
  reward: number,
  rewards: number,
  rank: string,
  turnover: number,
  poolBonus: boolean,
  level: number,
};

export interface ReferralType {
  id: number;
  level: number;
  parent_id: number;
  avatar: string | null;
  first_name?: string | null;
  last_name?: string | null;
  country: string | null;
  count_licenses_sold: number;
  last_login: Date | null;
  count_active_licenses: number;
  email: string;
  active: boolean;
  trial: boolean;
  total_sales: number;
  rank: string;
  personal_sales: number;
  referral_sales: number;
  rewards: number;
  joined_at: string;
  purchase_time: Date | null;
  referral?: string;
}

export interface ReferralGroup {
  referrals: ReferralType[];
  count: number;
  licenses: number;
  direct_licenses?: number;
}

export interface ReferralData {
  [key: string]: ReferralGroup;
}
