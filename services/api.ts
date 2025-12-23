
import { ApiResponse, LangCode } from '../types';

const BASE_URL = 'https://www.travel.taipei/open-api';

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
    title: '台北旅遊地圖',
    searchPlaceholder: '搜尋景點、古蹟、藝術...',
    tabAttractions: '探尋',
    tabFavorites: '收藏',
    tabNotes: '隨筆',
    tabHistory: '足跡',
    noResults: '暫無相關內容',
    loading: '尋找中...',
    error: '讀取失敗',
    retry: '重試',
    fullIntro: '細讀內容',
    addNote: '寫下筆記',
    editNote: '修改筆記',
    deleteNote: '刪除',
    save: '存檔',
    cancel: '取消',
    clearHistory: '抹除足跡',
    address: '地址',
    openTime: '開放時段',
    tel: '電話',
    relatedSites: '更多連結',
    keywordResults: '與關鍵字有關的景點'
  },
  'en': {
    title: 'Taipei Muse',
    searchPlaceholder: 'Search by vibes...',
    tabAttractions: 'Explore',
    tabFavorites: 'Saves',
    tabNotes: 'Journal',
    tabHistory: 'Logs',
    noResults: 'Nothing found here',
    loading: 'Seeking...',
    error: 'Failed to load',
    retry: 'Retry',
    fullIntro: 'Details',
    addNote: 'Write Note',
    editNote: 'Edit',
    deleteNote: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    clearHistory: 'Clear Logs',
    address: 'Address',
    openTime: 'Hours',
    tel: 'Tel',
    relatedSites: 'Links',
    keywordResults: 'Matching results'
  }
};

export function getT(lang: LangCode) {
  return i18n[lang as keyof typeof i18n] || i18n['en'];
}

// Utility for dynamic border colors based on category
export function getCategoryColor(categories: { name: string }[]): string {
    const name = categories[0]?.name || "";
    if (name.includes("自然") || name.includes("公園")) return "#A3B18A"; // Sage Green
    if (name.includes("古蹟") || name.includes("宗教") || name.includes("歷史")) return "#BC8A5F"; // Muted Bronze
    if (name.includes("藝術") || name.includes("館")) return "#8E9AAF"; // Dusky Blue
    if (name.includes("商圈") || name.includes("夜市")) return "#D4A373"; // Sand
    return "#E5E5E5"; // Neutral
}
