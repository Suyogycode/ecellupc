import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Flame, Target, Globe, Zap, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. THE "SPARK" VISUAL (Abstract, Non-Religious) ---
const SparkVisual = () => {
  return (
    <div className="relative h-[500px] w-full bg-white/5 border border-white/10 rounded-t-full rounded-b-3xl backdrop-blur-sm overflow-hidden flex items-center justify-center">
      {/* A glowing orb representing the "Diya" or "Spirit" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[80px] animate-pulse"></div>
      
      <div className="relative z-10 text-center">
         <Flame size={80} className="text-accent mx-auto mb-6 animate-pulse" />
         <h3 className="text-3xl font-display font-bold text-white tracking-widest uppercase">The Spark</h3>
         <div className="w-16 h-1 bg-accent/50 mx-auto mt-4 rounded-full"></div>
      </div>
      
      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent"></div>
    </div>
  );
};

// --- 2. BREATHING STATS (Elegant & Static) ---
const BreathingStats = () => {
  const stats = [
    { label: "Startups Ideas Incubated", value: "50+" },
    { label: "Valuation Raised", value: "₹5lac+" },
    { label: "Community Strength", value: "10K+" },
    { label: "Years Legacy", value: "2+" },
  ];

  return (
    <div className="relative z-20 -mt-20 mb-32 px-6">
      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center px-4 group">
              <motion.h3 
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                className="text-4xl md:text-5xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors"
              >
                {stat.value}
              </motion.h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. ALIVE ECOSYSTEM CARDS (Holographic) ---
const FeatureCard = ({ title, desc, icon: Icon, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative h-full"
    >
      {/* 1. GLOW EFFECT: Added 'group-active:opacity-100' so it glows when touched */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-hover:blur-2xl"></div>
      
      {/* 2. CARD MOVEMENT: Added 'active:scale-95' for a tactile 'Press' effect */}
      <div className="relative h-full p-8 rounded-xl bg-primary-dark/60 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 
        md:group-hover:border-white/30 md:group-hover:-translate-y-2 
        active:scale-95 active:border-white/30"
      >
        {/* 3. COLOR OVERLAY: Added 'group-active:opacity-10' */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 group-active:opacity-10 transition-opacity duration-500`}></div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 transition-transform duration-300 border border-white/5 group-hover:border-accent/30 group-hover:scale-110 group-active:scale-110">
            <Icon className="text-white group-hover:text-accent group-active:text-accent transition-colors" size={24} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            {title} 
            {/* Arrow appears on touch (active) or hover */}
            <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-active:translate-x-0 group-active:opacity-100 transition-all text-accent" />
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 group-active:text-gray-300 transition-colors">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ASSEMBLER ---
const Home = () => {
  const { scrollY } = useScroll();
  // Parallax effect: Background moves slower than foreground
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="relative min-h-screen bg-primary-dark/80 overflow-hidden">
      
      {/* 1. FIXED PARALLAX BACKGROUND LAYER */}
      <motion.div 
        style={{ y: yBg }}
        className="fixed inset-0 z-0 w-full h-full"
      >
        <img 
          src="https://content.jdmagicbox.com/comp/varanasi/28/0542p542std1402828/catalogue/uday-pratap-college-bhojpur-varanasi-colleges-2zobq4h.jpg" 
          alt="Campus Background" 
          className="w-full h-full object-cover opacity-30 blur-[2px] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/50 via-primary-dark/80 to-primary-dark"></div>
      </motion.div>

      {/* 2. HERO SECTION (The Heritage Vibe) */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-accent/50"></div>
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold">Innovation • Varanasi</span>
            <div className="h-[1px] w-12 bg-accent/50"></div>
          </div>

    {/*      <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.9]">  */}
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.9]">
            IGNITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-red-500 drop-shadow-2xl filter">
              THE SPARK
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Where the curious minds of the holy city meets the relentless ambition of the future. 
            We are the <span className="text-white font-bold">architects of the new era.</span>
          </p>

          <Link to="/about">
            <button className="relative px-8 py-4 bg-white text-primary-dark font-bold rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300">
              <span className="relative z-10 flex items-center gap-2">
                Discover the Culture <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </Link>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
        </motion.div>
      </section>

      {/* 3. BREATHING STATS (Floating Over Hero) */}
      <BreathingStats />

      {/* 4. PHILOSOPHY SECTION (Abstract Spark) */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
               <span className="h-[1px] w-12 bg-accent"></span>
               <span className="text-accent uppercase tracking-widest text-sm font-bold">The Foundation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Built on the <br /> <span className="text-accent">Ghats of Innovation</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Varanasi is not just a city; it is a continuity. For thousands of years, it has been the center of knowledge. 
              Today, we channel that timeless resilience into modern entrepreneurship.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We don't just build startups; we forge legacies. Our entrepreneurs carry the spirit of the holy city—unyielding, flowing, and enlightening.
            </p>
          </div>

          {/* Right: The Abstract Spark Visual */}
          <div className="order-1 lg:order-2">
            <SparkVisual />
          </div>

        </div>
      </section>

      {/* 5. ECOSYSTEM GRID (Alive & Holographic) */}
      <section className="relative z-10 py-32 bg-primary-dark/80 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">The Ecosystem</h2>
            <p className="text-gray-400">Everything you need to build the future.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              title="Incubation" 
              desc="State-of-the-art labs and co-working spaces for early-stage teams."
              icon={Globe}
              color="from-blue-500/20 to-purple-500/20"
              delay={0.1}
            />
            <FeatureCard 
              title="Mentorship" 
              desc="Direct access to 50+ alumni founders and industry titans."
              icon={Target}
              color="from-emerald-500/20 to-teal-500/20"
              delay={0.2}
            />
            <FeatureCard 
              title="Seed Funding" 
              desc="Micro-grants and investor connections to fuel your first sprint."
              icon={Zap}
              color="from-orange-500/20 to-red-500/20"
              delay={0.3}
            />
            <FeatureCard 
              title="Network" 
              desc="Partnerships with universities and accelerators nation wide."
              icon={Activity}
              color="from-pink-500/20 to-rose-500/20"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* 6. FOOTER SAFE ZONE (Fix for Overlap) */}
      <section className="relative z-20 py-32 bg-primary-dark flex flex-col items-center justify-center border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <h2 className="text-4xl font-display font-bold text-white mb-8">Begin Your Journey</h2>
        <Link to="/initiatives">
          <button className="px-10 py-5 bg-gradient-to-r from-accent to-orange-600 text-primary-dark font-bold text-lg rounded-xl shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all">
            Join the Movement
          </button>
        </Link>
      </section>

    </div>
  );
};

export default Home;