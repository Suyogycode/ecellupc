import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader, ArrowRight, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchParams] = useSearchParams();

  const RSS_URL = "https://ecellupc.blogspot.com/feeds/posts/default?alt=rss";
  const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}`;

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok' && data.items) {
          setPosts(data.items);

          // Check if a specific blog is requested via query parameter
          const blogId = searchParams.get('id');
          if (blogId) {
            const post = data.items.find(item => item.link === decodeURIComponent(blogId));
            if (post) {
              setSelectedPost(post);
            }
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, [searchParams]);

  // --- HELPER 1: CLEAN AUTHOR NAME ---
  const getAuthorName = (author) => {
    if (!author || author.includes('noreply@blogger.com')) {
      return "E-Cell Team";
    }
    return author;
  };

  // --- HELPER 2: STRIP HTML ---
  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // --- HELPER 3: SMART THUMBNAIL FINDER ---
  const getHighResImage = (post) => {
    let img = post.thumbnail;

    // 1. Hunt for <img> tag in content
    if (!img) {
      const match = post.content.match(/<img[^>]+src="([^">]+)"/);
      if (match) img = match[1];
    }

    // 2. Hunt for YouTube Thumbnail
    if (!img) {
      const ytMatch = post.content.match(/src="[^"]*youtube\.com\/embed\/([^"?]+)/);
      if (ytMatch && ytMatch[1]) {
        return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;
      }
    }

    // 3. Fallback Image (Generic Tech/Startup)
    if (!img) return "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80";

    // 4. Force High Res for Blogger Images
    return img.replace(/\/s[0-9]+.*?\//, "/s1600/")
      .replace(/\/w[0-9]+-h[0-9]+.*?\//, "/s1600/");
  };

  // --- HELPER 4: REMOVE DUPLICATE MEDIA (But Keep Videos!) ---
  const cleanContent = (html) => {
    // This removes ONLY the first image (which we show as the header).
    // It purposefully ignores iframes/videos so they stay in the body.
    let cleaned = html.replace(/<img[^>]*>/, '');
    return cleaned;
  };

  // --- READER MODE ---
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-primary-dark pt-28 pb-20 px-6">
        {/* CSS Fixes for Blogger Native Videos */}
        <style>{`
          .blog-content p { margin-bottom: 1.5rem; line-height: 1.8; color: #d1d5db; font-size: 1.125rem; }
          .blog-content h1, .blog-content h2, .blog-content h3 { color: white; margin-top: 2.5rem; margin-bottom: 1.5rem; font-weight: 700; line-height: 1.3; }
          .blog-content h2 { font-size: 1.8rem; }
          .blog-content a { color: #fbbf24; text-decoration: underline; text-underline-offset: 4px; }
          
          /* IMAGES */
          .blog-content img { border-radius: 12px; margin: 2rem 0; width: 100%; height: auto; border: 1px solid rgba(255,255,255,0.1); }
          
          /* UNIVERSAL VIDEO FIX (Blogger + YouTube) */
          .blog-content iframe, 
          .blog-content video, 
          .blog-content embed, 
          .blog-content object { 
            width: 100% !important; 
            aspect-ratio: 16/9; 
            min-height: 300px; /* Force visibility even if aspect-ratio fails */
            border-radius: 12px; 
            margin: 2rem 0; 
            border: 1px solid rgba(255,255,255,0.1);
            display: block;
            background-color: #000; /* Shows black box if video loads slowly */
          }

          /* Handle specific Blogger video containers */
          .blog-content .separator { display: block !important; margin: 0 !important; }
          
          .blog-content ul, .blog-content ol { padding-left: 1.5rem; color: #d1d5db; margin-bottom: 1.5rem; }
          .blog-content li { margin-bottom: 0.5rem; }
          
          /* Override hardcoded Blogspot colors */
          .blog-content span, .blog-content div, .blog-content table { background-color: transparent !important; color: inherit !important; font-family: inherit !important; border: none !important; }
        `}</style>

        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Back to Stories</span>
          </button>

          {/* Article Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-6">
              Official Blog
            </span>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-accent" />
                  {new Date(selectedPost.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-2">
                  <User size={16} className="text-accent" />
                  {getAuthorName(selectedPost.author)}
                </span>
              </div>
            </div>

            {/* Featured Image Header */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl bg-black/40 relative">
              <img
                src={getHighResImage(selectedPost)}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* THE CONTENT */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: cleanContent(selectedPost.content) }}
            />

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 italic">
                Did you enjoy this read?
              </p>
              <a
                href={selectedPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all hover:scale-105"
              >
                View original on Blogspot <ExternalLink size={16} />
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div className="min-h-screen bg-primary-dark pt-24 md:pt-28 pb-16 md:pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 md:mb-4">
            Our <span className="text-accent">Stories</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
            Insights, updates, and success stories from the E-Cell ecosystem.
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64 text-accent">
            <Loader size={48} className="animate-spin mb-4" />
            <p className="text-sm md:text-base">Fetching latest stories...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedPost(post)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-accent/30 transition-all duration-300 h-full cursor-pointer shadow-lg hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden relative bg-black/20">
                <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={getHighResImage(post)}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-accent" />
                    {new Date(post.pubDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-accent" />
                    {getAuthorName(post.author)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                  {stripHtml(post.description)}...
                </p>

                <div className="flex items-center gap-2 text-sm font-bold text-accent mt-auto group-hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;