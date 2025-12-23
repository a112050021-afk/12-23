
import React from 'react';
import { Attraction, LangCode } from '../types';
import AttractionCard from './AttractionCard';
import { getT } from '../services/api';

interface AttractionListProps {
  lang: LangCode;
  attractions: Attraction[];
  onSelect: (a: Attraction) => void;
  hasKeyword: boolean;
}

const AttractionList: React.FC<AttractionListProps> = ({ lang, attractions, onSelect, hasKeyword }) => {
  const t = getT(lang);

  if (attractions.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
        <div className="text-6xl text-gray-200 mb-4">
            <i className="fas fa-search-location"></i>
        </div>
        <p className="text-gray-500">{t.noResults}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hasKeyword && (
        <div className="border-b-2 border-gray-200 pb-2 mb-6">
            <h2 className="text-center text-lg font-medium text-gray-700">
                {t.keywordResults}
            </h2>
        </div>
      )}
      {attractions.map(attr => (
        <AttractionCard 
            key={attr.id} 
            attraction={attr} 
            onSelect={onSelect}
            lang={lang}
        />
      ))}
    </div>
  );
};

export default AttractionList;
