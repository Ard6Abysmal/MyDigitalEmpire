// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const [meshActive, setMeshActive] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      <ParticleBackground theme="default" />
      
      {/* Hero Section: Split Screen - Full viewport height */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-stretch">
        
        {/* LEFT SIDE: Profile Photo - 40% width, centered */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
          className="w-full md:w-[40%] flex items-center justify-center p-8 md:p-12"
          onMouseEnter={() => setMeshActive(true)}
          onMouseLeave={() => setMeshActive(false)}
        >
          <div className="relative group">
            {/* Main Photo Container */}
            <div 
              className="relative rounded-3xl bg-gradient-to-br from-empire-purple via-empire-pink to-empire-cyan p-2 shadow-[0_0_80px_rgba(168,85,247,0.8)]"
              style={{
                width: 'min(80vw, 400px)',
                height: 'min(70vh, 520px)',
              }}
            >
              <div className={`w-full h-full rounded-3xl overflow-hidden relative ${
                isDark ? 'bg-dark-surface' : 'bg-light-surface'
              }`}>
                {/* Your Photo */}
                <img 
                  src="/your-photo.jpg" 
                  alt="Amal Madhu" 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x520/a855f7/ffffff?text=Amal+Madhu';
                  }}
                />
                
                {/* Animated Mesh Overlay */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    meshActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, rgba(168, 85, 247, 0.4) 0px, transparent 1px, transparent 12px, rgba(168, 85, 247, 0.4) 13px),
                      repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.4) 0px, transparent 1px, transparent 12px, rgba(6, 182, 212, 0.4) 13px)
                    `,
                  }}
                >
                  {/* Animated scan lines */}
                  <motion.div
                    animate={{ y: ['0%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute w-full h-2 bg-gradient-to-r from-transparent via-empire-cyan to-transparent opacity-80 blur-sm"
                  />
                  
                  {/* Face detection corners */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-4 border-2 border-empire-green rounded-2xl"
                  >
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-empire-green"></div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-empire-green"></div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-empire-green"></div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-empire-green"></div>
                  </motion.div>
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-3 left-3 w-10 h-10 border-l-4 border-t-4 border-empire-purple"></div>
                <div className="absolute top-3 right-3 w-10 h-10 border-r-4 border-t-4 border-empire-cyan"></div>
                <div className="absolute bottom-3 left-3 w-10 h-10 border-l-4 border-b-4 border-empire-green"></div>
                <div className="absolute bottom-3 right-3 w-10 h-10 border-r-4 border-b-4 border-empire-pink"></div>
              </div>
            </div>

            {/* Floating Status Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-empire-green px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-20 ${
                isDark ? 'text-true-black border-2 border-true-black' : 'text-white border-2 border-white'
              }`}
            >
              <span className={`inline-block w-2 h-2 rounded-full animate-pulse mr-2 ${
                isDark ? 'bg-true-black' : 'bg-white'
              }`}></span>
              Open to Opportunities
            </motion.div>
          </div>
        </motion.div>

        {/* VERTICAL DIVIDER - Hidden on mobile */}
        <div className="hidden md:flex relative items-center justify-center w-px">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className={`w-px h-[80%] relative ${
              isDark 
                ? 'bg-gradient-to-b from-transparent via-empire-purple to-transparent' 
                : 'bg-gradient-to-b from-transparent via-empire-purple/50 to-transparent'
            }`}
          >
            {/* Animated glow pulse */}
            <motion.div
              animate={{ y: ['0%', '100%', '0%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-1/2 transform -translate-x-1/2 w-2 h-24 bg-gradient-to-b from-empire-cyan via-empire-purple to-empire-green blur-md opacity-60"
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE: Name & Professional Info - 60% width */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-full md:w-[60%] flex flex-col justify-center p-8 md:p-12 md:pr-16 text-center md:text-left"
        >
          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-empire-purple via-empire-cyan to-empire-green bg-clip-text text-transparent">
              Amal Madhu
            </span>
          </motion.h1>
          
          {/* Role Tags - Compact */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6"
          >
            <span className="px-3 py-1.5 bg-empire-purple/20 border border-empire-purple rounded-full text-empire-purple font-semibold text-xs">
              Electronics Engineer
            </span>
            <span className="px-3 py-1.5 bg-empire-cyan/20 border border-empire-cyan rounded-full text-empire-cyan font-semibold text-xs">
              VLSI & Embedded
            </span>
            <span className="px-3 py-1.5 bg-empire-green/20 border border-empire-green rounded-full text-empire-green font-semibold text-xs">
              Full Stack Dev
            </span>
            <span className="px-3 py-1.5 bg-empire-pink/20 border border-empire-pink rounded-full text-empire-pink font-semibold text-xs">
              AI/ML Engineer
            </span>
          </motion.div>

          {/* Professional Summary - Crisp & Brief (4-6 lines max) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`mb-6 leading-relaxed text-base md:text-lg ${
              isDark ? 'text-text-muted' : 'text-light-muted'
            }`}
          >
            <p className="mb-3">
              <span className="text-empire-purple font-bold">M.Tech VLSI</span> student with B.Tech in ECE (2020-24), 
              specializing in <span className="text-empire-cyan font-semibold">neuromorphic circuits</span>, 
              edge AI, and <span className="text-empire-green font-semibold">embedded systems</span>.
            </p>
            <p className="mb-3">
              Building intelligent systems at the intersection of hardware & software — from VLSI design to 
              full-stack web apps, AI/ML models to IoT solutions.
            </p>
            <p>
              Discipline-driven with an officer-like mindset. Believer in learning by doing, adapting through struggle. 
              <span className="text-empire-cyan font-bold"> No peak, just continuous growth.</span>
            </p>
          </motion.div>

          {/* Current Focus - Compact Info Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`mb-6 p-4 rounded-xl border ${
              isDark 
                ? 'bg-dark-surface/50 border-dark-border' 
                : 'bg-light-surface/50 border-light-border'
            }`}
          >
            <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
              <span className="font-bold text-empire-purple">Currently:</span> M.Tech VLSI (2025-27) | 
              freeCodeCamp + Udemy Web Dev | Python, C++, JavaScript | OpenCL, Graphene, Quantum
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <Link
              to="/projects"
              className="group relative px-8 py-3.5 bg-gradient-to-r from-empire-purple to-empire-cyan rounded-xl font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all overflow-hidden"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Link>
            
            <Link
              to="/contact"
              className={`px-8 py-3.5 border-2 border-empire-purple rounded-xl font-bold transition-all ${
                isDark 
                  ? 'bg-transparent text-empire-purple hover:bg-empire-purple hover:text-white' 
                  : 'bg-transparent text-empire-purple hover:bg-empire-purple hover:text-white'
              }`}
            >
              Get In Touch
            </Link>

            <a
              href="/resume.pdf"
              download
              className={`px-8 py-3.5 border-2 rounded-xl font-bold transition-all ${
                isDark 
                  ? 'border-empire-cyan text-empire-cyan hover:bg-empire-cyan hover:text-true-black' 
                  : 'border-empire-cyan text-empire-cyan hover:bg-empire-cyan hover:text-white'
              }`}
            >
              📄 Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional Info Strip - Below Hero (Horizontal) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className={`relative z-10 border-t ${
          isDark ? 'border-dark-border bg-dark-surface/30' : 'border-light-border bg-light-surface/30'
        } backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Education */}
            <div className="text-center md:text-left">
              <h3 className="text-empire-purple font-bold mb-2 text-sm uppercase tracking-wider">Education</h3>
              <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                B.Tech ECE (2020-24) • M.Tech VLSI (2025-27)
              </p>
            </div>

            {/* Skills Highlight */}
            <div className="text-center">
              <h3 className="text-empire-cyan font-bold mb-2 text-sm uppercase tracking-wider">Core Skills</h3>
              <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                Python • C++ • JavaScript • VLSI • Embedded • AI/ML • Web Dev
              </p>
            </div>

            {/* Interests */}
            <div className="text-center md:text-right">
              <h3 className="text-empire-green font-bold mb-2 text-sm uppercase tracking-wider">Interests</h3>
              <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                Neuromorphic VLSI • Graphene • Quantum • Blockchain • IoT
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-empire-purple rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-empire-purple rounded-full"
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
