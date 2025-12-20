import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Zap, Award, Code } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';
import { trackProjectView, trackExternalLink } from '../services/analytics';
import { getTechIcon } from '../utils/techIcons';

const ProjectDetail = () => {
  const { isDark } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchProjectDetails();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (project) {
      trackProjectView(project.name);
      fetchRelatedProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`);
      
      if (!response.ok) {
        throw new Error('Project not found');
      }
      
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      setTimeout(() => navigate('/projects'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      const data = await response.json();
      const filtered = data.projects
        .filter(p => p.id !== parseInt(id) && p.category === project.category)
        .slice(0, 3);
      setRelatedProjects(filtered);
    } catch (error) {
      console.error('Error fetching related projects:', error);
    }
  };

  const handleExternalLink = (url, linkType) => {
    trackExternalLink(`${linkType} - ${project.name}: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-empire-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={isDark ? 'text-empire-text' : 'text-light-text'}>
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-6"
          >
            🔍
          </motion.div>
          <h2 className={`text-3xl font-black mb-4 ${
            isDark ? 'text-empire-text' : 'text-light-text'
          }`}>
            Project not found
          </h2>
          <Link 
            to="/projects" 
            className="text-empire-purple hover:text-empire-cyan transition-colors font-bold text-lg"
          >
            ← Back to Projects
          </Link>
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-empire-purple hover:text-empire-cyan transition-colors mb-8 group font-bold text-lg"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`project-block relative p-8 rounded-2xl border-2 shadow-2xl mb-12 overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:shadow-empire-purple/20' 
              : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:shadow-empire-purple/15'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${
                isDark 
                  ? 'bg-dark-bg border-empire-purple/40 text-empire-text' 
                  : 'bg-light-bg border-empire-purple/30 text-light-text'
              }`}>
                {project.category}
              </span>
              <span className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${
                project.status === 'In Development' || project.status === 'Active Development'
                  ? 'bg-empire-green/25 text-empire-green border-empire-green/50'
                  : project.status === 'Planned' || project.status === 'Research Phase'
                    ? 'bg-empire-orange/25 text-empire-orange border-empire-orange/50'
                    : project.status === 'Completed'
                      ? 'bg-empire-cyan/25 text-empire-cyan border-empire-cyan/50'
                      : 'bg-empire-purple/25 text-empire-purple border-empire-purple/50'
              }`}>
                {project.status}
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl font-black mb-6 leading-tight ${
              isDark ? 'text-empire-text' : 'text-light-text'
            }`}>
              {project.name}
            </h1>

            <p className={`text-xl mb-8 leading-relaxed ${
              isDark ? 'text-text-muted' : 'text-light-muted'
            }`}>
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.github_url && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={() => handleExternalLink(project.github_url, 'GitHub')}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-purple-600 text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all overflow-hidden"
                >
                  <Github size={20} />
                  <span className="relative z-10">View on GitHub</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </motion.button>
              )}
              
              {project.live_url && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={() => handleExternalLink(project.live_url, 'Live Demo')}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-empire-cyan to-blue-600 text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all overflow-hidden"
                >
                  <ExternalLink size={20} />
                  <span className="relative z-10">Live Demo</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Project Image */}
        {project.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-auto max-h-[600px] object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x600/a855f7/ffffff?text=' + encodeURIComponent(project.name);
              }}
            />
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`project-block relative p-8 rounded-2xl border-2 shadow-xl mb-12 overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20' 
              : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

          <div className="relative z-10">
            <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 ${
              isDark ? 'text-empire-text' : 'text-light-text'
            }`}>
              <Tag size={24} className="text-empire-cyan" />
              Technologies Used
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {(Array.isArray(project.tech) ? project.tech : [project.tech]).map((tech, i) => {
                const TechIcon = getTechIcon(tech);
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-bold shadow-md transition-all cursor-default ${
                      isDark
                        ? 'bg-empire-purple/20 text-empire-purple border-empire-purple/40 hover:bg-empire-purple/30 hover:border-empire-purple/60'
                        : 'bg-empire-purple/15 text-empire-purple border-empire-purple/30 hover:bg-empire-purple/25 hover:border-empire-purple/50'
                    }`}
                  >
                    <TechIcon className="w-5 h-5" />
                    {tech}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Project Information Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`project-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-green/30 hover:border-empire-green/60 hover:shadow-2xl hover:shadow-empire-green/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-green/25 hover:border-empire-green/50 hover:shadow-2xl hover:shadow-empire-green/15'
              }`}
            >
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

              <div className="relative z-10">
                <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>
                  <Zap size={24} className="text-empire-green" />
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`flex items-start gap-3 ${
                        isDark ? 'text-text-muted' : 'text-light-muted'
                      }`}
                    >
                      <span className="text-empire-green font-bold text-lg mt-0.5">✓</span>
                      <span className="font-semibold">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`project-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-orange/30 hover:border-empire-orange/60 hover:shadow-2xl hover:shadow-empire-orange/20' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-orange/25 hover:border-empire-orange/50 hover:shadow-2xl hover:shadow-empire-orange/15'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

            <div className="relative z-10">
              <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>
                <Calendar size={24} className="text-empire-orange" />
                Project Details
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className={`font-bold mb-2 text-sm uppercase tracking-wider ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>Category</h3>
                  <p className={`font-semibold ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                    {project.category}
                  </p>
                </div>

                <div>
                  <h3 className={`font-bold mb-2 text-sm uppercase tracking-wider ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>Status</h3>
                  <p className={`font-semibold ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                    {project.status}
                  </p>
                </div>

                {project.year && (
                  <div>
                    <h3 className={`font-bold mb-2 text-sm uppercase tracking-wider ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>Year</h3>
                    <p className={`font-semibold ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                      {project.year}
                    </p>
                  </div>
                )}

                {project.team_size && (
                  <div>
                    <h3 className={`font-bold mb-2 text-sm uppercase tracking-wider ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>Team Size</h3>
                    <p className={`font-semibold ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                      {project.team_size}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full Description */}
        {project.full_description && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`project-block relative p-8 rounded-2xl border-2 shadow-xl mb-12 overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:shadow-empire-purple/20' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:shadow-empire-purple/15'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

            <div className="relative z-10">
              <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>
                <Code size={24} className="text-empire-purple" />
                About This Project
              </h2>
              <div 
                className={`prose prose-lg max-w-none ${
                  isDark ? 'text-text-muted' : 'text-light-muted'
                }`}
                style={{ lineHeight: '1.8' }}
              >
                <p className="font-semibold">{project.full_description}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16"
          >
            <h2 className={`text-3xl font-black mb-8 ${
              isDark ? 'text-empire-text' : 'text-light-text'
            }`}>
              <span className="gradient-text-stable">Related Projects</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link 
                  key={relatedProject.id} 
                  to={`/projects/${relatedProject.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div
                    className={`project-block relative rounded-xl overflow-hidden border-2 shadow-xl h-full transition-all duration-200 ${
                      isDark 
                        ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2 hover:scale-[1.02]' 
                        : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2 hover:scale-[1.02]'
                    }`}
                  >
                    <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                    <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

                    <div className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-3 py-1.5 rounded-lg bg-empire-cyan/20 text-empire-cyan border-2 border-empire-cyan/40 font-bold">
                          {relatedProject.category}
                        </span>
                        <span className={`text-xs px-3 py-1.5 rounded-lg font-bold border-2 ${
                          relatedProject.status === 'In Development' || relatedProject.status === 'Active Development' ? 
                            'bg-empire-green/25 text-empire-green border-empire-green/50' :
                          relatedProject.status === 'Planned' || relatedProject.status === 'Research Phase' ? 
                            'bg-empire-orange/25 text-empire-orange border-empire-orange/50' :
                          relatedProject.status === 'Completed' ?
                            'bg-empire-cyan/25 text-empire-cyan border-empire-cyan/50' :
                            'bg-empire-purple/25 text-empire-purple border-empire-purple/50'
                        }`}>
                          {relatedProject.status}
                        </span>
                      </div>
                      <h3 className={`text-xl font-black mb-2 line-clamp-2 ${
                        isDark ? 'text-empire-text' : 'text-light-text'
                      }`}>
                        {relatedProject.name}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${
                        isDark ? 'text-text-muted' : 'text-light-muted'
                      }`}>
                        {relatedProject.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`project-block relative mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
          
          <div className="relative z-10">
            <motion.div 
              className="text-6xl mb-5"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🤝
            </motion.div>
            <h2 className="text-3xl font-black text-empire-purple mb-5">Interested in Collaboration?</h2>
            <p className={`text-lg leading-relaxed max-w-2xl mx-auto mb-6 ${
              isDark ? 'text-empire-text/90' : 'text-light-text/90'
            }`}>
              I'm always open to discussing innovative projects in AI/ML, neuromorphic VLSI, embedded systems, or web development. 
              Let's build something amazing together!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => navigate('/contact')}
                className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all overflow-hidden"
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
                onClick={() => navigate('/projects')}
                className={`px-8 py-3 rounded-xl border-2 font-bold transition-all shadow-lg ${
                  isDark
                    ? 'bg-dark-surface border-empire-purple text-empire-text hover:bg-empire-purple/10 hover:shadow-empire-purple/20'
                    : 'bg-light-surface border-empire-purple text-light-text hover:bg-empire-purple/10 hover:shadow-empire-purple/15'
                }`}
              >
                View All Projects
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
