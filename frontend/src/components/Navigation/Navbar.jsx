import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/sounds';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: '👤' },
    { name: 'Projects', path: '/projects', icon: '💼' },
    { name: 'Skills', path: '/skills', icon: '⚡' },
    { name: 'Blog', path: '/blog', icon: '📝' },
    { name: 'Contact', path: '/contact', icon: '📧' },
  ];

  const toggleSound = () => {
    const enabled = soundManager.toggle();
    setSoundEnabled(enabled);
    soundManager.playClick();
  };

  const downloadResume = async () => {
    soundManager.playClick();
    try {
      const response = await fetch(`${API_URL}/api/resume/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      soundManager.playSuccess();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-true-black/95 backdrop-blur-md border-b border-dark-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-empire-purple to-empire-cyan flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all">
              <span className="font-bold text-white">DE</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
                Digital Empire
              </h1>
              <p className="text-xs text-text-muted">Portfolio & Projects</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className={`relative px-4 py-2 rounded-lg transition-all group ${
                  location.pathname === item.path
                    ? 'text-empire-purple'
                    : 'text-empire-text hover:text-empire-cyan'
                }`}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden text-xl">{item.icon}</span>
                
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-empire-purple to-empire-cyan"
                  />
                )}
                
                <div className="absolute inset-0 rounded-lg bg-empire-purple/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </Link>
            ))}

            {/* Resume Download Button */}
            <button
              onClick={downloadResume}
              onMouseEnter={() => soundManager.playHover()}
              className="ml-2 px-4 py-2 bg-gradient-to-r from-empire-purple to-empire-cyan text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all flex items-center gap-2"
            >
              <span className="hidden md:inline">Resume</span>
              <span>📄</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`ml-2 p-2 rounded-lg transition-all ${
                soundEnabled
                  ? 'text-empire-green bg-empire-green/10 border border-empire-green/30'
                  : 'text-text-muted bg-dark-surface border border-dark-border'
              }`}
              title={soundEnabled ? 'Sound On' : 'Sound Off'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
