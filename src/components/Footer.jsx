import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // 1. Define your actual links here
  const socialLinks = [
    { Icon: Facebook, url: "https://www.facebook.com/Ecell.upcollege/" },
    { Icon: Twitter, url: "https://twitter.com" },
    { Icon: Instagram, url: "https://www.instagram.com/ecell_upcollege/" }, // Added https:// to ensure it works
    { Icon: Linkedin, url: "https://www.linkedin.com/company/e-cell-upcollege" },
    { Icon: Mail, url: "mailto:ecellupcollege@gmail.com" }
  ];

  return (
    <footer className="relative z-50 bg-primary-dark border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-white mb-4">E-Cell UPC</h2>
          <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
            Fostering the spirit of entrepreneurship and innovation. We are the architects of the future, helping students turn ideas into empires.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            {/* FIX: Loop over 'socialLinks', not the old array */}
            {socialLinks.map(({ Icon, url }, idx) => (
              <a 
                key={idx} 
                href={url}
                // Logic: New tab for websites, Same tab for Email
                target={url.startsWith('mailto') ? "_self" : "_blank"} 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-primary-dark transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Initiatives', path: '/initiatives' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'Blogs', path: '/blog' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="hover:text-accent transition-colors block"
                  onClick={() => window.scrollTo(0, 0)} // Ensures page starts at top
                >
                  {link.name}
                </Link>
              </li>
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