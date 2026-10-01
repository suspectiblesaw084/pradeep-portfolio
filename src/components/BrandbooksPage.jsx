import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowLeft, FileText, Download, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandbooks } from '../data/brandbooks';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function BrandbooksPage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { playClick, playHover } = useSoundEffects();

  return (
    <div className="min-h-screen bg-retro-bg font-sans text-retro-text relative pt-32 pb-24 z-10">
      
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_2px,transparent_2px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            onClick={playClick}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-retro-text hover:text-retro-blue transition-colors cursor-none border-2 border-transparent hover:border-retro-border px-2 py-1 bg-white shadow-retro-sm"
          >
            <ArrowLeft size={16} />
            Return to Main Menu
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-16 md:mb-24 bg-white border-4 border-retro-border p-8 md:p-12 shadow-retro flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-retro-border" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-border" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-border" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-retro-border" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-retro-yellow border-2 border-retro-border mb-4 shadow-retro-sm ui-scratch rotate-1">
              <span className="w-2 h-2 bg-retro-red animate-blink" />
              <span className="text-[10px] uppercase tracking-widest text-retro-text font-mono font-bold">
                BRANDBOOK ARCHIVE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-retro-text uppercase tracking-tight relative">
              <span className="relative z-10">Brandbooks</span>
              <span className="absolute top-1 left-1 text-retro-text/10 z-0 select-none">Brandbooks</span>
            </h1>
          </div>
          <p className="text-retro-text/80 font-mono text-xs max-w-xs md:text-right uppercase font-bold">
            A growing archive of brand guidelines, identity systems, visual rules, and design documentation.
          </p>
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {brandbooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group flex flex-col"
            >
              <div className="w-full bg-white border-4 border-retro-border shadow-retro flex flex-col group hover:shadow-retro-hover transition-all duration-150 h-full relative">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-retro-border" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-retro-border" />

                <div className="bg-retro-border text-white px-3 py-1.5 flex justify-between items-center font-mono text-xs uppercase tracking-widest select-none">
                  <span className="truncate pr-4">doc_{index + 1}.pdf</span>
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-3 h-3 border border-white bg-white text-retro-border flex items-center justify-center text-[10px] leading-none font-bold">
                      x
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-retro-bg flex items-center justify-center border-b-2 border-retro-border">
                  {/* Retro Disk/Folder Graphic */}
                  <div className="w-24 h-24 border-2 border-retro-border bg-white flex flex-col items-center justify-center gap-2 shadow-retro-sm group-hover:bg-retro-blue group-hover:text-white transition-colors relative pointer-events-none">
                    <div className="absolute top-2 right-2 w-4 h-4 border-2 border-retro-border bg-retro-yellow" />
                    <BookOpen size={32} />
                    <div className="w-12 h-2 border-2 border-retro-border bg-retro-text group-hover:bg-white" />
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] tracking-[0.2em] text-retro-blue uppercase font-mono font-bold">
                      [{book.category}]
                    </span>
                    <span className="text-[10px] tracking-widest text-retro-gray font-mono font-bold">
                      {book.year}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-retro-text mb-2 font-display uppercase">
                    {book.title}
                  </h2>
                  <p className="text-retro-text/80 font-medium text-sm mb-6 flex-grow">
                    {book.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    <button 
                      onClick={() => { playClick(); setSelectedBook(book); }}
                      onMouseEnter={playHover}
                      className="retro-btn bg-retro-bg hover:bg-retro-blue hover:text-white w-full flex items-center justify-center gap-2 cursor-none"
                    >
                      <FileText size={14} />
                      View Book
                    </button>
                    <button 
                      disabled
                      className="w-full flex items-center justify-center gap-2 cursor-none py-2 font-mono text-xs font-bold uppercase tracking-widest text-retro-text/50 border-2 border-transparent"
                    >
                      <Download size={14} />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stable Placeholder Viewer Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-none"
              onClick={() => setSelectedBook(null)}
            />

            {/* Modal Window */}
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white border-4 border-retro-border shadow-retro flex flex-col z-10"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-retro-border" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-border" />

              {/* Title Bar */}
              <div className="bg-retro-border text-white px-4 py-2 flex justify-between items-center font-mono text-xs uppercase tracking-widest select-none">
                <span className="truncate pr-4">VIEWER.EXE - {selectedBook.title}</span>
                <button 
                  onClick={() => { playClick(); setSelectedBook(null); }}
                  onMouseEnter={playHover}
                  className="w-5 h-5 border-2 border-white bg-retro-red flex items-center justify-center cursor-none hover:bg-white hover:text-retro-red transition-colors"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-8 md:p-16 flex flex-col items-center justify-center text-center bg-retro-bg min-h-[400px]">
                <div className="w-20 h-20 mb-6 border-4 border-retro-border bg-retro-yellow flex items-center justify-center shadow-retro-sm">
                  <FileText size={32} className="text-retro-text" />
                </div>
                
                <h3 className="text-2xl md:text-4xl font-display font-bold text-retro-text uppercase mb-4">
                  Brandbook Preview Coming Soon
                </h3>
                
                <p className="text-retro-text/80 font-mono text-sm max-w-md mb-8">
                  This document viewer is a stable placeholder. A full PDF integration or custom page-flip interface will be deployed here once the actual brandbook files are finalized.
                </p>

                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-retro-border bg-white text-retro-text font-mono text-xs font-bold shadow-retro-sm">
                  <span className="w-2 h-2 bg-retro-blue animate-blink" />
                  STATUS: AWAITING_FILES
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
