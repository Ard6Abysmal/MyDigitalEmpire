// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackDownload, trackButtonClick } from '../services/analytics';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  const skills = {
    programming: [
      { name: 'Python', badge: 'Expert', years: '3+', icon: '🐍', color: 'empire-purple' },
      { name: 'C/C++', badge: 'Expert', years: '3+', icon: '⚡', color: 'empire-cyan' },
      { name: 'JavaScript', badge: 'Proficient', years: '2+', icon: '💛', color: 'empire-green' },
      { name: 'C#', badge: 'Intermediate', years: '1+', icon: '🔷', color: 'empire-orange' },
      { name: 'Java', badge: 'Intermediate', years: '1+', icon: '☕', color: 'empire-pink' },
      { name: 'MATLAB', badge: 'Proficient', years: '2+', icon: '📊', color: 'empire-purple' },
    ],
    webDev: [
      { name: 'HTML/CSS', badge: 'Expert', years: '2+', icon: '🎨', color: 'empire-cyan' },
      { name: 'React', badge: 'Advanced', years: '1+', icon: '⚛️', color: 'empire-green' },
      { name: 'Node.js', badge: 'Intermediate', years: '1+', icon: '🟢', color: 'empire-orange' },
      { name: 'FastAPI', badge: 'Advanced', years: '1+', icon: '⚡', color: 'empire-pink' },
      { name: 'Firebase', badge: 'Learning', years: '1+', icon: '🔥', color: 'empire-purple' },
    ],
    aiML: [
      { name: 'PyTorch', badge: 'Advanced', years: '2+', icon: '🔥', color: 'empire-purple' },
      { name: 'TensorFlow', badge: 'Intermediate', years: '1+', icon: '🧠', color: 'empire-cyan' },
      { name: 'Computer Vision', badge: 'Advanced', years: '2+', icon: '👁️', color: 'empire-green' },
      { name: 'Deep Learning', badge: 'Advanced', years: '2+', icon: '🤖', color: 'empire-orange' },
    ],
    vlsiHardware: [
      { name: 'Verilog', badge: 'Learning', years: '1+', icon: '⚙️', color: 'empire-purple' },
      { name: 'SystemVerilog', badge: 'Learning', years: '1+', icon: '🔬', color: 'empire-cyan' },
      { name: 'Vivado Xilinx', badge: 'Learning', years: '1+', icon: '💎', color: 'empire-green' },
      { name: 'Cadence', badge: 'Learning', years: '1+', icon: '🛠️', color: 'empire-orange' },
      { name: 'Synopsys', badge: 'Learning', years: '1+', icon: '🔧', color: 'empire-pink' },
    ],
    embedded: [
      { name: 'Arduino', badge: 'Advanced', years: '3+', icon: '🔌', color: 'empire-purple' },
      { name: 'Embedded C', badge: 'Expert', years: '3+', icon: '💾', color: 'empire-cyan' },
      { name: 'Sensors & IoT', badge: 'Advanced', years: '3+', icon: '📡', color: 'empire-green' },
      { name: 'UART/I2C/SPI', badge: 'Advanced', years: '2+', icon: '🔗', color: 'empire-orange' },
      { name: 'RTOS', badge: 'Learning', years: '1+', icon: '⏱️', color: 'empire-pink' },
    ],
  };

  const currentWork = [
    {
      title: 'BlueDepth-Crescent',
      description: 'Underwater image enhancement using UNet deep learning for low-visibility environments',
      status: 'Active Development',
      tech: ['PyTorch', 'Computer Vision', 'CUDA', 'GPU Optimization'],
      icon: '🌊',
    },
    {
      title: 'Digital Empire Portfolio',
      description: 'Full-stack portfolio ecosystem with AI chatbot, admin dashboard, and analytics',
      status: 'In Progress',
      tech: ['React', 'FastAPI', 'Groq AI', 'SQLite'],
      icon: '🚀',
    },
    {
      title: 'M.Tech VLSI Research',
      description: 'Neuromorphic circuits, graphene-based electronics, and edge computing systems',
      status: 'Research Phase',
      tech: ['VLSI Design', 'Neuromorphic', 'Graphene', 'Edge AI'],
      icon: '⚡',
    },
  ];

  const undergraduateProjects = [
    {
      title: 'Accident Identification & Alerting System',
      year: '2023-24',
      description: 'Designed an embedded system to detect vehicle accidents using accelerometer data with real-time GPS alerting via GSM.',
      role: 'Team Lead & Algorithm Designer',
      team: '3-member team',
      tech: ['Arduino', 'MPU6050', 'GSM800L', 'Neo-6M GPS', 'Embedded C'],
      outcome: 'Successfully implemented real-time accident detection with <2s response time',
      icon: '🚗',
    },
    {
      title: 'Water Quality Monitoring System',
      year: '2023',
      description: 'Developed a real-time system to monitor water safety by measuring pH, turbidity, temperature, and dissolved solids with RTOS integration.',
      role: 'System Designer & Developer',
      team: '3-member team',
      tech: ['Arduino', 'pH Sensor', 'Turbidity Sensor', 'Temperature Sensor', 'IoT', 'RTOS'],
      outcome: 'Cost-effective solution for drinking water management and environmental monitoring',
      icon: '💧',
    },
  ];

  const timeline = [
    { year: '2025-27', title: 'M.Tech in VLSI', desc: 'Pursuing postgraduate studies in VLSI design, neuromorphic circuits, and edge electronics', icon: '🎓' },
    { year: '2024', title: 'B.Tech ECE Completed', desc: 'Graduated with Electronics and Communication Engineering degree', icon: '⚡' },
    { year: '2024-Present', title: 'Web Development Journey', desc: 'freeCodeCamp & Udemy (Angela Yu) - Full-stack web development', icon: '💻' },
    { year: '2023-24', title: 'Final Year Projects', desc: 'Accident Detection System & Water Quality Monitoring - Team leadership', icon: '🚗' },
    { year: '2023', title: 'Started AI/ML Journey', desc: 'Began deep learning with PyTorch and computer vision projects', icon: '🤖' },
    { year: '2020-24', title: 'Undergraduate ECE', desc: 'Electronics & Communication Engineering - Fundamentals and hands-on projects', icon: '📚' },
  ];

  const achievements = [
    { title: 'Team Lead - Final Year Project', desc: 'Led 3-member team for Accident Detection System', icon: '👥' },
    { title: 'Electronics Club Member', desc: 'Active participation in circuit design workshops', icon: '🔧' },
    { title: 'Academic Projects', desc: 'Multiple embedded systems and IoT projects completed', icon: '🎓' },
  ];

  const handleDownloadResume = async () => {
    trackDownload('Resume.pdf');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/resume/download`);
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Amal_Madhu_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  const handleProjectClick = (projectTitle) => {
    trackButtonClick(`Current Work - ${projectTitle}`);
  };

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

        .about-block:hover .glass-overlay-dark,
        .about-block:hover .glass-overlay-light {
          opacity: 1;
        }

        /* VIVID DASH ICON */
        .dash-icon {
          display: inline-block;
          width: 20px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        /* CORE FOCUS LIST ITEM INSTANT HOVER */
        .core-focus-item {
          transition: transform 0.2s ease;
        }

        .core-focus-item:hover {
          transform: translateX(5px);
        }

        .core-focus-item:hover .dash-icon {
          transform: scaleX(1.3);
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
            <span className="gradient-text-stable">About Me</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            Electronics Engineer | M.Tech VLSI Student | Full-Stack Developer | AI/ML Enthusiast
          </p>
          
          <motion.button
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.9)] transition-all inline-flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-2xl">📄</span>
              Download Resume
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </motion.button>
        </motion.div>

        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`about-block relative mb-16 p-8 rounded-2xl border-2 shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-black text-empire-purple mb-4 flex items-center gap-3">
                <span className="text-4xl">👨‍💻</span>
                Who I Am
              </h2>
              <p className={`leading-relaxed mb-4 text-base ${
                isDark ? 'text-empire-text/90' : 'text-light-text/90'
              }`}>
                I'm <span className="font-bold text-empire-cyan">Amal Madhu</span>, an Electronics Engineer pursuing M.Tech in VLSI (2025-27) 
                with a B.Tech in Electronics and Communication Engineering (2020-24).
              </p>
              <p className={`leading-relaxed mb-4 text-base ${
                isDark ? 'text-empire-text/90' : 'text-light-text/90'
              }`}>
                Passionate about the intersection of hardware and software — from neuromorphic VLSI and graphene electronics 
                to full-stack web development, AI/ML, blockchain, and IoT systems.
              </p>
              <p className={`leading-relaxed text-base ${
                isDark ? 'text-empire-text/90' : 'text-light-text/90'
              }`}>
                My philosophy: <span className="font-bold text-empire-green">Discipline is everything</span>. 
                I believe in learning by doing, adapting through struggle, and moving forward continuously. 
                <span className="font-bold text-empire-cyan"> No peak or limit — just continuous growth and adaptation.</span>
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-black text-empire-cyan mb-4 flex items-center gap-3">
                <span className="text-4xl">🎯</span>
                Core Focus Areas
              </h2>
              <ul className="space-y-3">
                {[
                  'Neuromorphic VLSI & Edge Electronics',
                  'Embedded Systems & IoT Solutions',
                  'AI/ML - Computer Vision & Deep Learning',
                  'Full-Stack Web Development (React, FastAPI)',
                  'Cloud Computing & Distributed Systems',
                  'Blockchain, Quantum Computing & Cybersecurity',
                  'Material Technology (Graphene, Advanced Electronics)',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className={`core-focus-item flex items-center gap-3 text-base ${
                      isDark ? 'text-empire-text/90' : 'text-light-text/90'
                    }`}
                  >
                    <span className="dash-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black text-center mb-10">
            <span className="gradient-text-stable">Education</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`about-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
              }`}
            >
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              
              <div className="relative z-10">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  M.Tech in VLSI
                </h3>
                <p className="text-empire-purple font-bold text-lg mb-3">2025-27 (1st Year)</p>
                <p className={`text-base leading-relaxed ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                  Specializing in neuromorphic circuits, graphene-based electronics, and edge computing systems
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`about-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15'
              }`}
            >
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              
              <div className="relative z-10">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                  B.Tech in ECE
                </h3>
                <p className="text-empire-cyan font-bold text-lg mb-3">2020-24 (Completed)</p>
                <p className={`text-base leading-relaxed ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                  Electronics & Communication Engineering - Embedded systems, IoT, and circuit design
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Undergraduate Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black text-center mb-10">
            <span className="gradient-text-stable">Undergraduate Projects</span>
          </h2>
          <div className="space-y-8">
            {undergraduateProjects.map((project, idx) => (
              <div
                key={idx}
                className={`about-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10 flex items-start gap-6">
                  <motion.div 
                    className="text-6xl"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {project.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
                      <h3 className={`text-2xl font-black ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        {project.title}
                      </h3>
                      <span className="px-4 py-2 rounded-xl bg-empire-purple/20 border-2 border-empire-purple/40 text-empire-purple font-bold">
                        {project.year}
                      </span>
                    </div>
                    
                    <p className={`mb-4 text-base leading-relaxed ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                      {project.description}
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-5">
                      <div className={`p-3 rounded-lg border-2 ${
                        isDark ? 'bg-dark-bg/50 border-empire-cyan/30' : 'bg-light-bg/50 border-empire-cyan/25'
                      }`}>
                        <p className="text-xs text-empire-cyan font-bold mb-1">Role</p>
                        <p className={`text-sm font-semibold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>{project.role}</p>
                      </div>
                      <div className={`p-3 rounded-lg border-2 ${
                        isDark ? 'bg-dark-bg/50 border-empire-green/30' : 'bg-light-bg/50 border-empire-green/25'
                      }`}>
                        <p className="text-xs text-empire-green font-bold mb-1">Team</p>
                        <p className={`text-sm font-semibold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>{project.team}</p>
                      </div>
                      <div className={`p-3 rounded-lg border-2 ${
                        isDark ? 'bg-dark-bg/50 border-empire-orange/30' : 'bg-light-bg/50 border-empire-orange/25'
                      }`}>
                        <p className="text-xs text-empire-orange font-bold mb-1">Outcome</p>
                        <p className={`text-sm font-semibold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>{project.outcome}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <motion.span 
                          key={i}
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="text-xs px-3 py-2 rounded-lg bg-empire-purple/20 text-empire-purple border-2 border-empire-purple/40 font-bold shadow-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="gradient-text-stable">Technical Skills</span>
          </h2>
          
          <div className="mb-12">
            <h3 className="text-2xl font-black text-empire-purple mb-6 flex items-center gap-3">
              <span className="text-3xl">🐍</span>
              Programming Languages
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.programming.map((skill, idx) => (
                <SkillCardNew key={idx} skill={skill} isDark={isDark} delay={0.7 + idx * 0.05} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-black text-empire-cyan mb-6 flex items-center gap-3">
              <span className="text-3xl">🌐</span>
              Web Development
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.webDev.map((skill, idx) => (
                <SkillCardNew key={idx} skill={skill} isDark={isDark} delay={0.8 + idx * 0.05} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-black text-empire-green mb-6 flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              AI/ML & Data Science
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.aiML.map((skill, idx) => (
                <SkillCardNew key={idx} skill={skill} isDark={isDark} delay={0.9 + idx * 0.05} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-black text-empire-pink mb-6 flex items-center gap-3">
              <span className="text-3xl">💎</span>
              VLSI & Hardware Design
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.vlsiHardware.map((skill, idx) => (
                <SkillCardNew key={idx} skill={skill} isDark={isDark} delay={1.0 + idx * 0.05} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-empire-orange mb-6 flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              Embedded Systems & Electronics
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.embedded.map((skill, idx) => (
                <SkillCardNew key={idx} skill={skill} isDark={isDark} delay={1.1 + idx * 0.05} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Currently Working On */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="gradient-text-stable">Currently Working On</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentWork.map((project, idx) => (
              <div
                key={project.title}
                onClick={() => handleProjectClick(project.title)}
                className={`about-block relative p-8 rounded-2xl border-2 shadow-xl cursor-pointer overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-6xl mb-5"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {project.icon}
                  </motion.div>
                  <h3 className={`text-xl font-black mb-3 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>{project.title}</h3>
                  <p className={`text-sm mb-5 leading-relaxed ${
                    isDark ? 'text-text-muted' : 'text-gray-600'
                  }`}>{project.description}</p>
                  
                  <div className="mb-5">
                    <span className={`inline-block px-4 py-2 rounded-xl text-xs font-black border-2 ${
                      project.status === 'Active Development' ? 'bg-empire-green/25 text-empire-green border-empire-green/50' :
                      project.status === 'In Progress' ? 'bg-empire-cyan/25 text-empire-cyan border-empire-cyan/50' :
                      'bg-empire-orange/25 text-empire-orange border-empire-orange/50'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <motion.span 
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-xs px-3 py-1.5 rounded-lg bg-empire-purple/20 text-empire-purple border-2 border-empire-purple/40 font-bold"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black text-center mb-10">
            <span className="gradient-text-stable">Achievements & Leadership</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`about-block relative p-8 rounded-2xl border-2 text-center shadow-xl overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-pink/30 hover:border-empire-pink/60 hover:shadow-2xl hover:shadow-empire-pink/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-pink/25 hover:border-empire-pink/50 hover:shadow-2xl hover:shadow-empire-pink/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <h3 className={`text-lg font-black mb-3 ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                    {achievement.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="gradient-text-stable">Journey Timeline</span>
          </h2>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-empire-purple via-empire-cyan to-empire-green rounded-full"></div>
            
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + idx * 0.15 }}
                className={`relative flex items-center mb-16 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`about-block relative p-6 rounded-2xl border-2 shadow-lg overflow-hidden ${
                      isDark 
                        ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-xl hover:shadow-empire-purple/20' 
                        : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-xl hover:shadow-empire-purple/15'
                    }`}
                  >
                    <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                    <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                    
                    <div className="relative z-10">
                      <div className={`flex items-center gap-3 mb-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-empire-purple font-black text-lg">{item.year}</span>
                      </div>
                      <h3 className={`text-xl font-black mb-2 ${
                        isDark ? 'text-empire-text' : 'text-light-text'
                      }`}>{item.title}</h3>
                      <p className={`text-sm leading-relaxed ${
                        isDark ? 'text-text-muted' : 'text-gray-600'
                      }`}>{item.desc}</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-empire-purple border-4 shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10 ${
                    isDark ? 'border-true-black' : 'border-white'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className={`about-block relative mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
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
              💪
            </motion.div>
            <h2 className="text-3xl font-black text-empire-purple mb-5">My Philosophy</h2>
            <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-empire-text/90' : 'text-light-text/90'
            }`}>
              <span className="font-bold text-empire-cyan">Discipline</span> is the foundation of everything I do. 
              I approach life with a <span className="font-bold text-empire-green">cold, calculated mindset</span> and 
              officer-like qualities, constantly improving each day. I believe in{' '}
              <span className="font-bold text-empire-purple">learning by doing</span> — struggle is part of growth. 
              Survival instinct drives me forward. <span className="font-bold text-empire-cyan">No peak or limit — just continuous growth and adaptation.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// SKILL CARD COMPONENT
const SkillCardNew = ({ skill, isDark, delay }) => {
  const colorMap = {
    'empire-purple': { bg: 'bg-empire-purple/20', text: 'text-empire-purple', border: 'border-empire-purple/50' },
    'empire-cyan': { bg: 'bg-empire-cyan/20', text: 'text-empire-cyan', border: 'border-empire-cyan/50' },
    'empire-green': { bg: 'bg-empire-green/20', text: 'text-empire-green', border: 'border-empire-green/50' },
    'empire-orange': { bg: 'bg-empire-orange/20', text: 'text-empire-orange', border: 'border-empire-orange/50' },
    'empire-pink': { bg: 'bg-empire-pink/20', text: 'text-empire-pink', border: 'border-empire-pink/50' },
  };

  const colors = colorMap[skill.color];

  return (
    <div
      className={`about-block relative p-6 rounded-xl border-2 shadow-lg overflow-hidden transition-all duration-200 ${
        isDark 
          ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-xl hover:shadow-empire-purple/20 hover:-translate-y-2 hover:scale-[1.02]' 
          : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-xl hover:shadow-empire-purple/15 hover:-translate-y-2 hover:scale-[1.02]'
      }`}
    >
      <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
      <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span 
              className="text-3xl"
              whileHover={{ scale: 1.15, rotate: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {skill.icon}
            </motion.span>
            <span className={`font-black text-lg ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
              {skill.name}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <span className={`flex-1 px-4 py-2 rounded-lg border-2 ${colors.bg} ${colors.text} ${colors.border} font-bold text-sm text-center`}>
            {skill.badge}
          </span>
          <span className={`px-4 py-2 rounded-lg border-2 font-bold text-sm ${
            isDark ? 'bg-dark-bg/50 border-empire-purple/30 text-empire-text' : 'bg-light-bg/50 border-empire-purple/25 text-light-text'
          }`}>
            {skill.years} yrs
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
