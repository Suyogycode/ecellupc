import { FileText, CheckCircle, Rocket, Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { GROW_RESUME_OPPORTUNITIES, GROW_RESUME_BENEFITS } from '../../data/MockData';

const GrowYourResume = () => {

    return (
        <div className="min-h-screen px-6 pb-20 bg-primary-dark pt-28">
            <div className="mx-auto max-w-7xl">
                {/* Hero Section */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 mb-6 border rounded-full bg-accent/10 border-accent/20"
                    >
                        <span className="text-sm font-bold tracking-wider uppercase text-accent">Career Growth</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 text-5xl font-bold text-white md:text-7xl font-display"
                    >
                        Grow Your <span className="text-accent">Resume</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-400"
                    >
                        Stand out from the crowd. Gain real-world experience, build your network,
                        and add impressive credentials to your resume through E-Cell UPC initiatives.
                    </motion.p>
                </div>

                {/* Opportunities Grid */}
                <div className="mb-20">
                    <h2 className="mb-12 text-4xl font-bold text-center text-white font-display">
                        Available <span className="text-accent">Opportunities</span>
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {GROW_RESUME_OPPORTUNITIES.map((opportunity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 transition-all border group rounded-2xl bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-accent/30"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0 p-3 transition-colors rounded-lg bg-accent/10 group-hover:bg-accent/20">
                                        <opportunity.icon className="text-accent" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-2xl font-bold text-white">{opportunity.title}</h3>
                                        <p className="text-gray-400">{opportunity.description}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="mb-2 text-sm font-bold text-accent">What You'll Get:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {opportunity.perks.map((perk, i) => (
                                            <span key={i} className="px-3 py-1 text-xs text-gray-300 border rounded-full bg-white/5 border-white/10">
                                                {perk}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link to={opportunity.link}>
                                    <button className="flex items-center gap-2 font-bold transition-all text-accent hover:gap-3">
                                        Learn More <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="grid gap-8 mb-20 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border rounded-2xl bg-gradient-to-br from-purple-600/10 to-accent/10 border-white/10"
                    >
                        <h3 className="mb-6 text-3xl font-bold text-white font-display">Why Participate?</h3>
                        <div className="space-y-3">
                            {GROW_RESUME_BENEFITS.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 mt-1 text-accent" size={20} />
                                    <span className="text-gray-300">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center p-8 border rounded-2xl bg-white/5 border-white/10"
                    >
                        <Calendar className="mb-4 text-accent" size={48} />
                        <h3 className="mb-4 text-3xl font-bold text-white font-display">How to Get Started?</h3>
                        <p className="mb-6 leading-relaxed text-gray-400">
                            Getting involved is easy! Simply reach out to us through our contact form or
                            join our community on social media. We'll guide you through the available
                            opportunities and help you find the perfect fit for your interests and goals.
                        </p>
                        <Link to="/contact">
                            <button className="flex items-center justify-center w-full gap-2 px-6 py-4 font-bold transition-transform rounded-xl bg-accent text-primary-dark hover:scale-105">
                                Get in Touch <ArrowRight size={20} />
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-12 text-center border rounded-2xl bg-gradient-to-r from-accent/20 to-orange-500/20 border-accent/20"
                >
                    <h2 className="mb-4 text-4xl font-bold text-white font-display">
                        Ready to Level Up?
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                        Don't let opportunities pass you by. Start building your impressive resume today
                        with E-Cell UPC!
                    </p>
                    <Link to="/initiatives">
                        <button className="px-8 py-4 text-lg font-bold transition-transform rounded-xl bg-accent text-primary-dark hover:scale-105">
                            Explore All Initiatives
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default GrowYourResume;
