
import React from 'react';
import { Note, LangCode } from '../types';
import { getT } from '../services/api';

interface NotesViewProps {
  lang: LangCode;
  notes: Note[];
  onSelectById: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotesView: React.FC<NotesViewProps> = ({ lang, notes, onSelectById, onDelete }) => {
  const t = getT(lang);

  if (notes.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="text-6xl text-gray-100 mb-6">
            <i className="fas fa-sticky-note"></i>
        </div>
        <p className="text-gray-400 font-medium">You haven't added any notes yet.</p>
        <p className="text-gray-300 text-sm mt-2">Browse attractions to start making memories!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map(n => (
        <div 
            key={n.attractionId} 
            className="bg-white p-5 rounded-2xl shadow-sm border-l-8 border-[#A3B18A] flex flex-col justify-between hover:shadow-md transition-shadow group overflow-hidden"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
                <h3 
                    className="font-bold text-gray-800 hover:text-[#A3B18A] cursor-pointer transition-colors"
                    onClick={() => onSelectById(n.attractionId)}
                >
                    {n.name}
                </h3>
                <button 
                    onClick={() => onDelete(n.attractionId)}
                    className="text-gray-300 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
                >
                    <i className="fas fa-trash-alt text-sm"></i>
                </button>
            </div>
            
            {n.photo && (
              <div className="h-24 w-full rounded-xl overflow-hidden mb-3 border border-gray-100">
                <img src={n.photo} alt={n.name} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 italic">"{n.note}"</p>
          </div>
          
          <div className="flex justify-between items-center mt-2 border-t pt-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                {new Date(n.updateTime).toLocaleDateString()}
              </span>
              <button 
                  onClick={() => onSelectById(n.attractionId)}
                  className="text-[#A3B18A] text-xs font-bold hover:underline"
              >
                  {t.fullIntro} <i className="fas fa-arrow-right text-[10px]"></i>
              </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesView;
