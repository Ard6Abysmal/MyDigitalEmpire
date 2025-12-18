import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',           // Changed from 'title' to 'name'
    description: '',
    category: 'Web App',
    tech: '',           // Changed from 'tags' to 'tech'
    github_url: '',
    live_url: '',       // Changed from 'demo_url' to 'live_url'
    image_url: '',
    status: 'completed'
  });
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean)  // Changed from 'tags' to 'tech'
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
      name: project.name,                              // Changed from 'title' to 'name'
      description: project.description,
      category: project.category,
      tech: project.tech.join(', '),                   // Changed from 'tags' to 'tech'
      github_url: project.github_url || '',
      live_url: project.live_url || '',                // Changed from 'demo_url' to 'live_url'
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
      <div className="min-h-screen bg-true-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-empire-purple"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-true-black pt-24 pb-16">
      <ParticleBackground theme="matrix" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-text-muted mt-2">Manage your portfolio projects</p>
          </div>
          
          {/* Updated Header Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/resume')}
              className="px-6 py-3 bg-empire-cyan text-white font-bold rounded-xl hover:bg-empire-cyan/80 transition-all"
            >
              📄 Manage Resume
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
            >
              + Add Project
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="text-left px-6 py-4 text-empire-text font-bold">Project Name</th>
                <th className="text-left px-6 py-4 text-empire-text font-bold">Category</th>
                <th className="text-left px-6 py-4 text-empire-text font-bold">Status</th>
                <th className="text-left px-6 py-4 text-empire-text font-bold">Technologies</th>
                <th className="text-right px-6 py-4 text-empire-text font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-dark-border hover:bg-dark-bg/50 transition-colors">
                  <td className="px-6 py-4 text-empire-text font-semibold">{project.name}</td>
                  <td className="px-6 py-4 text-text-muted">{project.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-empire-purple/20 text-empire-purple rounded">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs text-text-muted">+{project.tech.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-2 bg-empire-cyan text-white rounded-lg hover:bg-empire-cyan/80 transition-all mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-dark-surface border-2 border-empire-purple/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-3xl font-bold text-empire-purple mb-6">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-empire-text font-semibold mb-2">Project Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-empire-text font-semibold mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple h-24"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-empire-text font-semibold mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple"
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
                      <label className="block text-empire-text font-semibold mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple"
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="planned">Planned</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-empire-text font-semibold mb-2">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tech}
                      onChange={(e) => setFormData({...formData, tech: e.target.value})}
                      placeholder="React, Python, FastAPI, etc."
                      className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-empire-text font-semibold mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                      className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-empire-text font-semibold mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      value={formData.live_url}
                      onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                      className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-empire-text font-semibold mb-2">Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
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
                      className="px-6 py-3 bg-dark-bg border-2 border-dark-border text-empire-text font-bold rounded-xl hover:bg-dark-border transition-all"
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
