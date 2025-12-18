import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

const AdminResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/resume/data`);
      const data = await response.json();
      setResumeData(data.data || data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        `${API_URL}/api/resume/upload?token=${adminToken}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        alert('Resume uploaded successfully!');
        fetchResumeData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = {
      full_name: "Your Name",
      title: "Your Title",
      email: "your.email@example.com",
      phone: "+1 (123) 456-7890",
      location: "City, Country",
      website: "https://yourwebsite.com",
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      summary: "Your professional summary...",
      experience: [
        {
          title: "Job Title",
          company: "Company Name",
          location: "Location",
          start_date: "Jan 2023",
          end_date: "Present",
          responsibilities: [
            "Responsibility 1",
            "Responsibility 2"
          ]
        }
      ],
      education: [
        {
          degree: "Degree Name",
          institution: "University Name",
          start_date: "2020",
          end_date: "2024",
          gpa: "3.8/4.0"
        }
      ],
      skills: {
        "Languages": ["Python", "JavaScript"],
        "Frameworks": ["React", "FastAPI"],
        "Tools": ["Git", "Docker"]
      },
      projects: [
        {
          name: "Project Name",
          description: "Project description",
          technologies: ["Tech1", "Tech2"],
          link: "https://github.com/..."
        }
      ],
      certifications: [
        {
          name: "Certification Name",
          issuer: "Issuer",
          date: "2024"
        }
      ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume_template.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportResume = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/resume/export?token=${adminToken}`
      );
      const data = await response.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my_resume_data.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting:', error);
    }
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
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
              Resume Manager
            </h1>
            <p className="text-text-muted mt-2">Upload and manage your resume data</p>
          </div>
          
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-3 bg-dark-surface border border-dark-border text-empire-text font-bold rounded-xl hover:border-empire-purple transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-surface border border-dark-border rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-empire-purple mb-4">Upload Resume Data</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={downloadTemplate}
                className="px-6 py-3 bg-empire-cyan text-white font-bold rounded-xl hover:bg-empire-cyan/80 transition-all flex items-center gap-2"
              >
                📥 Download Template
              </button>

              <label className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <div className="px-6 py-3 bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all cursor-pointer flex items-center gap-2">
                  {uploading ? '⏳ Uploading...' : '📤 Upload JSON'}
                </div>
              </label>

              {resumeData && (
                <button
                  onClick={exportResume}
                  className="px-6 py-3 bg-empire-green text-white font-bold rounded-xl hover:bg-empire-green/80 transition-all flex items-center gap-2"
                >
                  💾 Export Current Data
                </button>
              )}
            </div>

            <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
              <p className="text-text-muted text-sm mb-2">
                <strong className="text-empire-text">How to upload:</strong>
              </p>
              <ol className="text-text-muted text-sm space-y-1 list-decimal list-inside">
                <li>Download the JSON template</li>
                <li>Edit the template with your information</li>
                <li>Upload the modified JSON file</li>
                <li>Your resume will be updated instantly!</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Current Resume Preview */}
        {resumeData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-surface border border-dark-border rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-empire-cyan mb-6">Current Resume Data</h2>
            
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-xl font-bold text-empire-text mb-3">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-sm">Name</p>
                    <p className="text-empire-text font-semibold">{resumeData.full_name}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Title</p>
                    <p className="text-empire-text font-semibold">{resumeData.title}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Email</p>
                    <p className="text-empire-text">{resumeData.email}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Phone</p>
                    <p className="text-empire-text">{resumeData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xl font-bold text-empire-text mb-3">Summary</h3>
                <p className="text-text-muted">{resumeData.summary}</p>
              </div>

              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-empire-text mb-3">Experience</h3>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="bg-dark-bg rounded-xl p-4">
                        <p className="text-empire-purple font-bold">{exp.title}</p>
                        <p className="text-empire-text">{exp.company} • {exp.location}</p>
                        <p className="text-text-muted text-sm">{exp.start_date} - {exp.end_date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && (
                <div>
                  <h3 className="text-xl font-bold text-empire-text mb-3">Skills</h3>
                  <div className="space-y-2">
                    {Object.entries(resumeData.skills).map(([category, skills]) => (
                      <div key={category}>
                        <span className="text-empire-cyan font-semibold">{category}: </span>
                        <span className="text-text-muted">{skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!resumeData && (
          <div className="text-center py-20">
            <p className="text-2xl text-text-muted mb-4">No resume data yet</p>
            <p className="text-text-muted">Download the template and upload your resume!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResume;
