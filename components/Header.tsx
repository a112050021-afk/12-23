
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
    { code: 'zh-cn', label: '简中' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日文' },
    { code: 'ko', label: '한국어' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
        {/* Title */}
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#8B5E3C] tracking-widest uppercase">
                {t.title}
            </h1>
            <div className="h-1 w-24 bg-[#8B5E3C] mt-1"></div>
        </div>

        {/* Lang & Tabs Container */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white text-[10px]">
                    <i className="fas fa-globe"></i>
                </div>
                <select 
                    value={lang}
                    onChange={(e) => onLangChange(e.target.value as LangCode)}
                    className="bg-transparent border-none text-sm font-medium text-[#8B5E3C] focus:ring-0 cursor-pointer"
                >
                    {langs.map(l => (
                        <option key={l.code} value={l.code}>{l.label}</option>
                    ))}
                </select>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-6">
                <TabButton 
                    active={activeTab === AppTab.ATTRACTIONS} 
                    onClick={() => onTabChange(AppTab.ATTRACTIONS)}
                    icon="map-marked-alt"
                    label={t.tabAttractions}
                    color="#8B5E3C"
                />
                <TabButton 
                    active={activeTab === AppTab.NOTES} 
                    onClick={() => onTabChange(AppTab.NOTES)}
                    icon="sticky-note"
                    label={t.tabNotes}
                    color="#A3B18A"
                />
                <TabButton 
                    active={activeTab === AppTab.HISTORY} 
                    onClick={() => onTabChange(AppTab.HISTORY)}
                    icon="history"
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
        className={`flex items-center gap-2 pb-1 transition-all duration-300 ${
            active 
            ? `border-b-2 border-[${color}] text-[${color}] font-bold` 
            : 'text-gray-400 border-b-2 border-transparent hover:text-gray-600'
        }`}
        style={{ borderColor: active ? color : 'transparent', color: active ? color : undefined }}
    >
        <i className={`fas fa-${icon}`}></i>
        <span className="text-sm hidden sm:inline">{label}</span>
    </button>
);

export default Header;
