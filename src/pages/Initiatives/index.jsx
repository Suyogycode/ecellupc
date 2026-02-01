import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIATIVES } from '../../data/MockData';
import InitiativeCard from './InitiativeCard';
import EventCalendar from './EventCalendar'; // <--- IMPORT THE NEW CALENDAR
import { ChevronRight } from 'lucide-react';

const Initiatives = () => {
  const [activeId, setActiveId] = useState(INITIATIVES[0].id);

  // Find the full data object of the active initiative
  const activeData = INITIATIVES.find(i => i.id === activeId);

  return (
    <div className="min-h-screen bg-primary-dark pt-24 md:pt-28 pb-16 md:pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 md:mb-4">
            Our <span className="text-accent">Initiatives</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
            We conduct a wide range of initiatives to help students, startups, and professionals.
          </p>
        </div>

        {/* Dashboard Layout */}
        <div id="eureka" className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 h-auto lg:h-[600px] mb-16 md:mb-20">

          {/* LEFT COLUMN: Vertical Tabs */}
          <div className="lg:col-span-3 flex flex-col gap-2 md:gap-3 h-auto lg:h-auto overflow-y-auto pr-2 custom-scrollbar">
            {INITIATIVES.map((item) => (
              <button
                key={item.id}
                id={item.id}
                onClick={() => setActiveId(item.id)}
                className={`group relative p-3 md:p-4 rounded-lg md:rounded-xl text-left transition-all duration-300 border border-transparent ${activeId === item.id
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
                  <div className="flex items-center gap-2 md:gap-3">
                    <item.icon size={18} className={activeId === item.id ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
                    <span className={`font-bold text-xs md:text-sm lg:text-base ${activeId === item.id ? 'text-white' : ''}`}>
                      {item.title}
                    </span>
                  </div>
                  {activeId === item.id && (
                    <ChevronRight size={14} className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT COLUMN: Content Display */}
          <div className="lg:col-span-9 relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 overflow-hidden shadow-2xl">
            {/* Background Blob for Atmosphere */}
            <div className={`absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-br ${activeData.color} rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2 transition-colors duration-700 pointer-events-none`}></div>

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

        {/* NEW SECTION: Event Calendar */}
        <EventCalendar />

      </div>
    </div>
  );
};

export default Initiatives;