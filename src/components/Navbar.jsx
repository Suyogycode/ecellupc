import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, ChevronDown, Users, Calendar, Briefcase, BookOpen, Award, Zap } from 'lucide-react';
import { NAV_LINKS } from '../data/MockData';
import { AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (activeDropdown === 'Blogs' && blogPosts.length === 0) {
      const RSS_URL = "https://ecellupc.blogspot.com/feeds/posts/default?alt=rss";
      const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}`;

      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'ok' && data.items) {
            setBlogPosts(data.items.slice(0, 2));
          }
        })
        .catch(err => {
          console.error("Error fetching blogs:", err);
        });
    }
  }, [activeDropdown, blogPosts.length]);

  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 160);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. This prevents the navbar 'jump' by keeping the height occupied */}
      {scrolled && <div className="h-[68px] w-full" />}

      <nav
        className={`left-0 w-full z-50 transition-colors duration-300 ${scrolled
          ? 'fixed top-0 bg-primary/80 backdrop-blur-md shadow-md py-5'
          : 'relative bg-primary/50 backdrop-blur-md py-5'
          }`}
      >
        <div className="flex items-center justify-center mx-auto max-w-7xl">
          {/* Desktop Links */}
          <div className="items-center hidden gap-8 md:flex">
            <Link to='/'>
              <Home
                fill={location.pathname === '/' ? 'yellow' : 'gray'}
                className="text-transparent transition-colors duration-200"
                size={20}
              />
            </Link>

            {NAV_LINKS.map((link) => (
              link.name === 'About Us' ||
                link.name === 'Initiatives' ||
                link.name === 'Blogs' ? (
                <div
                  key={link.name}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent cursor-pointer ${location.pathname === link.path ? 'text-accent' : 'text-gray-300'
                    }`}
                >
                  <div
                    className='relative group'
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className='flex items-center gap-1'>{link.name} <ChevronDown size={14} /></span>
                    <div>
                      {/* Professional Dropdown Content */}
                      <div className={`absolute mt-4 rounded-2xl shadow-2xl bg-primary-dark border border-white/10 min-w-[280px] overflow-hidden transition-all duration-300 ${activeDropdown === link.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                        }`}>
                        {link.name === 'About Us' && (
                          <div className='p-6 space-y-4'>
                            <Link
                              to="/about#who-we-are"
                              className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-white/5 group/item"
                            >
                              <div className="p-2 transition-colors rounded-lg bg-white/5 group-hover/item:bg-accent/20">
                                <Users size={18} className="text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-bold text-white">Who We Are</div>
                                <div className="text-xs text-gray-400">Our story & mission</div>
                              </div>
                            </Link>
                            <Link
                              to="/team"
                              className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-white/5 group/item"
                            >
                              <div className="p-2 transition-colors rounded-lg bg-white/5 group-hover/item:bg-accent/20">
                                <Award size={18} className="text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-bold text-white">Our Team</div>
                                <div className="text-xs text-gray-400">Meet the minds</div>
                              </div>
                            </Link>
                          </div>
                        )}
                        {link.name === 'Initiatives' && (
                          <div className='p-6 space-y-4'>
                            <Link
                              to="/initiatives"
                              className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-white/5 group/item"
                            >
                              <div className="p-2 transition-colors rounded-lg bg-white/5 group-hover/item:bg-accent/20">
                                <Calendar size={18} className="text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-bold text-white">All Initiatives</div>
                                <div className="text-xs text-gray-400">View all programs</div>
                              </div>
                            </Link>
                            <Link
                              to="/grow-your-resume"
                              className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-white/5 group/item"
                            >
                              <div className="p-2 transition-colors rounded-lg bg-white/5 group-hover/item:bg-accent/20">
                                <Briefcase size={18} className="text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-bold text-white">Grow Your Resume</div>
                                <div className="text-xs text-gray-400">Career opportunities</div>
                              </div>
                            </Link>
                            <Link
                              to="/initiatives#eureka"
                              className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-white/5 group/item"
                            >
                              <div className="p-2 transition-colors rounded-lg bg-white/5 group-hover/item:bg-accent/20">
                                <Zap size={18} className="text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-bold text-white">Eureka!</div>
                                <div className="text-xs text-gray-400">Business competition</div>
                              </div>
                            </Link>
                            <Link
                              to="/initiatives#campus-ambassador"
                              className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-white/5 group/item"
                            >
                              <div className="p-2 transition-colors rounded-lg bg-white/5 group-hover/item:bg-accent/20">
                                <Briefcase size={18} className="text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-bold text-white">Campus Ambassador</div>
                                <div className="text-xs text-gray-400">Leadership program</div>
                              </div>
                            </Link>
                          </div>
                        )}
                        {link.name === 'Blogs' && (
                          <div className='p-6 space-y-3 min-w-[500px]'>
                            {blogPosts.length > 0 ? (
                              <>
                                {/* Blog List */}
                                <div className="mb-4 space-y-3">
                                  {blogPosts.map((post, idx) => (
                                    <Link
                                      key={idx}
                                      to={`/blog?id=${encodeURIComponent(post.link)}`}
                                      className="block p-3 transition-all rounded-lg hover:bg-white/5 group"
                                    >
                                      <h4 className="mb-1 text-sm font-bold text-white transition-colors group-hover:text-accent line-clamp-1">
                                        {stripHtml(post.title)}
                                      </h4>
                                      <p className="mb-2 text-xs text-gray-400 line-clamp-2">
                                        {stripHtml(post.description || post.content || 'No description available')}...
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {new Date(post.pubDate).toLocaleDateString()}
                                      </p>
                                    </Link>
                                  ))}
                                </div>

                                {/* View All Button */}
                                <Link
                                  to="/blog"
                                  className="flex items-center justify-between p-3 pt-4 transition-colors border-t rounded-xl hover:bg-white/5 group/item border-white/10"
                                >
                                  <span className="text-sm font-bold text-white">View All Blogs</span>
                                  <ChevronDown size={16} className="text-accent rotate-[-90deg]" />
                                </Link>
                              </>
                            ) : (
                              <div className="py-8 text-center">
                                <p className="text-gray-400">No blogs available</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-gray-300'
                    }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute left-0 w-full overflow-hidden border-b bg-primary-dark/95 backdrop-blur-md border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-4 p-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-300 hover:text-accent"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;