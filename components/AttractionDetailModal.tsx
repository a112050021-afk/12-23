
import React, { useState, useRef } from 'react';
import { Attraction, Note, LangCode } from '../types';
import { getT, getCategoryColor } from '../services/api';

interface AttractionDetailModalProps {
  lang: LangCode;
  attraction: Attraction;
  note?: Note;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
  onSaveNote: (id: number, name: string, text: string, photo?: string) => void;
}

const AttractionDetailModal: React.FC<AttractionDetailModalProps> = ({ 
    lang, attraction, note, isFavorite, onToggleFavorite, onClose, onSaveNote 
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(note?.note || '');
  const [notePhoto, setNotePhoto] = useState<string | undefined>(note?.photo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = getT(lang);
  const catColor = getCategoryColor(attraction.category);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-800/20 backdrop-blur-md">
      <div className="bg-[#fcfbf9] w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-xl animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
          <img 
            src={attraction.images?.[0]?.src || `https://picsum.photos/seed/${attraction.id}/800/400`}
            className="w-full h-full object-cover grayscale-[20%] opacity-90"
            alt={attraction.name}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <button 
                onClick={onClose}
                className="bg-white/50 hover:bg-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
            >
                <i className="fas fa-arrow-left"></i>
            </button>
            <button 
                onClick={onToggleFavorite}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                    isFavorite ? 'bg-red-400 text-white' : 'bg-white/50 text-gray-700'
                }`}
            >
                <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#fcfbf9] to-transparent">
            <h2 className="text-3xl font-medium text-gray-800 tracking-wider mb-2">{attraction.name}</h2>
            <div className="flex gap-4">
                <span 
                    className="text-[10px] border px-3 py-1 rounded-full uppercase tracking-widest font-light"
                    style={{ borderColor: catColor, color: catColor }}
                >
                    {attraction.category[0]?.name}
                </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
                <section>
                    <p className="text-gray-600 leading-loose text-justify font-light text-base first-letter:text-3xl first-letter:mr-2">
                        {attraction.introduction}
                    </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-light tracking-wide text-gray-400">
                    <div className="border-t border-gray-100 pt-4">
                        <p className="uppercase mb-2 font-medium text-gray-500">{t.address}</p>
                        <p>{attraction.address}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <p className="uppercase mb-2 font-medium text-gray-500">{t.openTime}</p>
                        <p>{attraction.open_time || '時段暫缺'}</p>
                    </div>
                </div>
            </div>

            {/* Side Panel: Journaling (Notes) */}
            <div className="space-y-6">
                <div className="bg-white/50 rounded-xl p-6 border border-gray-100 flex flex-col min-h-[300px]">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3B18A] mb-6 flex items-center gap-2">
                        <i className="fas fa-pen-nib"></i>
                        {t.tabNotes}
                    </h3>

                    {!isEditingNote && !note ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <button 
                                onClick={() => setIsEditingNote(true)}
                                className="text-gray-300 hover:text-[#A3B18A] transition-colors"
                            >
                                <i className="fas fa-plus-circle text-2xl mb-2"></i>
                                <p className="text-[10px] tracking-widest font-medium uppercase">{t.addNote}</p>
                            </button>
                        </div>
                    ) : isEditingNote ? (
                        <div className="flex-1 flex flex-col gap-4">
                            <textarea 
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="flex-1 w-full bg-transparent border-b border-gray-100 p-2 text-sm focus:border-[#A3B18A] outline-none min-h-[120px] font-light italic"
                                placeholder="拾起這一刻的感觸..."
                            />
                            
                            <div className="relative">
                              {notePhoto ? (
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                                  <img src={notePhoto} className="w-full h-full object-cover" alt="Journal attachment" />
                                  <button 
                                    onClick={() => setNotePhoto(undefined)}
                                    className="absolute top-2 right-2 bg-white/70 text-gray-400 w-6 h-6 rounded-full text-[10px] flex items-center justify-center"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full py-4 border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-[10px] uppercase tracking-widest hover:border-[#A3B18A] hover:text-[#A3B18A] transition-all"
                                >
                                  <i className="fas fa-camera-retro mr-2"></i> 上傳影記
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

                            <div className="flex gap-4">
                                <button 
                                    onClick={handleSave}
                                    className="flex-1 text-[10px] font-bold uppercase tracking-widest text-[#A3B18A] border border-[#A3B18A] py-2 rounded-full hover:bg-[#A3B18A] hover:text-white transition"
                                >
                                    {t.save}
                                </button>
                                <button 
                                    onClick={() => setIsEditingNote(false)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-gray-300 py-2"
                                >
                                    {t.cancel}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 mb-6">
                                {note?.photo && (
                                  <img src={note.photo} className="w-full aspect-[4/3] object-cover rounded-lg mb-4 shadow-sm grayscale-[30%]" alt="Note" />
                                )}
                                <p className="text-sm text-gray-500 font-light italic leading-loose">「 {note?.note} 」</p>
                                <div className="h-[1px] w-4 bg-gray-100 mt-4"></div>
                                <p className="text-[10px] text-gray-300 mt-2 font-light">
                                    {new Date(note!.updateTime).toLocaleDateString()}
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsEditingNote(true)}
                                className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 border-b border-transparent hover:border-[#A3B18A] hover:text-[#A3B18A] self-start transition-all"
                            >
                                <i className="fas fa-feather-alt mr-2"></i> {t.editNote}
                            </button>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetailModal;
