import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-primary-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
        >
          Our <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-orange-500">Legacy</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-gray-400 leading-relaxed"
        >
          From a small room in the Institution Inovation Council to the Top Universities and offices across nation. 
          Here is how E-Cell UPC became a movement.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;