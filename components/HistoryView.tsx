
import React from 'react';
import { SearchRecord, LangCode } from '../types';
import { getT } from '../services/api';

interface HistoryViewProps {
  lang: LangCode;
  history: SearchRecord[];
  onSearch: (keyword: string, lang: LangCode) => void;
  onClear: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ lang, history, onSearch, onClear }) => {
  const t = getT(lang);

  if (history.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="text-6xl text-gray-100 mb-6">
            <i className="fas fa-history"></i>
        </div>
        <p className="text-gray-400 font-medium">Your search history is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-3">
            <i className="fas fa-history text-[#A88E6D]"></i>
            Recent Searches
        </h2>
        <button 
            onClick={onClear}
            className="text-xs text-red-400 font-bold hover:bg-red-50 px-3 py-1.5 rounded-full transition"
        >
            <i className="fas fa-trash-alt mr-1"></i>
            {t.clearHistory}
        </button>
      </div>

      <div className="space-y-2">
        {history.map((record, idx) => (
          <button 
            key={idx}
            onClick={() => onSearch(record.keyword, record.lang)}
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition group"
          >
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs group-hover:bg-[#A88E6D] group-hover:text-white transition">
                    <i className="fas fa-search"></i>
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-700">{record.keyword}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">{record.lang}</p>
                </div>
            </div>
            <div className="text-right text-[10px] text-gray-300 group-hover:text-[#A88E6D]">
                {new Date(record.timestamp).toLocaleString()}
                <i className="fas fa-chevron-right ml-3 text-xs opacity-0 group-hover:opacity-100 transition"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
