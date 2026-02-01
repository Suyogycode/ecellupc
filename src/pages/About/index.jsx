import AboutHero from './AboutHero';
import Timeline from './Timeline';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Award } from 'lucide-react';
import { ABOUT_VALUES } from '../../data/MockData';

const About = () => {

  return (
    <div className="bg-primary-dark min-h-screen">
      <AboutHero />
      <Timeline />

      {/* Who We Are Section */}
      <section id="who-we-are" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-accent text-sm font-bold uppercase tracking-wider">Our Story</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Who <span className="text-accent">We Are</span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We are the Entrepreneurship Cell of Udai Pratap College, a student-run organization
              committed to fostering the spirit of entrepreneurship among the youth of Varanasi.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-accent" size={32} />
                <h3 className="text-3xl font-display font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                To create a thriving ecosystem where students can transform their innovative ideas
                into successful startups. We aim to bridge the gap between academic knowledge and
                real-world entrepreneurship by providing mentorship, resources, and a supportive community.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-accent" size={32} />
                <h3 className="text-3xl font-display font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                To establish E-Cell UPC as the leading entrepreneurship hub in Eastern India,
                producing job creators rather than job seekers. We envision a future where
                every student has the confidence and resources to pursue their entrepreneurial dreams.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-12">
              Our <span className="text-accent">Core Values</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ABOUT_VALUES.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
                >
                  <div className="mb-4 p-3 rounded-lg bg-accent/10 w-fit group-hover:bg-accent/20 transition-colors">
                    <value.icon className="text-accent" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Section */}
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-accent/10 to-purple-600/10 border border-white/10">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Our Journey</h3>
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
          </div>
        </div>
      </section>

      {/* Call to Action for Teams Page */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Meet the <span className="text-accent">Team</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our dedicated team of innovators working tirelessly to create an impact.
          </p>
          <Link to="/team">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-primary-dark font-bold hover:scale-105 transition-transform">
              View Our Team <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      <div className="h-20 bg-primary-dark"></div>
    </div>
  );
};

export default About;