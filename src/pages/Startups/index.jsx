// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Clock } from 'lucide-react';

const Startups = () => {
    return (
        <div className="flex items-center justify-center min-h-screen px-6 bg-primary-dark">
            <div className="max-w-4xl mx-auto text-center">
                {/* Animated Background Blob */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-accent/20 blur-3xl"
                    />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    {/* Icon */}
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-block mb-8"
                    >
                        <div className="relative">
                            <Rocket size={80} className="text-accent" />
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="absolute -top-2 -right-2"
                            >
                                <Sparkles size={24} className="text-yellow-400" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl font-display">
                        Startups <span className="text-accent">Hub</span>
                    </h1>

                    {/* Coming Soon Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 font-bold border rounded-full bg-accent/10 border-accent/20 text-accent">
                        <Clock size={20} />
                        <span>Coming Soon</span>
                    </div>

                    {/* Description */}
                    <p className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-gray-400">
                        We're building something extraordinary. A platform to showcase innovative startups
                        incubated at E-Cell UPC. Stay tuned for the launch!
                    </p>

                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-4">
                        <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent"></span>
                        <span className="text-accent">•</span>
                        <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent"></span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Startups;
