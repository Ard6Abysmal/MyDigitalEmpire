// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackDownload, trackButtonClick } from '../services/analytics'; // NEW

const About = () => {
  const skills = [
    { name: 'Python', level: 'Expert', years: '3+ years', color: 'empire-purple', stars: 5 },
    { name: 'JavaScript/React', level: 'Advanced', years: '2+ years', color: 'empire-cyan', stars: 4 },
    { name: 'FastAPI/Django', level: 'Advanced', years: '2+ years', color: 'empire-green', stars: 4 },
    { name: 'AI/ML (PyTorch)', level: 'Intermediate', years: '1+ year', color: 'empire-orange', stars: 3 },
    { name: 'Blockchain/Web3', level: 'Intermediate', years: '1+ year', color: 'empire-pink', stars: 3 },
    { name: 'Computer Vision', level: 'Advanced', years: '2+ years', color: 'empire-purple', stars: 4 },
    { name: 'DevOps/Docker', level: 'Intermediate', years: '1+ year', color: 'empire-cyan', stars: 3 },
    { name: 'SQL/NoSQL', level: 'Advanced', years: '2+ years', color: 'empire-green', stars: 4 },
  ];

  const currentWork = [
    {
      title: 'BlueDepth AI',
      description: 'Underwater image enhancement using UNet deep learning',
      status: 'Active Development',
      tech: ['PyTorch', 'Computer Vision', 'CUDA'],
      icon: '🌊',
    },
    {
      title: 'Digital Empire Portfolio',
      description: 'Full-stack portfolio with AI chatbot integration',
      status: 'In Progress',
      tech: ['React', 'FastAPI', 'Groq AI'],
      icon: '🚀',
    },
    {
      title: 'Blockchain Gaming Tokens',
      description: 'Web3 token system for gaming achievements',
      status: 'Research Phase',
      tech: ['Solidity', 'Ethereum', 'Web3.js'],
      icon: '🎮',
    },
  ];

  const timeline = [
    { year: '2024-Present', title: 'Computer Science Student', desc: 'Deep Learning & Full-Stack Development' },
    { year: '2023', title: 'Started AI/ML Journey', desc: 'Began learning PyTorch and Computer Vision' },
    { year: '2022', title: 'Web Development', desc: 'Mastered React, Node.js, and FastAPI' },
  ];

  // Color mapping for inline styles (Tailwind can't do dynamic class names)
  const colorMap = {
    'empire-purple': '#a855f7',
    'empire-cyan': '#06b6d4',
    'empire-green': '#10b981',
    'empire-orange': '#f97316',
    'empire-pink': '#ec4899',
  };

  // Handle resume download with analytics tracking
  const handleDownloadResume = async () => {
    // Track download event
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
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  // Track project card clicks
  const handleProjectClick = (projectTitle) => {
    trackButtonClick(`Current Work - ${projectTitle}`);
  };

  return (
    <div className="relative min-h-screen bg-true-black pt-24 pb-16">
      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            A passionate developer building ambitious projects across AI, Web3, and Full-Stack development.
            Learning fast, building faster.
          </p>
          
          {/* Download Resume Button */}
          <motion.button
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all inline-flex items-center gap-2"
          >
            <span>📄</span>
            Download Resume
          </motion.button>
        </motion.div>

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-dark-surface to-dark-bg border border-dark-border shadow-[0_0_50px_rgba(168,85,247,0.1)]"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-empire-purple mb-4">Who I Am</h2>
              <p className="text-empire-text/80 leading-relaxed mb-4">
                I'm a computer science student with a burning passion for creating technology that matters.
                From deep learning models for underwater image enhancement to blockchain-powered gaming systems,
                I love tackling complex challenges.
              </p>
              <p className="text-empire-text/80 leading-relaxed">
                My journey started with curiosity about how things work and evolved into a mission to build
                an entire "Digital Empire" of interconnected projects spanning AI, gaming, blockchain, and beyond.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-empire-cyan mb-4">What Drives Me</h2>
              <ul className="space-y-3">
                {[
                  'Building production-ready AI/ML solutions',
                  'Creating full-stack applications from scratch',
                  'Exploring blockchain and Web3 technologies',
                  'Learning new frameworks and tools constantly',
                  'Sharing knowledge with the dev community',
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 text-empire-text/80"
                  >
                    <span className="text-empire-green text-xl">✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Skills Proficiency - UPDATED VERSION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
            Skills & Proficiency
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="p-6 rounded-xl bg-dark-surface border border-dark-border hover:border-empire-purple/50 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-empire-text font-semibold text-lg">{skill.name}</span>
                  <span 
                    className="font-bold text-sm px-3 py-1 rounded-full border"
                    style={{
                      color: colorMap[skill.color],
                      backgroundColor: `${colorMap[skill.color]}10`,
                      borderColor: `${colorMap[skill.color]}30`,
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
                
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 + i * 0.05 }}
                      className={`text-2xl ${i < skill.stars ? 'text-yellow-400' : 'text-gray-700'}`}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                
                <p className="text-text-muted text-sm">{skill.years} experience</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently Working On */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-empire-cyan to-empire-green bg-clip-text text-transparent">
            Currently Working On
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {currentWork.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project.title)}
                className="p-6 rounded-2xl bg-gradient-to-br from-dark-surface to-dark-bg border border-dark-border hover:border-empire-cyan/50 transition-all shadow-lg cursor-pointer"
              >
                <div className="text-5xl mb-4 animate-float">{project.icon}</div>
                <h3 className="text-xl font-bold text-empire-text mb-2">{project.title}</h3>
                <p className="text-text-muted text-sm mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-empire-green/20 text-empire-green border border-empire-green/30">
                    {project.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-empire-purple/10 text-empire-purple border border-empire-purple/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-empire-pink to-empire-orange bg-clip-text text-transparent">
            Journey Timeline
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-empire-purple via-empire-cyan to-empire-green"></div>
            
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.2 }}
                className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="p-4 rounded-xl bg-dark-surface border border-dark-border hover:border-empire-purple/50 transition-all">
                    <span className="text-empire-purple font-bold">{item.year}</span>
                    <h3 className="text-xl font-bold text-empire-text mt-2">{item.title}</h3>
                    <p className="text-text-muted text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-empire-purple border-4 border-true-black shadow-[0_0_20px_rgba(168,85,247,0.8)]"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
