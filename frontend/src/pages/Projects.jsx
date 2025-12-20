import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackProjectView, trackExternalLink, trackButtonClick } from '../services/analytics';
import { useTheme } from '../context/ThemeContext';
import { getTechIcon } from '../utils/techIcons';
import { FaCode } from 'react-icons/fa';

const Projects = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const categories = [
    'All', 
    'VLSI & Electronics', 
    'Embedded & IoT', 
    'AI/ML', 
    'Web Development', 
    'Blockchain'
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setProjects([]);
        setLoading(false);
      });
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleProjectClick = (projectId, projectName) => {
    trackProjectView(projectName);
    navigate(`/projects/${projectId}`);
  };

  const handleExternalLink = (url, linkType, projectName) => {
    trackExternalLink(`${linkType} - ${projectName}: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    trackButtonClick(`Filter - ${category}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-empire-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={isDark ? 'text-empire-text' : 'text-light-text'}>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* GRADIENT TEXT - STABLE */
        .gradient-text-stable {
          display: inline-block;
          background: linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.1em 0;
          line-height: 1.2;
        }

        /* CONTINUOUS SHIMMER FOR BLOCKS */
        .block-shimmer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          animation: blockShimmer 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .block-shimmer-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.2),
            transparent
          );
          animation: blockShimmer 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes blockShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* GLASS OVERLAY FOR HOVER - INSTANT & SMOOTH */
        .glass-overlay-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.12) 0%,
            rgba(6, 182, 212, 0.08) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 0;
        }

        .glass-overlay-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.08) 0%,
            rgba(6, 182, 212, 0.06) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 0;
        }

        .project-block:hover .glass-overlay-dark,
        .project-block:hover .glass-overlay-light {
          opacity: 1;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* PULSING GLOW ANIMATION */
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-stable">Projects Portfolio</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            From neuromorphic VLSI circuits to AI-powered web applications — exploring the intersection of hardware and software
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className={`project-block relative p-6 rounded-2xl border-2 shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
          }`}>
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
            
            <div className="relative z-10 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`relative px-6 py-3.5 rounded-xl font-bold text-sm transition-all overflow-hidden shadow-md ${
                    filter === category
                      ? 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] border-2 border-white/20'
                      : isDark 
                        ? 'bg-dark-bg text-empire-text border-2 border-empire-purple/30 hover:border-empire-purple/60 hover:bg-dark-surface hover:shadow-lg hover:shadow-empire-purple/20'
                        : 'bg-light-surface text-light-text border-2 border-empire-purple/20 hover:border-empire-purple/50 hover:bg-white hover:shadow-lg hover:shadow-empire-purple/10'
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {filter === category && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Count - ANIMATED ON CHANGE */}
        <div className="mb-12">
          <div className={`project-block relative p-6 rounded-2xl border-2 text-center shadow-xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 via-dark-bg/95 to-dark-surface/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-gradient-to-br from-white/95 via-light-surface/95 to-white/95 border-empire-purple/30 shadow-empire-purple/5'
          }`}>
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
            
            <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-4xl">💼</span>
                <span className={`text-base font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  Available Projects:
                </span>
              </div>
              
              {/* ANIMATED COUNT */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter + filteredProjects.length}
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <div className={`px-6 py-3 rounded-xl border-2 font-black text-3xl shadow-xl ${
                    isDark
                      ? 'bg-gradient-to-br from-empire-purple/30 to-empire-cyan/30 border-empire-purple/60 text-empire-purple shadow-empire-purple/30'
                      : 'bg-gradient-to-br from-empire-purple/20 to-empire-cyan/20 border-empire-purple/50 text-empire-purple shadow-empire-purple/20'
                  }`}>
                    {filteredProjects.length}
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-empire-purple to-empire-cyan rounded-xl opacity-30 blur-xl pulse-glow" />
                </motion.div>
              </AnimatePresence>
              
              {/* ANIMATED CATEGORY BADGE */}
              {filter !== 'All' && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filter}
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex items-center gap-2"
                  >
                    <span className={`text-sm font-semibold ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                      in
                    </span>
                    <span className={`px-4 py-2 rounded-lg border-2 font-bold text-sm shadow-md ${
                      isDark
                        ? 'bg-empire-cyan/20 border-empire-cyan/50 text-empire-cyan'
                        : 'bg-empire-cyan/15 border-empire-cyan/40 text-empire-cyan'
                    }`}>
                      {filter}
                    </span>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const IconComponent = getTechIcon(project.category) || FaCode;
            
            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id, project.name)}
                className={`project-block relative p-6 rounded-2xl border-2 shadow-xl cursor-pointer overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span className={`text-xs px-3 py-2 rounded-lg border-2 font-bold shadow-md ${
                      isDark 
                        ? 'bg-dark-bg/90 border-empire-purple/50 text-empire-text' 
                        : 'bg-white/90 border-empire-purple/40 text-light-text shadow-empire-purple/10'
                    }`}>
                      {project.category}
                    </span>
                    <span className={`text-xs px-3 py-2 rounded-lg font-black border-2 shadow-md ${
                      project.status === 'In Development' || project.status === 'Active Development' ? 
                        'bg-empire-green/25 text-empire-green border-empire-green/50' :
                      project.status === 'Planned' || project.status === 'Research Phase' ? 
                        'bg-empire-orange/25 text-empire-orange border-empire-orange/50' :
                      project.status === 'Completed' ?
                        'bg-empire-cyan/25 text-empire-cyan border-empire-cyan/50' :
                        'bg-empire-purple/25 text-empire-purple border-empire-purple/50'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-black mb-3 leading-tight ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    {project.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 leading-relaxed line-clamp-3 ${
                    isDark ? 'text-text-muted' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className={`p-4 rounded-xl border-2 mb-4 shadow-inner ${
                    isDark 
                      ? 'bg-dark-bg/80 border-empire-purple/40' 
                      : 'bg-light-bg/80 border-empire-purple/30 shadow-empire-purple/5'
                  }`}>
                    <div className="flex flex-wrap gap-2">
                      {project.tech && Array.isArray(project.tech) && project.tech.slice(0, 5).map((tech, i) => {
                        const TechIcon = getTechIcon(tech);
                        return (
                          <motion.span 
                            key={i}
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border-2 font-bold transition-all cursor-default shadow-sm ${
                              isDark
                                ? 'bg-empire-purple/20 text-empire-purple border-empire-purple/40 hover:bg-empire-purple/30 hover:border-empire-purple/60'
                                : 'bg-empire-purple/15 text-empire-purple border-empire-purple/30 hover:bg-empire-purple/25 hover:border-empire-purple/50'
                            }`}
                            title={tech}
                          >
                            <TechIcon className="w-4 h-4" />
                            <span className="font-bold">{tech}</span>
                          </motion.span>
                        );
                      })}
                      {project.tech && Array.isArray(project.tech) && project.tech.length > 5 && (
                        <span className={`text-xs px-3 py-2 rounded-lg font-black border-2 ${
                          isDark 
                            ? 'text-empire-text bg-dark-bg/70 border-empire-purple/30' 
                            : 'text-light-text bg-white/70 border-empire-purple/25'
                        }`}>
                          +{project.tech.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    {project.github_url && (
                      <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExternalLink(project.github_url, 'GitHub', project.name);
                        }}
                        className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-bold text-sm shadow-md hover:shadow-lg ${
                          isDark 
                            ? 'bg-dark-bg border-empire-purple/40 text-empire-purple hover:bg-dark-surface hover:border-empire-purple/60' 
                            : 'bg-white border-empire-purple/30 text-empire-purple hover:bg-light-surface hover:border-empire-purple/50'
                        }`}
                      >
                        💻 GitHub
                      </motion.button>
                    )}
                    
                    {project.live_url && (
                      <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExternalLink(project.live_url, 'Live Demo', project.name);
                        }}
                        className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-bold text-sm shadow-md hover:shadow-lg ${
                          isDark
                            ? 'bg-empire-purple/20 text-empire-purple border-empire-purple/40 hover:bg-empire-purple hover:text-white'
                            : 'bg-empire-purple/15 text-empire-purple border-empire-purple/30 hover:bg-empire-purple hover:text-white'
                        }`}
                      >
                        🚀 Demo
                      </motion.button>
                    )}
                    
                    {!project.github_url && !project.live_url && (
                      <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-bold text-sm shadow-md hover:shadow-lg ${
                          isDark
                            ? 'bg-empire-purple/20 text-empire-purple border-empire-purple/40 hover:bg-empire-purple hover:text-white'
                            : 'bg-empire-purple/15 text-empire-purple border-empire-purple/30 hover:bg-empire-purple hover:text-white'
                        }`}
                      >
                        📄 Details
                      </motion.button>
                    )}
                    
                    <motion.button 
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id, project.name);
                      }}
                      className={`px-5 py-2.5 rounded-xl border-2 transition-all font-black text-lg shadow-md hover:shadow-lg ${
                        isDark 
                          ? 'bg-dark-bg border-empire-cyan/40 text-empire-cyan hover:bg-dark-surface hover:border-empire-cyan/60' 
                          : 'bg-white border-empire-cyan/30 text-empire-cyan hover:bg-light-surface hover:border-empire-cyan/50'
                      }`}
                    >
                      →
                    </motion.button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`project-block relative p-12 rounded-2xl border-2 text-center shadow-xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
                : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
            }`}>
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">🔍</div>
              <p className={`text-xl mb-2 font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                No projects found in <span className="text-empire-purple">{filter}</span>
              </p>
              <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                Try selecting a different category or check back later for updates!
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`project-block relative mt-16 p-8 rounded-2xl border-2 text-center shadow-2xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
                : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-empire-purple mb-3">
                Interested in collaborating?
              </h2>
              <p className={`mb-6 text-lg ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                I'm always open to discussing new projects, creative ideas, or opportunities to contribute to ambitious initiatives.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={() => {
                    trackButtonClick('CTA - Contact from Projects');
                    navigate('/contact');
                  }}
                  className="relative px-8 py-3.5 bg-gradient-to-r from-empire-purple to-empire-cyan rounded-xl font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.9)] transition-all overflow-hidden"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={() => {
                    trackButtonClick('CTA - GitHub from Projects');
                    window.open('https://github.com/AbyssDrn', '_blank', 'noopener,noreferrer');
                  }}
                  className={`px-8 py-3.5 border-2 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
                    isDark 
                      ? 'border-empire-cyan text-empire-cyan hover:bg-empire-cyan hover:text-true-black' 
                      : 'border-empire-cyan text-empire-cyan hover:bg-empire-cyan hover:text-white'
                  }`}
                >
                  View GitHub
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
