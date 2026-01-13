
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="relative z-50 bg-primary-dark border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* ... (Rest of your footer code remains exactly the same) ... */}

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-white mb-4">E-Cell UPC</h2>
          <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
            Fostering the spirit of entrepreneurship and innovation. We are the architects of the future, helping students turn ideas into empires.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            {['Events', 'Mentorship', 'Blog', 'Gallery', 'Sponsors'].map((item) => (
              <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Join Us</h3>
          <p className="text-gray-400 text-sm mb-4">Get the latest startup news and event updates.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
            />
            <button className="bg-accent text-primary-dark font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/5">
        &copy; {new Date().getFullYear()} E-Cell UPC.
      </div>
    </footer>
  );
};

export default Footer;