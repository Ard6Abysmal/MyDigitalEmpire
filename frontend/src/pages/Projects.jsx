import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackProjectView, trackExternalLink, trackButtonClick } from '../services/analytics';
import { useTheme } from '../context/ThemeContext'; // NEW

const Projects = () => {
  const { isDark } = useTheme(); // NEW - Get theme state
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'AI/ML', 'Web App', 'Blockchain', 'Game Dev'];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Track project card click
  const handleProjectClick = (projectName) => {
    trackProjectView(projectName);
  };

  // Track external link clicks (GitHub, live demo, etc.)
  const handleExternalLink = (url, linkType, projectName) => {
    trackExternalLink(`${linkType} - ${projectName}: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Track category filter changes
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
      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
            Projects
          </h1>
          <p className={`text-xl ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
            Explore my journey across AI, Web3, and Full-Stack Development
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === category
                  ? 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                  : isDark 
                    ? 'bg-dark-surface text-text-muted border border-dark-border hover:border-empire-purple/50'
                    : 'bg-light-surface text-light-muted border border-light-border hover:border-empire-purple/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => handleProjectClick(project.name)}
              className={`group relative p-6 rounded-2xl border hover:border-empire-purple/50 transition-all overflow-hidden cursor-pointer ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-dark-border' 
                  : 'bg-gradient-to-br from-light-surface to-light-bg border-light-border'
              }`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-empire-purple/0 via-empire-cyan/0 to-empire-green/0 group-hover:from-empire-purple/10 group-hover:via-empire-cyan/10 group-hover:to-empire-green/10 transition-all duration-500"></div>
              
              <div className="relative z-10">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs px-3 py-1 rounded-full border ${
                    isDark 
                      ? 'bg-dark-bg border-dark-border text-text-muted' 
                      : 'bg-light-bg border-light-border text-light-muted'
                  }`}>
                    {project.category}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    project.status === 'In Development' ? 'bg-empire-green/20 text-empire-green border border-empire-green/30' :
                    project.status === 'Planned' ? 'bg-empire-orange/20 text-empire-orange border border-empire-orange/30' :
                    'bg-empire-cyan/20 text-empire-cyan border border-empire-cyan/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold mb-3 group-hover:text-empire-purple transition-colors ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>
                  {project.name}
                </h3>
                
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDark ? 'text-text-muted' : 'text-light-muted'
                }`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 rounded bg-empire-purple/10 text-empire-purple border border-empire-purple/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.github_url && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering card click
                        handleExternalLink(project.github_url, 'GitHub', project.name);
                      }}
                      className={`flex-1 py-2 rounded-lg border hover:border-empire-purple text-empire-purple transition-all font-semibold text-sm ${
                        isDark ? 'bg-dark-bg border-dark-border' : 'bg-light-bg border-light-border'
                      }`}
                    >
                      💻 GitHub
                    </button>
                  )}
                  
                  {project.live_url && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering card click
                        handleExternalLink(project.live_url, 'Live Demo', project.name);
                      }}
                      className="flex-1 py-2 rounded-lg bg-empire-purple/20 text-empire-purple border border-empire-purple/30 hover:bg-empire-purple hover:text-white transition-all font-semibold text-sm"
                    >
                      🚀 Live Demo
                    </button>
                  )}
                  
                  {!project.github_url && !project.live_url && (
                    <button 
                      className="flex-1 py-2 rounded-lg bg-empire-purple/20 text-empire-purple border border-empire-purple/30 hover:bg-empire-purple hover:text-white transition-all font-semibold"
                    >
                      View Details
                    </button>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project.name);
                    }}
                    className={`px-4 py-2 rounded-lg border hover:border-empire-cyan text-empire-cyan transition-all ${
                      isDark ? 'bg-dark-bg border-dark-border' : 'bg-light-bg border-light-border'
                    }`}
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-xl ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
