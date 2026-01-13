import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { X, ZoomIn, Camera, Calendar, MapPin } from 'lucide-react';

// Enhanced Mock Data (You can move this to MockData.js later)
const MEMORIES = [
  { id: 1, src: "assets/Group.jpeg", category: "The Core Team", date: "Jan 2024", title: "The Body and Soul of Ecell", size: "tall" },
  { id: 2, src: "assets/Meet2.jpg", category: "Meeting", date: "Feb 2024", title: "Core Team Meet", size: "short" },
  { id: 3, src: "assets/Meet1.jpeg", category: "Meeting", date: "Mar 2024", title: "Planning the future", size: "tall" },
  { id: 4, src: "assets/Kshitij.jpeg", category: "Second Round", date: "Apr 2024", title: "Our finance head selected for further round", size: "short" },
  { id: 5, src: "assets/Mentor.jpeg", category: "Mentorship", date: "Jan 2024", title: "Prof. Rathi's inpiring speech", size: "tall" },
  { id: 6, src: "assets/Meet3.jpeg", category: "Meeting", date: "May 2024", title: "Discusing the future plans", size: "short" },
  { id: 7, src: "assets/Eureka.jpeg", category: "Eureka", date: "Jun 2024", title: "IIC conducted Shaksham", size: "tall" },
  { id: 8, src: "assets/Seminar.jpeg", category: "Workshop", date: "Jul 2024", title: "Seminar", size: "short" },
];

// --- Sub-Component: The Alive Memory Card ---
const MemoryCard = ({ img, setSelectedId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className="relative mb-6 break-inside-avoid group perspective-1000"
      onClick={() => setSelectedId(img.id)}
    >
      <motion.div
        whileHover={{ 
          scale: 1.02, 
          rotateX: 2, 
          rotateY: 2,
          z: 50 
        }}
        className="relative overflow-hidden rounded-2xl bg-primary-light border border-white/10 cursor-none" // cursor-none for custom cursor effect if desired
      >
        {/* The Image (Desaturated by default, Color on Hover) */}
        <div className="relative overflow-hidden">
          <img 
            src={img.src} 
            alt={img.title} 
            className="w-full h-full object-cover grayscale-0 md:grayscale-[0.8] md:group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 md:scale-105 md:group-hover:scale-110"
          />
          
          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-primary-dark via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        </div>

        {/* The "Living" Content Reveal */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          
          {/* Floating Details */}
          <motion.div 
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
            className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-accent text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Camera size={12} /> {img.category}
              </span>
              <span className="text-gray-300 text-xs flex items-center gap-1">
                <Calendar size={12} /> {img.date}
              </span>
            </div>
            <h3 className="text-white font-display font-bold text-lg">{img.title}</h3>
          </motion.div>
          
          {/* Zoom Icon visual cue */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
            <ZoomIn className="text-white w-6 h-6" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Gallery Component ---
const Gallery = () => {
  const [selectedId, setSelectedId] = useState(null);
  const containerRef = useRef(null);
  
  // Smooth Parallax for the Header
  const { scrollYProgress } = useScroll();
  const yHeader = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-primary-dark relative overflow-hidden" ref={containerRef}>
      
      {/* 1. ATMOSPHERE: Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* 2. HEADER SECTION */}
      <motion.div 
        style={{ y: yHeader, opacity: opacityHeader }}
        className="relative z-10 pt-40 pb-20 px-6 text-center"
      >
        <div className="inline-block mb-4 p-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Our Visual Legacy</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6">
          Living <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-orange-500">Memories</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
          Moments frozen in time. From the chaos of the hackathons to the silence of the brainstorming sessions.
        </p>
      </motion.div>

      {/* 3. MASONRY GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        {/* CSS Columns for Waterfall Layout 
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"> */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {MEMORIES.map((img) => (
            <MemoryCard key={img.id} img={img} setSelectedId={setSelectedId} />
          ))}
        </div>
      </div>

      {/* 4. LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-primary-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            {/* Close Button */}
            <button className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50">
              <X size={24} />
            </button>

            {/* Modal Content */}
            <motion.div 
              layoutId={`img-${selectedId}`}
              className="relative max-w-5xl w-full max-h-[90vh] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                
                {/* The Image */}
                <div className="lg:col-span-2 bg-black flex items-center justify-center">
                  <img 
                    src={MEMORIES.find(img => img.id === selectedId)?.src}
                    className="max-h-[80vh] w-auto object-contain"
                  />
                </div>

                {/* The Story Sidebar */}
                <div className="lg:col-span-1 bg-primary-light p-8 flex flex-col justify-center border-l border-white/10">
                  <div className="mb-auto">
                    <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">
                      {MEMORIES.find(img => img.id === selectedId)?.category}
                    </span>
                    <h2 className="text-3xl font-display font-bold text-white mb-4">
                      {MEMORIES.find(img => img.id === selectedId)?.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                      
                    </p>
                  </div>

                  <div className="space-y-4 mt-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar size={18} className="text-accent" />
                      <span>{MEMORIES.find(img => img.id === selectedId)?.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin size={18} className="text-accent" />
                      <span>Rajshree Hall, UPC</span>
                    </div>
                    
                    <button className="w-full py-3 mt-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-bold transition-all">
                      Download High-Res
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;