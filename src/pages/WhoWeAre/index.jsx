import { Target, Lightbulb, Users, TrendingUp, Award, Heart } from 'lucide-react';

const WhoWeAre = () => {
    const values = [
        {
            icon: Lightbulb,
            title: 'Innovation First',
            description: 'We believe in pushing boundaries and encouraging unconventional thinking.'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Building a network of passionate entrepreneurs supporting each other.'
        },
        {
            icon: Heart,
            title: 'Student Centric',
            description: 'Every initiative is designed keeping student needs and aspirations at the core.'
        },
        {
            icon: TrendingUp,
            title: 'Growth Mindset',
            description: 'Continuous learning and adaptation is our way forward.'
        }
    ];

    return (
        <div className="min-h-screen bg-primary-dark pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 mb-6 rounded-full bg-accent/10 border border-accent/20"
                    >
                        <span className="text-accent text-sm font-bold uppercase tracking-wider">Our Story</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
                    >
                        Who <span className="text-accent">We Are</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        We are the Entrepreneurship Cell of Udai Pratap College, a student-run organization
                        committed to fostering the spirit of entrepreneurship among the youth of Varanasi.
                    </motion.p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="text-accent" size={32} />
                            <h2 className="text-3xl font-display font-bold text-white">Our Mission</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            To create a thriving ecosystem where students can transform their innovative ideas
                            into successful startups. We aim to bridge the gap between academic knowledge and
                            real-world entrepreneurship by providing mentorship, resources, and a supportive community.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="text-accent" size={32} />
                            <h2 className="text-3xl font-display font-bold text-white">Our Vision</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            To establish E-Cell UPC as the leading entrepreneurship hub in Eastern India,
                            producing job creators rather than job seekers. We envision a future where
                            every student has the confidence and resources to pursue their entrepreneurial dreams.
                        </p>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div className="mb-20">
                    <h2 className="text-4xl font-display font-bold text-white text-center mb-12">
                        Our <span className="text-accent">Core Values</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
                            >
                                <div className="mb-4 p-3 rounded-lg bg-accent/10 w-fit group-hover:bg-accent/20 transition-colors">
                                    <value.icon className="text-accent" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Journey Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-accent/10 to-purple-600/10 border border-white/10"
                >
                    <h2 className="text-4xl font-display font-bold text-white mb-6">Our Journey</h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            Founded in 2023 under the Institution Innovation Council (IIC), E-Cell UPC began
                            with a simple vision: to ignite the entrepreneurial spirit among students of
                            Udai Pratap College.
                        </p>
                        <p>
                            What started as a small initiative has now grown into a vibrant community of
                            innovators, dreamers, and doers. We've hosted flagship events like Eureka!,
                            facilitated mentorship sessions with industry leaders, and helped numerous students
                            take their first steps into the world of entrepreneurship.
                        </p>
                        <p>
                            Today, we stand proud as a student-run organization that has impacted thousands of
                            lives, incubated promising startups, and created a lasting legacy of innovation at
                            our college.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WhoWeAre;
