import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, ArrowUpRight, X } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../../data/MockData';

// --- 1. SUB-COMPONENT: MINIMAL HERO ---
// "Something Less": No big images, just bold typography and negative space.
const BlogHero = () => (
  <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-white/10 pb-12"
    >
      <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Journal</span>
      <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6">
        Insights
      </h1>
      <p className="text-gray-400 text-xl font-light max-w-2xl">
        Curated thoughts on technology, strategy, and the future of building.
      </p>
    </motion.div>
  </section>
);

// --- 2. SUB-COMPONENT: ZEN CARD ---
// "Something Less": Removed author faces, dates, and excerpts. Just the visual & title.
const BlogCard = ({ post, onClick }) => {
  const isLarge = post.size === 'large';
  
  // FIX: Added 'md:' prefix. 
  // On mobile (default), everything is row-span-1 col-span-1.
  // On desktop (md:), we apply the complex spans.
  const spanClass = isLarge 
    ? 'col-span-1 row-span-1 md:col-span-2 md:row-span-2' 
    : 'col-span-1 row-span-1';

  return (
    // ... rest of component
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onClick(post)}
      className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/5 cursor-pointer ${spanClass}`}
    >
      {/* Image Background */}
      <div className="absolute inset-0">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/20 to-transparent"></div>
      </div>

      {/* Minimal Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70 border border-white/10 rounded-full backdrop-blur-md">
            {post.category}
          </span>
          <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div>
          <h3 className={`font-display font-bold text-white leading-tight group-hover:text-accent transition-colors ${isLarge ? 'text-3xl' : 'text-xl'}`}>
            {post.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. SUB-COMPONENT: THE READER (Detail View) ---
// "Something Less": No sidebars. Just a centered column of text.
const BlogReader = ({ post, onClose }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll to top when opening
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[60] bg-primary-dark overflow-y-auto"
    >
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left" style={{ scaleX }} />

      {/* Close Button Navigation */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-gradient-to-b from-primary-dark to-transparent">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft size={16} /> <span className="text-sm font-medium">Back to Journal</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="pt-32 pb-12 px-6 max-w-3xl mx-auto text-center">
        <span className="text-accent text-xs font-bold tracking-widest uppercase mb-4 block">{post.category}</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <span>{post.author.name}</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
        </div>
      </div>

      {/* Feature Image */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <img src={post.image} alt={post.title} className="w-full h-[50vh] object-cover rounded-3xl border border-white/10" />
      </div>

      {/* Article Content (Distraction Free) */}
      <article className="max-w-2xl mx-auto px-6 pb-32 prose prose-lg prose-invert">
        <p className="text-xl text-gray-300 leading-relaxed font-light mb-10 border-l-2 border-accent pl-6">
          {post.excerpt}
        </p>
        <div 
          className="text-gray-300 font-light leading-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6 [&>blockquote]:text-xl [&>blockquote]:italic [&>blockquote]:text-accent/80 [&>blockquote]:text-center [&>blockquote]:my-12"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        {/* Dummy Content for Scroll Demo */}
        <div className="space-y-6 mt-6 text-gray-400 font-light">
           <p>Creating a startup is not just about the idea; it is about the execution. In the ecosystem of IIT Bombay, we have seen hundreds of ideas. The ones that survive are the ones that adapt.</p>
           <h2>The Pivot Point</h2>
           <p>There comes a time in every founder's journey where they must choose between their original vision and the market reality. This is the pivot point.</p>
           <blockquote>"Fall in love with the problem, not the solution."</blockquote>
           <p>This philosophy has guided our most successful alumni. By focusing on the user pain point, they were able to navigate through technical challenges and market downturns.</p>
        </div>
      </article>

    </motion.div>
  );
};

// --- 4. MAIN CONTROLLER ---
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-primary-dark">
      
      {/* State-Based View Switching */}
      <AnimatePresence>
        {selectedPost ? (
          <BlogReader key="reader" post={selectedPost} onClose={() => setSelectedPost(null)} />
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BlogHero />

            {/* Clean Filter Bar */}
            <div className="max-w-7xl mx-auto px-6 mb-12 flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm transition-colors whitespace-nowrap ${
                    activeCategory === cat ? 'text-accent font-bold' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* The Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
                <AnimatePresence>
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blog;