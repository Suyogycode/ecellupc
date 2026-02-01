import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail'; 

// Import Pages
import Udai from './pages/Udai';
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
  const location = useLocation();
  
  // Check if we are on the UdAI page to hide standard layout
  const isUdaiPage = location.pathname === '/udai';

  return (
    <>
      <ScrollToTop />
      <CursorTrail />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Only show Main Navbar if NOT on Udai page */}
        {!isUdaiPage && <Navbar />}
        
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/udai" element={<Udai />} />
          </Routes>
        </main>
        
        {/* Only show Footer if NOT on Udai page */}
        {!isUdaiPage && <Footer />}
      </div>
    </>
  );
}

export default App;