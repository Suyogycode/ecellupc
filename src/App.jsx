import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import the actual pages we built
import Home from './pages/Home';
import About from './pages/About';
import Initiatives from './pages/Initiatives';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Blog from './pages/Blog'; // Add this
import BlogPost from '../../BlogPost'; // Add this


// Scroll To Top Component
// This ensures that when you click a link, the new page starts at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-primary-dark min-h-screen flex flex-col font-sans text-white">
        <Navbar />
        
        <main className="grow">
          <Routes>
            {/* The routes now point to the real components */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
{/*            <Route path="/blog/:id" element={<BlogPost />} /> {/* Add this line */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;