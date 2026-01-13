import { Routes, Route, useLocation } from 'react-router-dom'; // RESTORED THESE
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import the actual pages
import Home from './pages/Home';
import About from './pages/About';
import Initiatives from './pages/Initiatives';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

// Scroll To Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    // NO <Router> TAG HERE! It is already in main.jsx
    <>
      <ScrollToTop />
      <div className="bg-primary-dark min-h-screen flex flex-col font-sans text-white">
        <Navbar />
        
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;