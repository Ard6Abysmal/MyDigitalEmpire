import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, FileText, FolderKanban } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  // Resume data state
  const [resumeData, setResumeData] = useState(null);
  
  // Projects state
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Web App',
    tech: '',
    github_url: '',
    live_url: '',
    image_url: '',
    status: 'completed'
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://10.189.113.33:8000';
  const adminToken = localStorage.getItem('adminToken');

  // Admin navigation cards
  const adminCards = [
    {
      title: 'Resume Manager',
      icon: '📄',
      description: 'Update your resume, experience, and education',
      color: 'empire-purple',
      path: '/admin/resume',
      stats: resumeData ? `${resumeData.experience?.length || 0} Experiences` : 'Loading...'
    },
    {
      title: 'Projects',
      icon: '💻',
      description: 'Manage your project portfolio',
      color: 'empire-cyan',
      path: null, // Current page (projects section below)
      stats: `${projects.length} Projects`
    },
    {
      title: 'Analytics',
      icon: '📊',
      description: 'View site statistics and visitor data',
      color: 'empire-green',
      path: '/admin/analytics',
      stats: 'Coming Soon'
    },
    {
      title: 'Blog Posts',
      icon: '✍️',
      description: 'Create and manage blog content',
      color: 'empire-orange',
      path: '/blog',
      stats: 'Draft Mode'
    }
  ];

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    // Fetch both resume and projects data
    fetchResumeData();
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResumeData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/resume/data`);
      const data = await response.json();
      
      if (data.message === "Using default resume data") {
        setResumeData(data.data);
      } else {
        setResumeData(data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/projects?token=${adminToken}`);
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      const url = editingProject 
        ? `${API_URL}/api/admin/projects/${editingProject.id}?token=${adminToken}`
        : `${API_URL}/api/admin/projects?token=${adminToken}`;
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        fetchProjects();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(
        `${API_URL}/api/admin/projects/${id}?token=${adminToken}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      category: project.category,
      tech: project.tech.join(', '),
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      image_url: project.image_url || '',
      status: project.status
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Web App',
      tech: '',
      github_url: '',
      live_url: '',
      image_url: '',
      status: 'completed'
    });
    setEditingProject(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-empire-purple"></div>
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

        /* GRADIENT TEXT */
        .gradient-text-stable {
          display: inline-block;
          background: linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.1em 0;
          line-height: 1.2;
        }

        /* SHIMMER ANIMATIONS */
        .block-shimmer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
          animation: shimmer 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .block-shimmer-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), transparent);
          animation: shimmer 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* GLASS OVERLAY */
        .glass-overlay-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 0;
        }

        .glass-overlay-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(6, 182, 212, 0.06) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 0;
        }

        .dashboard-card:hover .glass-overlay-dark,
        .dashboard-card:hover .glass-overlay-light,
        .stat-card:hover .glass-overlay-dark,
        .stat-card:hover .glass-overlay-light {
          opacity: 1;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <span className="gradient-text-stable">Admin Dashboard</span>
            </h1>
            <p className={`text-lg ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
              Welcome back, {resumeData?.full_name || 'Admin'}! 👋
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl bg-red-500/20 border-2 border-red-500/50 text-red-500 font-bold hover:bg-red-500/30 transition-all"
          >
            🚪 Logout
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        {resumeData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            <div className={`stat-card relative p-4 md:p-6 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-dark-surface border-empire-purple/30 hover:border-empire-purple/60' 
                : 'bg-white border-empire-purple/20 hover:border-empire-purple/40'
            }`}>
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              <div className="relative z-10">
                <div className="text-2xl md:text-3xl mb-2">💼</div>
                <div className={`text-xl md:text-2xl font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  {resumeData.experience?.length || 0}
                </div>
                <div className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  Work Experiences
                </div>
              </div>
            </div>

            <div className={`stat-card relative p-4 md:p-6 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-dark-surface border-empire-cyan/30 hover:border-empire-cyan/60' 
                : 'bg-white border-empire-cyan/20 hover:border-empire-cyan/40'
            }`}>
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              <div className="relative z-10">
                <div className="text-2xl md:text-3xl mb-2">🎓</div>
                <div className={`text-xl md:text-2xl font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  {resumeData.education?.length || 0}
                </div>
                <div className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  Education Records
                </div>
              </div>
            </div>

            <div className={`stat-card relative p-4 md:p-6 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-dark-surface border-empire-green/30 hover:border-empire-green/60' 
                : 'bg-white border-empire-green/20 hover:border-empire-green/40'
            }`}>
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              <div className="relative z-10">
                <div className="text-2xl md:text-3xl mb-2">🛠️</div>
                <div className={`text-xl md:text-2xl font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  {Object.values(resumeData.skills || {}).flat().length}
                </div>
                <div className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  Total Skills
                </div>
              </div>
            </div>

            <div className={`stat-card relative p-4 md:p-6 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-dark-surface border-empire-orange/30 hover:border-empire-orange/60' 
                : 'bg-white border-empire-orange/20 hover:border-empire-orange/40'
            }`}>
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              <div className="relative z-10">
                <div className="text-2xl md:text-3xl mb-2">🏆</div>
                <div className={`text-xl md:text-2xl font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  {resumeData.certifications?.length || 0}
                </div>
                <div className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  Certifications
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {adminCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + (0.1 * index) }}
              onClick={() => card.path && navigate(card.path)}
              className={`dashboard-card relative p-6 md:p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                card.path ? 'cursor-pointer' : 'cursor-default'
              } ${
                isDark 
                  ? `bg-gradient-to-br from-dark-surface to-dark-bg border-${card.color}/30 hover:border-${card.color}/60 hover:shadow-2xl hover:shadow-${card.color}/20` 
                  : `bg-gradient-to-br from-white to-light-surface border-${card.color}/25 hover:border-${card.color}/50 hover:shadow-2xl hover:shadow-${card.color}/15`
              }`}
            >
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-4xl md:text-5xl p-3 rounded-xl bg-gradient-to-br from-${card.color}/20 to-${card.color}/10`}>
                    {card.icon}
                  </div>
                  <span className={`text-xs md:text-sm font-bold px-3 py-1 rounded-full ${
                    isDark ? `bg-${card.color}/20 text-${card.color}` : `bg-${card.color}/10 text-${card.color}`
                  }`}>
                    {card.stats}
                  </span>
                </div>

                <h3 className={`text-xl md:text-2xl font-black mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  {card.title}
                </h3>
                <p className={`text-sm md:text-base mb-4 ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  {card.description}
                </p>

                {card.path && (
                  <div className="flex items-center gap-2 text-empire-purple font-bold text-sm">
                    <span>Manage</span>
                    <span>→</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
              Projects Management
            </h2>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
            >
              + Add Project
            </button>
          </div>

          {/* Projects Table */}
          <div className={`rounded-2xl border-2 overflow-hidden ${
            isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b-2 ${isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-gray-200'}`}>
                  <tr>
                    <th className={`text-left px-4 md:px-6 py-4 font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Project Name
                    </th>
                    <th className={`text-left px-4 md:px-6 py-4 font-bold hidden md:table-cell ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Category
                    </th>
                    <th className={`text-left px-4 md:px-6 py-4 font-bold hidden sm:table-cell ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Status
                    </th>
                    <th className={`text-left px-4 md:px-6 py-4 font-bold hidden lg:table-cell ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Technologies
                    </th>
                    <th className={`text-right px-4 md:px-6 py-4 font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr 
                      key={project.id} 
                      className={`border-b transition-colors ${
                        isDark 
                          ? 'border-dark-border hover:bg-dark-bg/50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <td className={`px-4 md:px-6 py-4 font-semibold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        {project.name}
                      </td>
                      <td className={`px-4 md:px-6 py-4 hidden md:table-cell ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                        {project.category}
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-empire-purple/20 text-empire-purple rounded">
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className={`text-xs ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="px-3 md:px-4 py-2 bg-empire-cyan text-white rounded-lg hover:bg-empire-cyan/80 transition-all text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="px-3 md:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 md:p-6"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
                  isDark 
                    ? 'bg-dark-surface border-2 border-empire-purple/50' 
                    : 'bg-white border-2 border-empire-purple/30'
                }`}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-empire-purple mb-6">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple transition-all ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-empire-text' 
                          : 'bg-white border-gray-300 text-light-text'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple h-24 transition-all ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-empire-text' 
                          : 'bg-white border-gray-300 text-light-text'
                      }`}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple transition-all ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border text-empire-text' 
                            : 'bg-white border-gray-300 text-light-text'
                        }`}
                      >
                        <option>Web App</option>
                        <option>AI/ML</option>
                        <option>Blockchain</option>
                        <option>Mobile App</option>
                        <option>Game</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple transition-all ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border text-empire-text' 
                            : 'bg-white border-gray-300 text-light-text'
                        }`}
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="planned">Planned</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tech}
                      onChange={(e) => setFormData({...formData, tech: e.target.value})}
                      placeholder="React, Python, FastAPI, etc."
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple transition-all ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-empire-text' 
                          : 'bg-white border-gray-300 text-light-text'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple transition-all ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-empire-text' 
                          : 'bg-white border-gray-300 text-light-text'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.live_url}
                      onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple transition-all ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-empire-text' 
                          : 'bg-white border-gray-300 text-light-text'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-empire-purple transition-all ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-empire-text' 
                          : 'bg-white border-gray-300 text-light-text'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold py-3 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
                    >
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className={`px-6 py-3 border-2 font-bold rounded-xl transition-all ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-empire-text hover:bg-dark-border' 
                          : 'bg-white border-gray-300 text-light-text hover:bg-gray-100'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
