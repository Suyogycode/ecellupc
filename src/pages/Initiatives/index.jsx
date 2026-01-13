import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIATIVES } from '../../data/MockData';
import InitiativeCard from './InitiativeCard';
import { ChevronRight } from 'lucide-react';

const Initiatives = () => {
  const [activeId, setActiveId] = useState(INITIATIVES[0].id);
  
  // Find the full data object of the active initiative
  const activeData = INITIATIVES.find(i => i.id === activeId);

  return (
    <div className="min-h-screen bg-primary-dark pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Our <span className="text-accent">Initiatives</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We conduct a wide range of initiatives to help students, startups, and professionals.
          </p>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[800px] lg:h-[600px]">
          
          {/* LEFT COLUMN: Vertical Tabs 
          <div className="lg:col-span-3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">  */}
          <div className="lg:col-span-3 flex flex-col gap-3 h-[200px] lg:h-auto overflow-y-auto ...">
            {INITIATIVES.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`group relative p-6 rounded-xl text-left transition-all duration-300 border border-transparent ${
                  activeId === item.id 
                    ? 'bg-white/10 border-white/10 shadow-lg' 
                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {/* Active Indicator Strip */}
                {activeId === item.id && (
                  <motion.div 
                    layoutId="activeStrip"
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b ${item.color}`}
                  />
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={activeId === item.id ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
                    <span className={`font-bold text-lg ${activeId === item.id ? 'text-white' : ''}`}>
                      {item.title}
                    </span>
                  </div>
                  {activeId === item.id && (
                    <ChevronRight size={18} className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT COLUMN: Content Display */}
          <div className="lg:col-span-9 relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Background Blob for Atmosphere */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${activeData.color} rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2 transition-colors duration-700 pointer-events-none`}></div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 h-full"
              >
                <InitiativeCard data={activeData} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Initiatives;