
export type LangCode = 'zh-tw' | 'zh-cn' | 'en' | 'ja' | 'ko' | 'es' | 'id' | 'th' | 'vi';

export interface AttractionImage {
  src: string;
  subject: string;
  ext: string;
}

export interface Attraction {
  id: number;
  name: string;
  name_zh: string | null;
  open_status: number;
  introduction: string;
  open_time: string;
  zipcode: string;
  distric: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
  months: string;
  nlat: number;
  elong: number;
  official_site: string;
  facebook: string;
  ticket: string;
  remind: string;
  staytime: string;
  modified: string;
  url: string;
  category: { id: number; name: string }[];
  target: { id: number; name: string }[];
  service: { id: number; name: string }[];
  friendly: { id: number; name: string }[];
  images: AttractionImage[];
  links: { src: string; subject: string }[];
}

export interface ApiResponse {
  total: number;
  data: Attraction[];
}

export interface Note {
  attractionId: number;
  name: string;
  note: string;
  photo?: string; // Base64 encoded image
  updateTime: number;
}

export interface SearchRecord {
  keyword: string;
  lang: LangCode;
  timestamp: number;
}

export enum AppTab {
  ATTRACTIONS = 'attractions',
  NOTES = 'notes',
  HISTORY = 'history'
}
