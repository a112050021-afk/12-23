
import React from 'react';
import { Attraction, LangCode } from '../types';
import { getT, getCategoryColor } from '../services/api';

interface AttractionCardProps {
  attraction: Attraction;
  onSelect: (a: Attraction) => void;
  lang: LangCode;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, onSelect, lang, isFavorite, onToggleFavorite }) => {
  const t = getT(lang);
  const firstImage = attraction.images?.[0]?.src || `https://picsum.photos/seed/${attraction.id}/400/300`;
  const borderColor = getCategoryColor(attraction.category);

  return (
    <div 
        className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row border-l-4 hover:shadow-lg transition-all duration-500 group"
        style={{ borderLeftColor: borderColor }}
    >
      {/* Image Part */}
      <div className="w-full md:w-[280px] h-[200px] md:h-auto overflow-hidden relative">
        <img 
          src={firstImage} 
          alt={attraction.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onClick={() => onSelect(attraction)}
        />
        <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(e); }}
            className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isFavorite ? 'bg-white text-red-300 shadow-sm' : 'bg-black/10 text-white/70 backdrop-blur-sm'
            } hover:scale-110`}
        >
            <i className={`${isFavorite ? 'fas' : 'far'} fa-heart text-sm`}></i>
        </button>
      </div>

      {/* Info Part */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 
                className="text-xl font-medium text-gray-700 group-hover:text-[#A88E6D] transition-colors cursor-pointer tracking-wide"
                onClick={() => onSelect(attraction)}
            >
                {attraction.name}
            </h3>
            <span className="text-[10px] text-gray-300 uppercase tracking-widest font-light">
                {attraction.category[0]?.name}
            </span>
          </div>
          
          <p className="text-xs text-gray-400 flex items-center gap-1 mb-4 font-light">
            <i className="fas fa-location-arrow text-[10px] opacity-40"></i>
            {attraction.distric}
          </p>

          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-light italic mb-6">
            {attraction.introduction}
          </p>
        </div>

        <div className="flex justify-end items-center gap-4">
          <button 
            onClick={() => onSelect(attraction)}
            className="text-[10px] font-medium text-gray-400 border-b border-transparent hover:border-[#A88E6D] hover:text-[#A88E6D] py-1 transition-all tracking-[0.2em] uppercase"
          >
            {t.fullIntro} <i className="fas fa-chevron-right text-[8px] ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
