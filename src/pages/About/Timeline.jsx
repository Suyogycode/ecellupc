import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_DATA } from '../../data/MockData';

const TimelineNode = ({ data, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex items-center justify-between mb-24 w-full ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Content Side */}
      <div className="w-5/12">
        <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/30 transition-colors ${
           index % 2 === 0 ? 'text-right' : 'text-left'
        }`}>
          <span className="text-5xl font-display font-bold text-white/10 absolute top-0 right-35 z-0">
            {data.year}
          </span>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-accent mb-2">{data.title}</h3>
            <p className="text-gray-400">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Center Dot */}
      <div className="w-2/12 flex justify-center relative">
        <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_#fbbf24] z-10"></div>
      </div>

      {/* Empty Space for Balance */}
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
    <section ref={containerRef} className="py-20 bg-primary relative">
      <div className="max-w-5xl mx-auto px-6 relative">
        
        {/* The Vertical Line Background */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white/10 top-0"></div>
        
        {/* The Moving Line (Scroll Linked) */}
        <motion.div 
          style={{ height }}
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-linear-to-b from-accent to-purple-600 top-0 shadow-[0_0_10px_#fbbf24] origin-top"
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