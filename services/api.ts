
import { ApiResponse, LangCode } from '../types';

const BASE_URL = 'https://www.travel.taipei/open-api';

/**
 * Fetch attractions from the Taipei Open API.
 * Using a public CORS proxy as per common requirement for local development with this API.
 */
export async function getAttractions(lang: LangCode, page: number = 1): Promise<ApiResponse> {
  const proxy = 'https://corsproxy.io/?';
  const url = `${proxy}${encodeURIComponent(`${BASE_URL}/${lang}/Attractions/All?page=${page}`)}`;
  
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`API Request failed: ${response.status}`);
  }

  return response.json();
}

export const i18n = {
  'zh-tw': {
    title: '台北城市旅遊地圖',
    searchPlaceholder: '請輸入景點關鍵字',
    tabAttractions: '景點查詢',
    tabNotes: '景點筆記',
    tabHistory: '歷史紀錄',
    noResults: '查無相關景點',
    loading: '資料讀取中...',
    error: '讀取失敗',
    retry: '重新嘗試',
    fullIntro: '完整介紹',
    addNote: '新增筆記',
    editNote: '編輯筆記',
    deleteNote: '刪除筆記',
    save: '儲存',
    cancel: '取消',
    clearHistory: '清除歷史紀錄',
    address: '地址',
    openTime: '開放時間',
    tel: '電話',
    relatedSites: '相關連結',
    keywordResults: '與關鍵字有關的景點'
  },
  'en': {
    title: 'Taipei City Tourism Map',
    searchPlaceholder: 'Search attractions...',
    tabAttractions: 'Explore',
    tabNotes: 'My Notes',
    tabHistory: 'History',
    noResults: 'No attractions found',
    loading: 'Loading data...',
    error: 'Failed to load',
    retry: 'Retry',
    fullIntro: 'Details',
    addNote: 'Add Note',
    editNote: 'Edit',
    deleteNote: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    clearHistory: 'Clear History',
    address: 'Address',
    openTime: 'Hours',
    tel: 'Tel',
    relatedSites: 'Links',
    keywordResults: 'Matching Attractions'
  }
  // Simplified for brevity, more can be added easily
};

export function getT(lang: LangCode) {
  return i18n[lang as keyof typeof i18n] || i18n['en'];
}
