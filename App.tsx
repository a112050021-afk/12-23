
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LangCode, Attraction, Note, SearchRecord, AppTab } from './types';
import { getAttractions, getT } from './services/api';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import AttractionList from './components/AttractionList';
import NotesView from './components/NotesView';
import HistoryView from './components/HistoryView';
import AttractionDetailModal from './components/AttractionDetailModal';

const App: React.FC = () => {
  const [lang, setLang] = useState<LangCode>('zh-tw');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.ATTRACTIONS);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('taipei_notes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [history, setHistory] = useState<SearchRecord[]>(() => {
    const saved = localStorage.getItem('taipei_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('taipei_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchData = useCallback(async (currentLang: LangCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAttractions(currentLang);
      setAttractions(result.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(lang);
  }, [lang, fetchData]);

  useEffect(() => {
    localStorage.setItem('taipei_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('taipei_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('taipei_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (k: string) => {
    setKeyword(k);
    setActiveTab(AppTab.ATTRACTIONS);
    if (k.trim()) {
      const newRecord: SearchRecord = {
        keyword: k.trim(),
        lang,
        timestamp: Date.now()
      };
      setHistory(prev => {
        const filtered = prev.filter(r => r.keyword !== k.trim());
        return [newRecord, ...filtered].slice(0, 10);
      });
    }
  };

  const handleLanguageChange = (newLang: LangCode) => {
    setLang(newLang);
    setKeyword('');
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const addNote = (id: number, name: string, text: string, photo?: string) => {
    setNotes(prev => {
      const filtered = prev.filter(n => n.attractionId !== id);
      return [{ attractionId: id, name, note: text, photo, updateTime: Date.now() }, ...filtered];
    });
  };

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(n => n.attractionId !== id));
  };

  const clearHistory = () => setHistory([]);

  const fuzzyMatch = (text: string, query: string) => {
    const q = query.toLowerCase().replace(/\s/g, '');
    const t = text.toLowerCase();
    let i = 0, j = 0;
    while (i < t.length && j < q.length) {
      if (t[i] === q[j]) j++;
      i++;
    }
    return j === q.length;
  };

  const filteredAttractions = useMemo(() => {
    if (activeTab === AppTab.FAVORITES) {
      return attractions.filter(a => favorites.includes(a.id));
    }
    if (!keyword.trim()) return attractions;
    return attractions.filter(a => 
      fuzzyMatch(a.name, keyword) || 
      fuzzyMatch(a.introduction, keyword)
    );
  }, [attractions, keyword, activeTab, favorites]);

  const t = getT(lang);

  return (
    <div className="min-h-screen pb-12 transition-all duration-500">
      <Header 
        lang={lang} 
        onLangChange={handleLanguageChange} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {(activeTab === AppTab.ATTRACTIONS || activeTab === AppTab.FAVORITES) && (
          <>
            {activeTab === AppTab.ATTRACTIONS && (
              <SearchSection 
                lang={lang} 
                onSearch={handleSearch} 
                initialValue={keyword}
              />
            )}
            
            {isLoading && attractions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#A88E6D]">
                <div className="animate-pulse flex flex-col items-center">
                    <i className="fas fa-feather-alt text-4xl mb-4"></i>
                    <p className="tracking-widest">{t.loading}</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-300 italic mb-4">{t.error}</p>
                <button 
                  onClick={() => fetchData(lang)}
                  className="border border-[#A88E6D] text-[#A88E6D] px-6 py-2 rounded-full hover:bg-[#A88E6D] hover:text-white transition shadow-sm"
                >
                  {t.retry}
                </button>
              </div>
            ) : (
              <AttractionList 
                lang={lang}
                attractions={filteredAttractions} 
                onSelect={setSelectedAttraction} 
                hasKeyword={!!keyword && activeTab === AppTab.ATTRACTIONS}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </>
        )}

        {activeTab === AppTab.NOTES && (
          <NotesView 
            lang={lang}
            notes={notes} 
            onSelectById={(id) => {
              const attr = attractions.find(a => a.id === id);
              if (attr) setSelectedAttraction(attr);
            }}
            onDelete={deleteNote}
          />
        )}

        {activeTab === AppTab.HISTORY && (
          <HistoryView 
            lang={lang}
            history={history} 
            onSearch={(k, l) => {
              setLang(l);
              handleSearch(k);
            }}
            onClear={clearHistory}
          />
        )}
      </main>

      {selectedAttraction && (
        <AttractionDetailModal 
          lang={lang}
          attraction={selectedAttraction} 
          note={notes.find(n => n.attractionId === selectedAttraction.id)}
          isFavorite={favorites.includes(selectedAttraction.id)}
          onToggleFavorite={() => toggleFavorite(selectedAttraction.id)}
          onClose={() => setSelectedAttraction(null)}
          onSaveNote={addNote}
        />
      )}
    </div>
  );
};

export default App;
