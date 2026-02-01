import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Send, Zap, Heart, Star } from 'lucide-react';

const InitiativeCard = ({ data }) => {
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSent(true);
    // Simulate API call
    setTimeout(() => { setSent(false); setFeedback(""); }, 3000);
  };

  return (
    <div className="h-full overflow-y-auto pr-2 pb-16 md:pb-24 no-scrollbar flex flex-col">

      {/* --- 1. HEADER SECTION --- */}
      <div className="mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          {/* Category Label */}
          <span className={`self-start px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-${data.color.split('-')[1]}-400`}>
            Initiative
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            {data.title}
          </h2>
          <p className="text-base md:text-xl font-medium text-gray-400">
            {data.tagline}
          </p>
        </motion.div>

        {/* Headlines / Vibe Tags (Replacing Stats) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mt-3 md:mt-4"
        >
          {['Student Driven', 'Innovation', 'Growth'].map((tag, i) => (
            <span key={i} className="flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-300 text-[10px] md:text-xs font-medium">
              <Zap size={12} className="text-accent" /> {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* --- 2. MAIN BENTO GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 flex-grow">

        {/* LEFT COLUMN: Visuals & Actions (2/5 width) */}
        <motion.div
          className="lg:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* KEY PHOTO CONTAINER */}
          {/* Once you have real images, replace the inner div with an <img src={...} /> */}
          <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${data.color} p-[1px] shadow-2xl relative group overflow-hidden`}>
            <div className="w-full h-full bg-black/80 backdrop-blur-xl rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Abstract Background Decoration */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${data.color} opacity-20 group-hover:opacity-30 transition-opacity duration-700`}></div>

              {/* The Icon (Acting as the 'Photo' subject for now) */}
              <data.icon size={64} className="text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />

              {/* 'View Photo' Overlay Hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-bold tracking-widest uppercase border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                  View Gallery
                </span>
              </div>
            </div>
          </div>

          {/* KNOW MORE BUTTON */}
          <a
            href="#"
            className="group w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 transition-all flex items-center justify-between"
          >
            <div>
              <span className="block text-white font-bold">Explore Details</span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400">Read the full report & blog</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all">
              <ArrowUpRight size={20} />
            </div>
          </a>
        </motion.div>

        {/* RIGHT COLUMN: Description & Feedback (3/5 width) */}
        <motion.div
          className="lg:col-span-3 flex flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Description Text */}
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {data.description}
            </p>
            <p className="text-gray-400 text-base leading-relaxed mt-4">
              We believe in fostering a culture where ideas meet execution. This initiative serves as a bridge between academic learning and real-world application, providing students with the resources they need to succeed.
            </p>
          </div>

          {/* COMPACT FEEDBACK CAPSULE */}
          <div className="mt-auto">
            <div className="bg-black/20 border border-white/10 rounded-2xl p-1.5 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <MessageSquare size={18} className="text-accent" />
              </div>

              {sent ? (
                <div className="flex-grow px-3 text-green-400 text-sm font-medium animate-pulse">
                  Feedback sent! Thanks for sharing.
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="flex-grow flex items-center gap-2">
                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts on this..."
                    className="flex-grow bg-transparent border-none text-white text-sm focus:ring-0 placeholder:text-gray-600 h-10"
                  />
                  <button
                    type="submit"
                    disabled={!feedback.trim()}
                    className="p-2 rounded-lg bg-white/10 hover:bg-accent hover:text-black text-white disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white transition-all"
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default InitiativeCard;