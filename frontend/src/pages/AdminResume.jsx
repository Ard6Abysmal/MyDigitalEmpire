import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';
import { getApiUrl } from '../utils/apiConfig';

const AdminResume = () => {
  const { isDark } = useTheme();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [apiUrl, setApiUrl] = useState(null);
  const navigate = useNavigate();

  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    
    // Detect working API endpoint and fetch data
    (async () => {
      const detectedUrl = await getApiUrl();
      setApiUrl(detectedUrl);
      await fetchResumeData(detectedUrl);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResumeData = async (url) => {
    if (!url) return;
    
    try {
      const response = await fetch(`${url}/api/resume/data`);
      const data = await response.json();
      
      // Handle both default data and database data
      if (data.message === "Using default resume data") {
        setResumeData(data.data);
      } else {
        setResumeData(data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.json')) {
      alert('❌ Please upload a JSON file');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        `${apiUrl}/api/resume/upload?token=${adminToken}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('✅ Resume uploaded successfully!');
        fetchResumeData(apiUrl);
      } else {
        // Show detailed error
        console.error('Upload error:', data);
        alert(`❌ Error: ${data.detail || JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert(`❌ Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const downloadTemplate = () => {
    // Template with Amal Madhu's structure
    const template = {
      full_name: "Amal Madhu",
      title: "AI/ML Engineer & Full-Stack Developer",
      email: "asuragodamal6purdemoneuabeyond@gmail.com",
      phone: "+91-8921470483",
      location: "Pathanamthitta, Kerala, India",
      website: "https://amalmadhu.dev",
      github: "https://github.com/AbyssDrn",
      linkedin: "https://linkedin.com/in/amal-madhu",
      summary: "Passionate developer specializing in AI/ML, computer vision, neuromorphic VLSI design, and full-stack web development. Experienced in building innovative solutions using deep learning, embedded systems, and modern web technologies.",
      experience: [
        {
          title: "AI/ML Developer",
          company: "Smart India Hackathon - BlueDepth-Crescent",
          location: "India",
          start_date: "2024",
          end_date: "Present",
          description: [
            "Developing BlueDepth-Crescent: Underwater image enhancement using UNet and PyTorch",
            "Implementing GPU-optimized deep learning pipelines with CUDA acceleration on RTX 4050",
            "Training and deploying computer vision models for low-visibility scenarios"
          ]
        }
      ],
      education: [
        {
          degree: "Bachelor of Technology in Electronics and Communication Engineering",
          institution: "College Of Engineering And Management Punnapra (CEMP)",
          location: "Kerala, India",
          start_date: "2021",
          end_date: "2025",
          gpa: "6.66/10",
          achievements: [
            "Smart India Hackathon 2024 participant - BlueDepth-Crescent project",
            "Specialization in VLSI Design and Embedded Systems"
          ]
        }
      ],
      skills: {
        "Programming Languages": ["Python", "JavaScript", "C++", "Verilog", "SQL", "Bash"],
        "AI/ML & Deep Learning": ["PyTorch", "TensorFlow", "OpenCV", "UNet", "Computer Vision", "CUDA"],
        "Web Development": ["React", "FastAPI", "Node.js", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
        "VLSI & Embedded": ["Verilog", "Cadence", "Arduino", "ESP32", "IoT", "Neuromorphic Design"],
        "Tools & Platforms": ["Git", "GitHub", "Docker", "VS Code", "Linux", "Windows"]
      },
      projects: [
        {
          name: "BlueDepth-Crescent",
          description: "Underwater image enhancement using deep learning with UNet architecture for Smart India Hackathon",
          technologies: ["PyTorch", "Python", "CUDA", "OpenCV", "Computer Vision"],
          highlights: [
            "Implemented UNet model for low-visibility image restoration",
            "Optimized for GPU acceleration with NVIDIA RTX 4050 (6GB VRAM)"
          ],
          github: "https://github.com/AbyssDrn/BlueDepth-Crescent",
          status: "Active Development"
        }
      ],
      certifications: [
        {
          name: "Deep Learning Specialization",
          issuer: "Coursera / DeepLearning.AI",
          date: "2024",
          description: "Neural Networks, CNNs, RNNs, and Sequence Models"
        }
      ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amal_madhu_resume_template.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportResume = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/resume/export?token=${adminToken}`
      );
      const data = await response.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'amal_madhu_resume_data.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('❌ Export failed');
    }
  };

  const downloadPDF = () => {
    window.open(`${apiUrl}/api/resume/download`, '_blank');
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

        .resume-block:hover .glass-overlay-dark,
        .resume-block:hover .glass-overlay-light {
          opacity: 1;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-5xl mx-auto px-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <span className="gradient-text-stable">Resume Manager</span>
            </h1>
            <p className={`${isDark ? 'text-text-muted' : 'text-light-muted'} mt-2`}>
              Upload and manage resume data for Amal Madhu
            </p>
          </div>
          
          <button
            onClick={() => navigate('/admin/dashboard')}
            className={`px-6 py-3 border-2 font-bold rounded-xl transition-all ${
              isDark 
                ? 'bg-dark-surface border-dark-border text-empire-text hover:border-empire-purple' 
                : 'bg-white border-gray-300 text-light-text hover:border-empire-purple'
            }`}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`resume-block relative rounded-2xl p-6 md:p-8 mb-8 border-2 overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60' 
              : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-bold text-empire-purple mb-4">
              📤 Upload Resume Data
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={downloadTemplate}
                  className="px-4 md:px-6 py-3 bg-empire-cyan text-white font-bold rounded-xl hover:bg-empire-cyan/80 transition-all flex items-center gap-2 text-sm md:text-base"
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
                  <div className="px-4 md:px-6 py-3 bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all cursor-pointer flex items-center gap-2 text-sm md:text-base">
                    {uploading ? '⏳ Uploading...' : '📤 Upload JSON'}
                  </div>
                </label>

                {resumeData && (
                  <>
                    <button
                      onClick={exportResume}
                      className="px-4 md:px-6 py-3 bg-empire-green text-white font-bold rounded-xl hover:bg-empire-green/80 transition-all flex items-center gap-2 text-sm md:text-base"
                    >
                      💾 Export JSON
                    </button>

                    <button
                      onClick={downloadPDF}
                      className="px-4 md:px-6 py-3 bg-empire-orange text-white font-bold rounded-xl hover:bg-empire-orange/80 transition-all flex items-center gap-2 text-sm md:text-base"
                    >
                      📄 Download PDF
                    </button>
                  </>
                )}
              </div>

              <div className={`rounded-xl p-4 border ${
                isDark 
                  ? 'bg-dark-bg border-dark-border' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`text-sm mb-2 ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                  <strong className={isDark ? 'text-empire-text' : 'text-light-text'}>
                    How to upload:
                  </strong>
                </p>
                <ol className={`text-sm space-y-1 list-decimal list-inside ${
                  isDark ? 'text-text-muted' : 'text-gray-600'
                }`}>
                  <li>Download the JSON template with Amal's structure</li>
                  <li>Edit the template with updated information</li>
                  <li>Upload the modified JSON file</li>
                  <li>Your resume will be updated instantly!</li>
                </ol>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Resume Preview */}
        {resumeData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`resume-block relative rounded-2xl p-6 md:p-8 border-2 overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold text-empire-cyan mb-6">
                👤 Current Resume Data
              </h2>
              
              <div className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                        Name
                      </p>
                      <p className={`font-semibold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        {resumeData.full_name}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                        Title
                      </p>
                      <p className={`font-semibold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        {resumeData.title}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                        Email
                      </p>
                      <p className={isDark ? 'text-empire-text' : 'text-light-text'}>
                        {resumeData.email}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                        Phone
                      </p>
                      <p className={isDark ? 'text-empire-text' : 'text-light-text'}>
                        {resumeData.phone}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                        Location
                      </p>
                      <p className={isDark ? 'text-empire-text' : 'text-light-text'}>
                        {resumeData.location}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                        Website
                      </p>
                      <a 
                        href={resumeData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-empire-cyan hover:underline"
                      >
                        {resumeData.website}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    Summary
                  </h3>
                  <p className={isDark ? 'text-text-muted' : 'text-gray-600'}>
                    {resumeData.summary}
                  </p>
                </div>

                {/* Experience */}
                {resumeData.experience && resumeData.experience.length > 0 && (
                  <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>
                      Experience ({resumeData.experience.length})
                    </h3>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, idx) => (
                        <div 
                          key={idx} 
                          className={`rounded-xl p-4 ${
                            isDark ? 'bg-dark-bg' : 'bg-gray-50'
                          }`}
                        >
                          <p className="text-empire-purple font-bold">{exp.title}</p>
                          <p className={isDark ? 'text-empire-text' : 'text-light-text'}>
                            {exp.company} • {exp.location}
                          </p>
                          <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                            {exp.start_date} - {exp.end_date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education && resumeData.education.length > 0 && (
                  <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>
                      Education ({resumeData.education.length})
                    </h3>
                    <div className="space-y-4">
                      {resumeData.education.map((edu, idx) => (
                        <div 
                          key={idx} 
                          className={`rounded-xl p-4 ${
                            isDark ? 'bg-dark-bg' : 'bg-gray-50'
                          }`}
                        >
                          <p className="text-empire-cyan font-bold">{edu.degree}</p>
                          <p className={isDark ? 'text-empire-text' : 'text-light-text'}>
                            {edu.institution}
                          </p>
                          <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                            {edu.start_date} - {edu.end_date} • GPA: {edu.gpa}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {resumeData.skills && (
                  <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>
                      Skills ({Object.values(resumeData.skills).flat().length} total)
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(resumeData.skills).map(([category, skills]) => (
                        <div key={category}>
                          <span className="text-empire-cyan font-semibold">{category}: </span>
                          <span className={isDark ? 'text-text-muted' : 'text-gray-600'}>
                            {skills.join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resumeData.projects && resumeData.projects.length > 0 && (
                  <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>
                      Projects ({resumeData.projects.length})
                    </h3>
                    <div className="space-y-4">
                      {resumeData.projects.map((project, idx) => (
                        <div 
                          key={idx} 
                          className={`rounded-xl p-4 ${
                            isDark ? 'bg-dark-bg' : 'bg-gray-50'
                          }`}
                        >
                          <p className="text-empire-green font-bold">{project.name}</p>
                          <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                            {project.description}
                          </p>
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-empire-cyan hover:underline text-sm"
                            >
                              View on GitHub →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {resumeData.certifications && resumeData.certifications.length > 0 && (
                  <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>
                      Certifications ({resumeData.certifications.length})
                    </h3>
                    <div className="space-y-2">
                      {resumeData.certifications.map((cert, idx) => (
                        <div key={idx} className={isDark ? 'text-text-muted' : 'text-gray-600'}>
                          <span className="text-empire-orange font-semibold">{cert.name}</span>
                          {' • '}
                          <span>{cert.issuer}</span>
                          {' • '}
                          <span className="text-sm">{cert.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!resumeData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <p className={`text-xl md:text-2xl mb-4 ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
              📄 No resume data yet
            </p>
            <p className={isDark ? 'text-text-muted' : 'text-gray-600'}>
              Download the template and upload your resume!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminResume;
