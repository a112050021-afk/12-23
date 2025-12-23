
import React from 'react';
import { Attraction, LangCode } from '../types';
import { getT } from '../services/api';

interface AttractionCardProps {
  attraction: Attraction;
  onSelect: (a: Attraction) => void;
  lang: LangCode;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, onSelect, lang }) => {
  const t = getT(lang);
  const firstImage = attraction.images?.[0]?.src || `https://picsum.photos/seed/${attraction.id}/400/300`;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100 hover:shadow-md transition-shadow">
      {/* Image Part */}
      <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto">
        <img 
          src={firstImage} 
          alt={attraction.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Part */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-gray-50/50">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-[#8B5E3C]">{attraction.name}</h3>
            <div className="text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star text-gray-200"></i>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
            <i className="fas fa-map-marker-alt text-red-400"></i>
            {attraction.address}
          </p>

          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
            {attraction.introduction}
          </p>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => onSelect(attraction)}
            className="bg-[#8B5E3C] text-white text-xs px-4 py-1.5 rounded-full flex items-center gap-1 hover:bg-[#6D4A30] transition-colors"
          >
            <i className="fas fa-chevron-circle-down"></i>
            {t.fullIntro}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
