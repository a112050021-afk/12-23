
import React from 'react';
import { Attraction, LangCode } from '../types';
import AttractionCard from './AttractionCard';
import { getT } from '../services/api';

interface AttractionListProps {
  lang: LangCode;
  attractions: Attraction[];
  onSelect: (a: Attraction) => void;
  hasKeyword: boolean;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

const AttractionList: React.FC<AttractionListProps> = ({ 
    lang, attractions, onSelect, hasKeyword, favorites, onToggleFavorite 
}) => {
  const t = getT(lang);

  if (attractions.length === 0) {
    return (
      <div className="text-center py-20 bg-white/30 rounded-3xl border border-dashed border-gray-200">
        <div className="text-4xl text-gray-200 mb-6">
            <i className="fas fa-wind"></i>
        </div>
        <p className="text-gray-400 font-light italic tracking-widest">{t.noResults}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {hasKeyword && (
        <div className="pb-2 mb-8 text-center">
            <h2 className="text-sm font-light text-gray-400 tracking-[0.2em] uppercase">
                {t.keywordResults}
            </h2>
            <div className="h-[1px] w-8 bg-gray-200 mx-auto mt-2"></div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6">
        {attractions.map(attr => (
          <AttractionCard 
              key={attr.id} 
              attraction={attr} 
              onSelect={onSelect}
              lang={lang}
              isFavorite={favorites.includes(attr.id)}
              onToggleFavorite={() => onToggleFavorite(attr.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AttractionList;
