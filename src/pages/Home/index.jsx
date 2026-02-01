import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Flame, Target, Globe, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const SparkVisual = () => (
  <div className="relative h-[350px] md:h-[500px] w-full bg-white/5 border border-white/10 rounded-t-full rounded-b-3xl backdrop-blur-sm overflow-hidden flex items-center justify-center">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[80px] animate-pulse" />
    <div className="relative z-10 text-center">
      <Flame size={80} className="mx-auto mb-6 text-accent animate-pulse" />
      <h3 className="text-2xl font-bold tracking-widest text-white uppercase md:text-3xl font-display">The Spark</h3>
      <div className="w-16 h-1 mx-auto mt-4 rounded-full bg-accent/50" />
    </div>
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent" />
  </div>
);

const BreathingStats = () => {
  const stats = [
    { label: "Ideas Incubated", value: "50+" },
    { label: "Valuation", value: "₹5L+" },
    { label: "Community", value: "10K+" },
    { label: "Years Legacy", value: "2+" },
  ];

  return (
    <div className="relative z-20 px-4 mb-16 -mt-12 md:px-6 md:mb-20 lg:mb-32 md:-mt-16 lg:-mt-24">
      <div className="max-w-6xl p-4 mx-auto border shadow-2xl md:p-6 lg:p-10 bg-white/5 backdrop-blur-xl border-white/10 rounded-xl md:rounded-2xl">
        {/* Grid: 2 cols on mobile, 4 cols (single line) on desktop */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-8 md:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="px-2 text-center md:px-4 group">
              <motion.h3
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                className="mb-1 text-xl font-bold text-white transition-colors md:text-3xl lg:text-5xl font-display group-hover:text-accent"
              >
                {stat.value}
              </motion.h3>
              <p className="text-[9px] md:text-[10px] lg:text-xs font-bold tracking-widest text-gray-400 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative group"
  >
    <div className="absolute inset-0 transition-all duration-500 opacity-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-xl group-hover:opacity-100 group-active:opacity-100" />
    <div className="relative h-full p-6 overflow-hidden transition-all duration-300 border md:p-8 rounded-xl bg-primary-dark/60 border-white/10 backdrop-blur-md md:group-hover:-translate-y-2 active:scale-95">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 mb-6 border rounded-lg bg-white/5 border-white/5 group-hover:border-accent/30">
          <Icon className="text-white group-hover:text-accent" size={24} />
        </div>
        <h3 className="flex items-center gap-2 mb-3 text-xl font-bold text-white">
          {title}
          <ArrowRight size={16} className="transition-all -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-accent" />
        </h3>
        <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">
          {desc}
        </p>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const rawY = useTransform(scrollY, [0, 1000], [0, 150]);
  const yBg = useSpring(rawY, springConfig);

  return (
    <div className="relative min-h-screen bg-primary-dark">
      {/* 1. PARALLAX BACKGROUND FIX */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: yBg }}
          className="absolute top-0 left-0 w-full h-[120%]"
        >
          <img
            src="assets/upc.webp"
            alt="Campus"
            className="w-full h-full object-cover opacity-25 blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/20 via-primary-dark/40 to-primary-dark" />
        </motion.div>
      </div>

      {/* 2. HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-5 pb-24 text-center md:px-6 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="flex items-center justify-center gap-2 mb-4 md:gap-3 md:mb-6">
            <span className="h-[1px] w-4 md:w-6 lg:w-10 bg-accent/50" />
            <span className="text-xs font-bold md:text-sm lg:text-md text-accent">उद्यमेन हि सिध्यन्ति लक्ष्यम्।</span>
            <span className="h-[1px] w-4 md:w-6 lg:w-10 bg-accent/50" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-display font-bold text-white mb-4 md:mb-6 lg:mb-8 tracking-tighter leading-[0.9]">
            IGNITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-red-500">
              THE SPARK
            </span>
          </h1>

          <p className="max-w-2xl px-4 mx-auto mb-8 text-sm font-light leading-relaxed text-gray-400 md:mb-10 md:text-base lg:text-xl">
            Where the curious minds of the holy city meet the relentless ambition of the future.
            We are the <span className="font-bold text-white">architects of the new era.</span>
          </p>

          <Link to="/about">
            <button className="relative px-6 py-3 overflow-hidden text-sm font-bold transition-transform duration-300 bg-white rounded-full md:px-8 md:py-4 text-primary-dark group hover:scale-105 active:scale-95 md:text-base">
              <span className="relative z-10 flex items-center gap-2">
                Discover the Culture <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-accent group-hover:scale-x-100" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute flex flex-col items-center gap-2 -translate-x-1/2 bottom-8 md:bottom-10 left-1/2 text-white/30"
        >
          <span className="text-[8px] md:text-[10px] uppercase tracking-widest whitespace-nowrap">Scroll to Explore</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      <BreathingStats />

      {/* 4. PHILOSOPHY */}
      <section className="relative z-10 px-6 py-20 md:py-32">
        <div className="grid items-center grid-cols-1 gap-12 mx-auto md:gap-20 max-w-7xl lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent">The Foundation</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl font-display">
              Built on the <br /> <span className="text-accent">Ghats of Innovation</span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 md:text-lg">
              Varanasi is not just a city; it is a continuity. Today, we channel that timeless resilience into modern entrepreneurship. At E-Cell UPC, we believe that every great venture starts with a spark-an idea nurtured by passion and perseverance. Our mission is to ignite that spark within students, empowering them to transform their visions into impactful realities.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <SparkVisual />
          </div>
        </div>
      </section>

      {/* 5. ECOSYSTEM */}
      <section className="relative z-10 py-20 border-t md:py-32 bg-primary-dark/80 backdrop-blur-xl border-white/5">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl font-display">The Ecosystem</h2>
            <p className="text-gray-400">Everything you need to build the future.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard title="Incubation" desc="State-of-the-art labs for early-stage teams." icon={Globe} color="from-blue-500/20 to-purple-500/20" delay={0.1} />
            <FeatureCard title="Mentorship" desc="Access to 50+ alumni founders and titans." icon={Target} color="from-emerald-500/20 to-teal-500/20" delay={0.2} />
            <FeatureCard title="Seed Funding" desc="Micro-grants to fuel your first sprint." icon={Zap} color="from-orange-500/20 to-red-500/20" delay={0.3} />
            <FeatureCard title="Network" desc="Partnerships with nation-wide accelerators." icon={Activity} color="from-pink-500/20 to-rose-500/20" delay={0.4} />
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <section className="relative z-20 flex flex-col items-center justify-center py-24 border-t bg-primary-dark border-white/5">
        <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl font-display">Begin Your Journey</h2>
        <Link to="/initiatives">
          <button className="px-10 py-5 text-lg font-bold transition-all shadow-lg bg-gradient-to-r from-accent to-orange-600 text-primary-dark rounded-xl hover:scale-105 active:scale-95 shadow-orange-500/20">
            Join the Movement
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;