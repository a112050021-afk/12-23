
import React from 'react';
import { LangCode, AppTab } from '../types';
import { getT } from '../services/api';

interface HeaderProps {
  lang: LangCode;
  onLangChange: (lang: LangCode) => void;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, onLangChange, activeTab, onTabChange }) => {
  const t = getT(lang);
  
  const langs: { code: LangCode; label: string }[] = [
    { code: 'zh-tw', label: '繁中' },
    { code: 'zh-cn', label: '簡中' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日文' },
    { code: 'ko', label: '한국어' }
  ];

  return (
    <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-30 transition-all">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-6">
        {/* Title */}
        <div className="flex flex-col items-center group">
            <h1 className="text-2xl sm:text-3xl font-light text-[#5C5C5C] tracking-[0.3em] uppercase">
                {t.title}
            </h1>
            <div className="h-[1px] w-12 bg-[#A88E6D] mt-2 group-hover:w-24 transition-all duration-700"></div>
        </div>

        {/* Lang & Tabs Container */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
                <i className="fas fa-globe text-[#A88E6D] text-xs"></i>
                <select 
                    value={lang}
                    onChange={(e) => onLangChange(e.target.value as LangCode)}
                    className="bg-transparent border-none text-xs font-medium text-gray-500 focus:ring-0 cursor-pointer"
                >
                    {langs.map(l => (
                        <option key={l.code} value={l.code}>{l.label}</option>
                    ))}
                </select>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-8">
                <TabButton 
                    active={activeTab === AppTab.ATTRACTIONS} 
                    onClick={() => onTabChange(AppTab.ATTRACTIONS)}
                    icon="compass"
                    label={t.tabAttractions}
                    color="#A88E6D"
                />
                <TabButton 
                    active={activeTab === AppTab.FAVORITES} 
                    onClick={() => onTabChange(AppTab.FAVORITES)}
                    icon="heart"
                    label={t.tabFavorites}
                    color="#8E9AAF"
                />
                <TabButton 
                    active={activeTab === AppTab.NOTES} 
                    onClick={() => onTabChange(AppTab.NOTES)}
                    icon="feather"
                    label={t.tabNotes}
                    color="#A3B18A"
                />
                <TabButton 
                    active={activeTab === AppTab.HISTORY} 
                    onClick={() => onTabChange(AppTab.HISTORY)}
                    icon="leaf"
                    label={t.tabHistory}
                    color="#A88E6D"
                />
            </nav>
        </div>
      </div>
    </header>
  );
};

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    icon: string;
    label: string;
    color: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label, color }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-all duration-500 ${
            active 
            ? `text-[${color}] scale-110` 
            : 'text-gray-300 hover:text-gray-500'
        }`}
        style={{ color: active ? color : undefined }}
    >
        <i className={`fas fa-${icon} text-sm`}></i>
        <span className="text-[10px] tracking-widest font-medium uppercase">{label}</span>
    </button>
);

export default Header;
