import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';
import { trackProjectView, trackExternalLink } from '../services/analytics';

const ProjectDetail = () => {
  const { isDark } = useTheme();
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  // Track project view when loaded
  useEffect(() => {
    if (project) {
      trackProjectView(project.name);
    }
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
      // Redirect to projects page if not found
      setTimeout(() => navigate('/projects'), 2000);
    } finally {
      setLoading(false);
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
            Loading project...
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
          <h2 className={`text-3xl font-bold mb-4 ${
            isDark ? 'text-empire-text' : 'text-light-text'
          }`}>
            Project not found
          </h2>
          <Link to="/projects" className="text-empire-purple hover:text-empire-cyan transition-colors">
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
      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          to="/projects"
          className="inline-flex items-center gap-2 text-empire-purple hover:text-empire-cyan transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isDark 
                ? 'bg-dark-surface border border-dark-border text-text-muted' 
                : 'bg-light-surface border border-light-border text-light-muted'
            }`}>
              {project.category}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === 'In Development' 
                ? 'bg-empire-green/20 text-empire-green border border-empire-green/30'
                : project.status === 'Planned' 
                  ? 'bg-empire-orange/20 text-empire-orange border border-empire-orange/30'
                  : 'bg-empire-cyan/20 text-empire-cyan border border-empire-cyan/30'
            }`}>
              {project.status}
            </span>
          </div>

          <h1 className={`text-5xl md:text-6xl font-black mb-6 ${
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
              <button
                onClick={() => handleExternalLink(project.github_url, 'GitHub')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-purple-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
              >
                <Github size={20} />
                View on GitHub
              </button>
            )}
            
            {project.live_url && (
              <button
                onClick={() => handleExternalLink(project.live_url, 'Live Demo')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-empire-cyan to-blue-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
              >
                <ExternalLink size={20} />
                Live Demo
              </button>
            )}
          </div>
        </motion.div>

        {/* Project Image */}
        {project.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-2xl overflow-hidden"
          >
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-auto max-h-[500px] object-cover"
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
          className={`p-8 rounded-2xl border mb-12 ${
            isDark 
              ? 'bg-dark-surface border-dark-border' 
              : 'bg-light-surface border-light-border'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
            isDark ? 'text-empire-text' : 'text-light-text'
          }`}>
            <Tag size={24} className="text-empire-purple" />
            Technologies Used
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {(Array.isArray(project.tech) ? project.tech : [project.tech]).map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-empire-purple/20 to-empire-cyan/20 border border-empire-purple/30 text-empire-purple font-semibold"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Project Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-8 rounded-2xl border ${
            isDark 
              ? 'bg-dark-surface border-dark-border' 
              : 'bg-light-surface border-light-border'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
            isDark ? 'text-empire-text' : 'text-light-text'
          }`}>
            <Calendar size={24} className="text-empire-cyan" />
            Project Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-semibold mb-2 ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>Category</h3>
              <p className={isDark ? 'text-text-muted' : 'text-light-muted'}>
                {project.category}
              </p>
            </div>

            <div>
              <h3 className={`font-semibold mb-2 ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>Status</h3>
              <p className={isDark ? 'text-text-muted' : 'text-light-muted'}>
                {project.status}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
