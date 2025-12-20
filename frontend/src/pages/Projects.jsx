import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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
      {/* Optimized Styles - ZERO FLICKER */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Smooth shimmer for hover effects only */
        .shimmer-text-hover {
          background: linear-gradient(
            90deg,
            currentColor 0%,
            currentColor 40%,
            rgba(6, 182, 212, 1) 50%,
            currentColor 60%,
            currentColor 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          will-change: background-position;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .group:hover .shimmer-text-hover {
          animation: shimmer 1.5s linear infinite;
        }

        /* FIXED: No flicker gradient text */
        .gradient-text-stable {
          display: inline-block;
          background: linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.1em 0; /* Prevents clipping */
          line-height: 1.2; /* Stable height */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Global anti-flicker */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header - COMPLETELY FIXED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-stable">
              Projects Portfolio
            </span>
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
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
          <div className={`p-6 rounded-2xl border-2 backdrop-blur-md shadow-2xl ${
            isDark 
              ? 'bg-dark-surface/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-white/95 border-empire-purple/30 shadow-empire-purple/5'
          }`}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-3.5 rounded-xl font-bold text-sm transition-all overflow-hidden ${
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

        {/* Projects Count - CREATIVE DISPLAY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className={`p-6 rounded-2xl border-2 text-center shadow-lg relative overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 via-dark-bg/95 to-dark-surface/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-gradient-to-br from-white/95 via-light-surface/95 to-white/95 border-empire-purple/30 shadow-empire-purple/5'
          }`}>
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-empire-purple/5 via-empire-cyan/5 to-empire-purple/5 opacity-50"
              animate={{ 
                background: [
                  'linear-gradient(90deg, rgba(168,85,247,0.05) 0%, rgba(6,182,212,0.05) 50%, rgba(168,85,247,0.05) 100%)',
                  'linear-gradient(90deg, rgba(6,182,212,0.05) 0%, rgba(168,85,247,0.05) 50%, rgba(6,182,212,0.05) 100%)',
                  'linear-gradient(90deg, rgba(168,85,247,0.05) 0%, rgba(6,182,212,0.05) 50%, rgba(168,85,247,0.05) 100%)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2"
              >
                <span className={`text-4xl ${isDark ? 'text-empire-purple' : 'text-empire-purple'}`}>
                  💼
                </span>
                <span className={`text-base font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  Available Projects:
                </span>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                className="relative"
              >
                <div className={`px-6 py-3 rounded-xl border-2 font-black text-3xl shadow-xl ${
                  isDark
                    ? 'bg-gradient-to-br from-empire-purple/30 to-empire-cyan/30 border-empire-purple/60 text-empire-purple shadow-empire-purple/30'
                    : 'bg-gradient-to-br from-empire-purple/20 to-empire-cyan/20 border-empire-purple/50 text-empire-purple shadow-empire-purple/20'
                }`}>
                  {filteredProjects.length}
                </div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-empire-purple to-empire-cyan rounded-xl opacity-0 blur-xl"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              
              {filter !== 'All' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
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
              )}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const IconComponent = getTechIcon(project.category) || FaCode;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                onClick={() => handleProjectClick(project.id, project.name)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface via-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/70 shadow-xl hover:shadow-2xl hover:shadow-empire-purple/20' 
                    : 'bg-gradient-to-br from-white via-light-surface to-white border-empire-purple/25 hover:border-empire-purple/60 shadow-xl hover:shadow-2xl hover:shadow-empire-purple/15'
                }`}
              >
                {/* Gradient glow overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDark
                    ? 'bg-gradient-to-br from-empire-purple/10 via-empire-cyan/10 to-empire-green/10'
                    : 'bg-gradient-to-br from-empire-purple/5 via-empire-cyan/5 to-empire-green/5'
                }`}></div>
                
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                
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
                        'bg-empire-green/30 text-empire-green border-empire-green/60 shadow-empire-green/20' :
                      project.status === 'Planned' || project.status === 'Research Phase' ? 
                        'bg-empire-orange/30 text-empire-orange border-empire-orange/60 shadow-empire-orange/20' :
                      project.status === 'Completed' ?
                        'bg-empire-cyan/30 text-empire-cyan border-empire-cyan/60 shadow-empire-cyan/20' :
                        'bg-empire-purple/30 text-empire-purple border-empire-purple/60 shadow-empire-purple/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-black mb-3 leading-tight ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <span className="shimmer-text-hover">{project.name}</span>
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
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.1 + i * 0.05 }}
                            whileHover={{ scale: 1.15, y: -3 }}
                            className={`group/tech relative flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border-2 font-bold transition-all cursor-default shadow-sm ${
                              isDark
                                ? 'bg-empire-purple/25 text-empire-purple border-empire-purple/50 hover:bg-empire-purple/40 hover:border-empire-purple/70 hover:shadow-empire-purple/30'
                                : 'bg-empire-purple/15 text-empire-purple border-empire-purple/40 hover:bg-empire-purple/30 hover:border-empire-purple/60 hover:shadow-empire-purple/20'
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExternalLink(project.github_url, 'GitHub', project.name);
                        }}
                        className={`flex-1 py-2.5 rounded-xl border-2 hover:border-empire-purple text-empire-purple transition-all font-bold text-sm shadow-md hover:shadow-lg ${
                          isDark 
                            ? 'bg-dark-bg border-empire-purple/40 hover:bg-dark-surface' 
                            : 'bg-white border-empire-purple/30 hover:bg-light-surface'
                        }`}
                      >
                        💻 GitHub
                      </motion.button>
                    )}
                    
                    {project.live_url && (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExternalLink(project.live_url, 'Live Demo', project.name);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-empire-purple/25 text-empire-purple border-2 border-empire-purple/40 hover:bg-empire-purple hover:text-white transition-all font-bold text-sm shadow-md hover:shadow-lg"
                      >
                        🚀 Demo
                      </motion.button>
                    )}
                    
                    {!project.github_url && !project.live_url && (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 py-2.5 rounded-xl bg-empire-purple/25 text-empire-purple border-2 border-empire-purple/40 hover:bg-empire-purple hover:text-white transition-all font-bold text-sm shadow-md hover:shadow-lg"
                      >
                        📄 Details
                      </motion.button>
                    )}
                    
                    <motion.button 
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id, project.name);
                      }}
                      className={`px-5 py-2.5 rounded-xl border-2 hover:border-empire-cyan text-empire-cyan transition-all font-black text-lg shadow-md hover:shadow-lg ${
                        isDark 
                          ? 'bg-dark-bg border-empire-cyan/40 hover:bg-dark-surface' 
                          : 'bg-white border-empire-cyan/30 hover:bg-light-surface'
                      }`}
                    >
                      →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-12 rounded-2xl border-2 text-center shadow-xl ${
              isDark 
                ? 'bg-dark-surface/70 border-empire-purple/40' 
                : 'bg-white/90 border-empire-purple/30'
            }`}>
            <div className="text-6xl mb-4">🔍</div>
            <p className={`text-xl mb-2 font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
              No projects found in <span className="text-empire-purple">{filter}</span>
            </p>
            <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
              Try selecting a different category or check back later for updates!
            </p>
          </motion.div>
        )}

        {/* CTA */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`mt-16 p-8 rounded-2xl border-2 text-center relative overflow-hidden shadow-2xl ${
              isDark 
                ? 'bg-dark-surface/90 border-empire-purple/40 shadow-empire-purple/10' 
                : 'bg-white/95 border-empire-purple/30 shadow-empire-purple/5'
            }`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-empire-purple/5 to-transparent pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-empire-purple mb-3">
                Interested in collaborating?
              </h2>
              <p className={`mb-6 text-lg ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                I'm always open to discussing new projects, creative ideas, or opportunities to contribute to ambitious initiatives.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    trackButtonClick('CTA - Contact from Projects');
                    navigate('/contact');
                  }}
                  className="relative px-8 py-3.5 bg-gradient-to-r from-empire-purple to-empire-cyan rounded-xl font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.9)] transition-all overflow-hidden"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    trackButtonClick('CTA - GitHub from Projects');
                    window.open('https://github.com/AbyssDrn', '_blank', 'noopener,noreferrer');
                  }}
                  className={`px-8 py-3.5 border-2 border-empire-cyan rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
                    isDark 
                      ? 'text-empire-cyan hover:bg-empire-cyan hover:text-true-black' 
                      : 'text-empire-cyan hover:bg-empire-cyan hover:text-white'
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
