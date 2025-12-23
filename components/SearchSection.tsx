
import React, { useState, useEffect } from 'react';
import { LangCode } from '../types';
import { getT } from '../services/api';

interface SearchSectionProps {
  lang: LangCode;
  onSearch: (keyword: string) => void;
  initialValue: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ lang, onSearch, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const t = getT(lang);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <section className="mb-8">
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="bg-[#8B5E3C] p-3 rounded-xl flex items-center shadow-lg">
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-white rounded-lg px-4 py-3 text-lg outline-none placeholder-gray-400"
            />
            <button 
                type="submit"
                className="bg-white ml-3 w-12 h-12 rounded-full flex items-center justify-center text-[#8B5E3C] hover:bg-gray-100 transition-colors"
            >
                <i className="fas fa-search text-xl"></i>
            </button>
        </div>
      </form>
    </section>
  );
};

export default SearchSection;
