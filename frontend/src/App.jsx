// import { useState, useEffect } from 'react';
// import BentoGrid from './components/BentoGrid';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import ChatWidget from './components/Chatbot/ChatWidget';
import { initGA, trackPageView } from './services/analytics'; // NEW

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminResume from './pages/AdminResume';
import Analytics from './pages/Analytics'; // NEW

// Track page views on route change
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  //   // Fetch projects from FastAPI backend
  //   fetch(`${API_URL}/api/projects`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setProjects(data.projects);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching projects:', err);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-empire-purple"></div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    // Initialize Google Analytics
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      initGA(measurementId);
    }
  }, []);

  return (
    // <div className="min-h-screen bg-empire-dark">
    //   <BentoGrid projects={projects} />
    //   <ChatWidget /> {/* Add this line */}
    // </div>
    
    <Router>
      <div className="min-h-screen bg-true-black">
        <Navbar />
        <AnalyticsTracker /> {/* Track page views */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/resume" element={<AdminResume />} />
          <Route path="/admin/analytics" element={<Analytics />} /> {/* NEW */}
        </Routes>

        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
