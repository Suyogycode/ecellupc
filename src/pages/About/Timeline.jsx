import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// CRITICAL: Check this path! If this file doesn't exist, the page goes blank.
import { TIMELINE_DATA } from '../../data/MockData';

const TimelineNode = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex items-center w-full mb-12 md:mb-24 ${isEven ? 'flex-row' : 'flex-row-reverse'
        }`}
    >
      {/* --- CONTENT CARD --- */}
      <div className="w-5/12">
        <div className="p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/30 transition-colors">

          {/* HEADER ROW: Stack on Mobile (col), Row on Desktop */}
          <div className={`flex flex-col gap-1 md:gap-4 mb-2 ${
            /* PC: If Even, Year Left/Title Right. If Odd, Title Left/Year Right */
            isEven ? 'md:flex-row md:justify-between md:items-start' : 'md:flex-row-reverse md:justify-between md:items-start'
            }`}>

            {/* 1. THE YEAR (Small label on mobile, Watermark on PC) */}
            <span className={`text-xl md:text-5xl font-display font-bold text-white/10 shrink-0 ${
              /* Mobile: Always align with text. PC: No change needed */
              isEven ? 'text-right md:text-left' : 'text-left md:text-right'
              }`}>
              {data.year}
            </span>

            {/* 2. THE TITLE */}
            <h3 className={`text-xs md:text-2xl font-bold text-accent break-words leading-tight ${isEven ? 'text-right' : 'text-left'
              }`}>
              {data.title}
            </h3>
          </div>

          {/* DESCRIPTION */}
          <p className={`text-gray-400 text-[10px] md:text-base leading-relaxed ${isEven ? 'text-right' : 'text-left'
            }`}>
            {data.description}
          </p>

        </div>
      </div>

      {/* --- CENTER DOT --- */}
      <div className="w-2/12 flex justify-center relative">
        <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-accent shadow-[0_0_15px_#fbbf24] z-10"></div>
      </div>

      {/* --- EMPTY SPACE --- */}
      <div className="w-5/12"></div>
    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 bg-primary relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">

        {/* The Vertical Line Background */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white/10 top-0"></div>

        {/* The Moving Line (Scroll Linked) */}
        <motion.div
          style={{ height }}
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent to-purple-600 top-0 shadow-[0_0_10px_#fbbf24] origin-top"
        ></motion.div>

        {/* Timeline Events */}
        <div className="relative z-10 pt-10">
          {TIMELINE_DATA.map((item, index) => (
            <TimelineNode key={index} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;