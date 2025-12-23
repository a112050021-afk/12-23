
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
    <section className="mb-12">
      <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
        <div className="bg-white/50 border-b border-gray-200 p-2 flex items-center transition-all focus-within:border-[#A88E6D]">
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent px-4 py-2 text-sm font-light tracking-widest outline-none placeholder:text-gray-300"
            />
            <button 
                type="submit"
                className="text-gray-300 hover:text-[#A88E6D] p-2 transition-colors"
            >
                <i className="fas fa-search text-xs"></i>
            </button>
        </div>
      </form>
    </section>
  );
};

export default SearchSection;
