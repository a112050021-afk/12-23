
import React, { useState, useRef } from 'react';
import { Attraction, Note, LangCode } from '../types';
import { getT } from '../services/api';

interface AttractionDetailModalProps {
  lang: LangCode;
  attraction: Attraction;
  note?: Note;
  onClose: () => void;
  onSaveNote: (id: number, name: string, text: string, photo?: string) => void;
}

const AttractionDetailModal: React.FC<AttractionDetailModalProps> = ({ 
    lang, attraction, note, onClose, onSaveNote 
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(note?.note || '');
  const [notePhoto, setNotePhoto] = useState<string | undefined>(note?.photo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = getT(lang);

  const handleSave = () => {
    onSaveNote(attraction.id, attraction.name, noteText, notePhoto);
    setIsEditingNote(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNotePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#f4f1ea] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
          <img 
            src={attraction.images?.[0]?.src || `https://picsum.photos/seed/${attraction.id}/800/400`}
            className="w-full h-full object-cover"
            alt={attraction.name}
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-3xl font-bold text-white">{attraction.name}</h2>
            <div className="flex gap-2 mt-2">
                {attraction.category.slice(0, 3).map(cat => (
                    <span key={cat.id} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-md">
                        {cat.name}
                    </span>
                ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <section>
                    <h3 className="text-[#8B5E3C] font-bold border-l-4 border-[#8B5E3C] pl-3 mb-3">
                        {t.fullIntro}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-justify">
                        {attraction.introduction}
                    </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 font-medium mb-1">{t.address}</p>
                        <p className="text-gray-700">{attraction.address}</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 font-medium mb-1">{t.openTime}</p>
                        <p className="text-gray-700">{attraction.open_time || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Side Panel: Notes with Photo Support */}
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                    <h3 className="text-[#A3B18A] font-bold flex items-center gap-2 mb-4">
                        <i className="fas fa-feather-alt"></i>
                        {t.tabNotes}
                    </h3>

                    {!isEditingNote && !note ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                            <p className="text-gray-400 text-sm mb-4 italic">No notes yet</p>
                            <button 
                                onClick={() => setIsEditingNote(true)}
                                className="bg-[#A3B18A] text-white px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 transition shadow-sm"
                            >
                                <i className="fas fa-plus mr-1"></i> {t.addNote}
                            </button>
                        </div>
                    ) : isEditingNote ? (
                        <div className="flex-1 flex flex-col gap-3">
                            <textarea 
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="flex-1 w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#A3B18A] outline-none min-h-[100px]"
                                placeholder="Write your thoughts..."
                            />
                            
                            <div className="relative group">
                              {notePhoto ? (
                                <div className="relative h-24 w-full rounded-xl overflow-hidden border border-gray-200">
                                  <img src={notePhoto} className="w-full h-full object-cover" alt="Note attachment" />
                                  <button 
                                    onClick={() => setNotePhoto(undefined)}
                                    className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full h-12 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs hover:border-[#A3B18A] hover:text-[#A3B18A] transition-colors"
                                >
                                  <i className="fas fa-camera mr-2"></i> Add Photo
                                </button>
                              )}
                              <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handlePhotoUpload} 
                                className="hidden" 
                                accept="image/*"
                              />
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    onClick={handleSave}
                                    className="flex-1 bg-[#A3B18A] text-white py-2 rounded-xl text-xs font-bold"
                                >
                                    {t.save}
                                </button>
                                <button 
                                    onClick={() => {
                                        setNoteText(note?.note || '');
                                        setNotePhoto(note?.photo);
                                        setIsEditingNote(false);
                                    }}
                                    className="px-4 bg-gray-100 text-gray-500 py-2 rounded-xl text-xs font-bold"
                                >
                                    {t.cancel}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 mb-4 overflow-y-auto">
                                {note?.photo && (
                                  <img src={note.photo} className="w-full h-32 object-cover rounded-lg mb-3 shadow-sm" alt="Note" />
                                )}
                                <p className="text-sm text-gray-700 italic">"{note?.note}"</p>
                                <p className="text-[10px] text-gray-400 mt-2 text-right">
                                    Last updated: {new Date(note!.updateTime).toLocaleDateString()}
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsEditingNote(true)}
                                className="w-full border border-[#A3B18A] text-[#A3B18A] py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition"
                            >
                                <i className="fas fa-edit mr-1"></i> {t.editNote}
                            </button>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t flex justify-end">
            <button 
                onClick={onClose}
                className="text-gray-500 font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetailModal;
