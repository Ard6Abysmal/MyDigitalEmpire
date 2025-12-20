// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  
  // Scroll indicator state
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [scrollIndicatorCount, setScrollIndicatorCount] = useState(0);
  const [lastResetTime, setLastResetTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 50;
      
      const currentTime = Date.now();
      const timeElapsed = currentTime - lastResetTime;

      if (timeElapsed > 60000) {
        setScrollIndicatorCount(0);
        setLastResetTime(currentTime);
      }

      if (scrolledToBottom) {
        setShowScrollIndicator(false);
        if (scrollIndicatorCount < 3) {
          setScrollIndicatorCount(prev => prev + 1);
        }
      } else if (scrollTop < 100) {
        if (scrollIndicatorCount < 3 || timeElapsed > 60000) {
          setShowScrollIndicator(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollIndicatorCount, lastResetTime]);

  return (
    <div className={`relative min-h-screen overflow-hidden ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* NAME SHIMMER EFFECT */
        @keyframes nameShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .gradient-text-shimmer {
          background: linear-gradient(
            90deg,
            #a855f7 0%,
            #a855f7 30%,
            #06b6d4 50%,
            #10b981 70%,
            #a855f7 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: nameShimmer 3s linear infinite;
          padding: 0.1em 0;
          line-height: 1.2;
        }

        /* BUTTON SLOW SHIMMER */
        .button-shimmer-dark::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          animation: buttonShimmer 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .button-shimmer-light::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.35),
            transparent
          );
          animation: buttonShimmer 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes buttonShimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        /* ULTRA-SMOOTH SYNCHRONIZED MESH + SHIMMER DIAGONAL - SLOWER & BUTTER */
        .mesh-shimmer-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .mesh-shimmer-diagonal {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            linear-gradient(
              135deg,
              transparent 0%,
              transparent 40%,
              rgba(168, 85, 247, 0.5) 48%,
              rgba(6, 182, 212, 0.5) 52%,
              transparent 60%,
              transparent 100%
            ),
            repeating-linear-gradient(
              0deg, 
              rgba(168, 85, 247, 0.5) 0px, 
              transparent 1px, 
              transparent 14px, 
              rgba(168, 85, 247, 0.5) 15px
            ),
            repeating-linear-gradient(
              90deg, 
              rgba(6, 182, 212, 0.5) 0px, 
              transparent 1px, 
              transparent 14px, 
              rgba(6, 182, 212, 0.5) 15px
            );
          mask-image: linear-gradient(
            135deg,
            transparent 0%,
            transparent 38%,
            black 46%,
            black 54%,
            transparent 62%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            135deg,
            transparent 0%,
            transparent 38%,
            black 46%,
            black 54%,
            transparent 62%,
            transparent 100%
          );
          animation: meshDiagonalUltraSmooth 7s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        @keyframes meshDiagonalUltraSmooth {
          0% { 
            transform: translate(-70%, -70%);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% { 
            transform: translate(70%, 70%);
            opacity: 0;
          }
        }

        /* PROFILE CORNER SHIMMER - PERFECTLY SYNCED & SLOWER */
        .profile-corner-shimmer {
          position: relative;
          overflow: hidden;
        }

        .profile-corner-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(168, 85, 247, 0.6) 50%,
            transparent 60%
          );
          animation: cornerShimmerUltraSmooth 7s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          pointer-events: none;
          z-index: 3;
        }

        @keyframes cornerShimmerUltraSmooth {
          0% { 
            transform: translate(-70%, -70%);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% { 
            transform: translate(70%, 70%);
            opacity: 0;
          }
        }

        /* 3D DEPTH SHADOW */
        .depth-shadow-dark {
          position: absolute;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          height: 35px;
          background: radial-gradient(
            ellipse at center,
            rgba(168, 85, 247, 0.6) 0%,
            rgba(168, 85, 247, 0.4) 30%,
            rgba(168, 85, 247, 0.2) 60%,
            transparent 80%
          );
          filter: blur(12px);
          opacity: 0.8;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: -1;
        }

        .depth-shadow-light {
          position: absolute;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          height: 35px;
          background: radial-gradient(
            ellipse at center,
            rgba(168, 85, 247, 0.5) 0%,
            rgba(168, 85, 247, 0.35) 30%,
            rgba(168, 85, 247, 0.18) 60%,
            transparent 80%
          );
          filter: blur(12px);
          opacity: 0.9;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: -1;
        }

        .depth-shadow-hover {
          width: 65%;
          height: 22px;
          opacity: 0.5;
          filter: blur(18px);
        }

        /* CONTINUOUS SHIMMER FOR INFO BLOCKS */
        .continuous-shimmer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: continuousShimmer 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .continuous-shimmer-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.25),
            transparent
          );
          animation: continuousShimmer 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes continuousShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Glass morphism overlay */
        .glass-overlay-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.15) 0%,
            rgba(6, 182, 212, 0.1) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }

        .glass-overlay-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.1) 0%,
            rgba(6, 182, 212, 0.08) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }

        .home-block:hover .glass-overlay-dark,
        .home-block:hover .glass-overlay-light {
          opacity: 1;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      {/* Hero Section: Split Screen with top padding for nav clearance */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-stretch gap-0 md:gap-0 pt-20 md:pt-20 pb-6 md:pb-0">
        
        {/* LEFT SIDE: Profile Photo - OPTIMIZED SIZE */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
          className="w-full md:w-[40%] md:max-w-[480px] flex items-center justify-center px-4 py-3 md:p-6 lg:p-8 relative flex-shrink-0"
        >
          <div 
            className="relative group w-full max-w-[320px] md:max-w-[420px]" 
            style={{ perspective: '2000px' }}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            {/* Main Photo Container - OPTIMIZED */}
            <motion.div 
              animate={isProfileHovered ? {
                rotateY: 10,
                rotateX: -5,
                scale: 1.04,
                z: 40,
                x: -10
              } : {
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                z: 0,
                x: 0
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="profile-corner-shimmer relative rounded-3xl bg-gradient-to-br from-empire-purple via-empire-pink to-empire-cyan p-2 shadow-[0_0_80px_rgba(168,85,247,0.8)]"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className={`w-full h-full rounded-3xl overflow-hidden relative ${
                isDark ? 'bg-dark-surface' : 'bg-light-surface'
              }`}>
                <motion.img 
                  src="/your-photo.jpg" 
                  alt="Amal Madhu" 
                  className="w-full h-full object-cover"
                  animate={isProfileHovered ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x520/a855f7/ffffff?text=Amal+Madhu';
                  }}
                />
                
                {/* ULTRA-SMOOTH SYNCHRONIZED MESH + SHIMMER */}
                <div className="mesh-shimmer-overlay">
                  <div className="mesh-shimmer-diagonal" />
                  
                  {/* Animated scan lines - SYNCED & SLOWER */}
                  <motion.div
                    animate={{ y: ['0%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                    className="absolute w-full h-3 bg-gradient-to-r from-transparent via-empire-cyan to-transparent opacity-50 blur-sm"
                  />
                  
                  {/* Face detection corners - SYNCED */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
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
            </motion.div>

            {/* 3D DEPTH SHADOW */}
            <div className={`${isDark ? 'depth-shadow-dark' : 'depth-shadow-light'} ${isProfileHovered ? 'depth-shadow-hover' : ''}`} />
          </div>
        </motion.div>

        {/* HORIZONTAL DIVIDER - Below profile (mobile only) */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="md:hidden relative w-full py-2"
        >
          <div className="w-full px-8">
            {/* Main dim gradient line */}
            <div 
              className="h-[2px] w-full rounded-full"
              style={{
                background: isDark 
                  ? 'linear-gradient(to right, transparent, rgba(168, 85, 247, 0.4) 20%, rgba(6, 182, 212, 0.4) 50%, rgba(16, 185, 129, 0.4) 80%, transparent)' 
                  : 'linear-gradient(to right, transparent, rgba(168, 85, 247, 0.25) 20%, rgba(6, 182, 212, 0.25) 50%, rgba(16, 185, 129, 0.25) 80%, transparent)'
              }}
            />
            {/* 3D Shadow underneath */}
            <div 
              className="h-[4px] -mt-[2px] w-full"
              style={{
                background: isDark 
                  ? 'linear-gradient(to bottom, rgba(168, 85, 247, 0.2), transparent)' 
                  : 'linear-gradient(to bottom, rgba(168, 85, 247, 0.12), transparent)',
                filter: 'blur(3px)'
              }}
            />
          </div>
        </motion.div>

        {/* VERTICAL DIVIDER - Desktop only */}
        <div className="hidden md:flex relative items-center justify-center w-[16px] flex-shrink-0">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-[2px] h-[80%] relative rounded-full overflow-hidden"
          >
            {/* Animated 4-color cycling gradient */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(to bottom, transparent, #a855f7 25%, #06b6d4 50%, #10b981 75%, transparent)',
                  'linear-gradient(to bottom, transparent, #06b6d4 25%, #10b981 50%, #ec4899 75%, transparent)',
                  'linear-gradient(to bottom, transparent, #10b981 25%, #ec4899 50%, #a855f7 75%, transparent)',
                  'linear-gradient(to bottom, transparent, #ec4899 25%, #a855f7 50%, #06b6d4 75%, transparent)',
                  'linear-gradient(to bottom, transparent, #a855f7 25%, #06b6d4 50%, #10b981 75%, transparent)'
                ]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-full h-full"
            />
            {/* 3D Shadow effect on both sides */}
            <div 
              className="absolute top-0 bottom-0 -left-[3px] w-[3px] opacity-30"
              style={{
                background: isDark 
                  ? 'linear-gradient(to right, rgba(168, 85, 247, 0.4), transparent)' 
                  : 'linear-gradient(to right, rgba(168, 85, 247, 0.3), transparent)',
                filter: 'blur(2px)'
              }}
            />
            <div 
              className="absolute top-0 bottom-0 -right-[3px] w-[3px] opacity-30"
              style={{
                background: isDark 
                  ? 'linear-gradient(to left, rgba(6, 182, 212, 0.4), transparent)' 
                  : 'linear-gradient(to left, rgba(6, 182, 212, 0.3), transparent)',
                filter: 'blur(2px)'
              }}
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE: Name & Info */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-full md:flex-1 flex flex-col justify-center px-4 py-3 md:p-6 lg:p-10 lg:pr-14 text-center md:text-left relative"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
          >
            <span className="gradient-text-shimmer">Amal Madhu</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6"
          >
            <motion.span 
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-3 py-1.5 bg-empire-purple/20 border-2 border-empire-purple/40 rounded-full text-empire-purple font-bold text-xs cursor-default"
            >
              Electronics Engineer
            </motion.span>
            <motion.span 
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-3 py-1.5 bg-empire-cyan/20 border-2 border-empire-cyan/40 rounded-full text-empire-cyan font-bold text-xs cursor-default"
            >
              VLSI Researcher
            </motion.span>
            <motion.span 
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-3 py-1.5 bg-empire-green/20 border-2 border-empire-green/40 rounded-full text-empire-green font-bold text-xs cursor-default"
            >
              Full-Stack Developer
            </motion.span>
            <motion.span 
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-3 py-1.5 bg-empire-pink/20 border-2 border-empire-pink/40 rounded-full text-empire-pink font-bold text-xs cursor-default"
            >
              AI/ML Enthusiast
            </motion.span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`mb-6 leading-relaxed text-sm sm:text-base md:text-lg ${
              isDark ? 'text-text-muted' : 'text-light-muted'
            }`}
          >
            <p className="mb-3">
              <span className="text-empire-purple font-bold">M.Tech VLSI</span> student (2025-27) with B.Tech ECE, 
              specializing in <span className="text-empire-cyan font-semibold">neuromorphic circuits</span>, 
              graphene electronics, and <span className="text-empire-green font-semibold">edge AI systems</span>.
            </p>
            <p className="mb-3">
              Building at the intersection of hardware & software — from deep learning models to embedded IoT, 
              full-stack web apps to VLSI design. Exploring quantum, blockchain, and advanced material tech.
            </p>
            <p>
              <span className="text-empire-orange font-bold">Discipline-driven</span> with an officer-like mindset. 
              Learning by doing, adapting through struggle. 
              <span className="text-empire-cyan font-bold"> No peak or limit — just continuous growth and adaptation.</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link
                to="/projects"
                className={`relative block px-6 md:px-8 py-3 md:py-3.5 bg-gradient-to-r from-empire-purple to-empire-cyan rounded-xl font-bold text-sm md:text-base text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all overflow-hidden ${
                  isDark ? 'button-shimmer-dark' : 'button-shimmer-light'
                }`}
              >
                <span className="relative z-10">View Projects</span>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link
                to="/contact"
                className={`relative block px-6 md:px-8 py-3 md:py-3.5 border-2 rounded-xl font-bold text-sm md:text-base transition-all overflow-hidden ${
                  isDark 
                    ? 'button-shimmer-dark bg-transparent border-empire-purple text-empire-purple hover:bg-empire-purple hover:text-white' 
                    : 'button-shimmer-light bg-transparent border-empire-purple text-empire-purple hover:bg-empire-purple hover:text-white'
                }`}
              >
                <span className="relative z-10">Get In Touch</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Info Blocks */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-6 md:mt-0"
      >
        {/* DIM 3D Shadow Divider ABOVE info blocks - Full width */}
        <div className="relative w-full">
          {/* Main dim gradient line - full width */}
          <div 
            className="h-[1px] w-full"
            style={{
              background: isDark 
                ? 'linear-gradient(to right, transparent 5%, rgba(168, 85, 247, 0.2) 25%, rgba(6, 182, 212, 0.2) 50%, rgba(16, 185, 129, 0.2) 75%, transparent 95%)' 
                : 'linear-gradient(to right, transparent 5%, rgba(168, 85, 247, 0.12) 25%, rgba(6, 182, 212, 0.12) 50%, rgba(16, 185, 129, 0.12) 75%, transparent 95%)'
            }}
          />
          {/* Subtle 3D shadow underneath - full width */}
          <div 
            className="h-[5px] -mt-[2px] w-full"
            style={{
              background: isDark 
                ? 'linear-gradient(to bottom, rgba(168, 85, 247, 0.12), transparent)' 
                : 'linear-gradient(to bottom, rgba(168, 85, 247, 0.06), transparent)',
              filter: 'blur(4px)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`home-block relative p-6 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
              }`}
            >
              <div className={isDark ? 'continuous-shimmer-dark' : 'continuous-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-4xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  🎓
                </motion.div>
                <h3 className="text-empire-purple font-black mb-2 text-lg">Education</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  <span className="font-semibold">B.Tech ECE</span> (2020-24)<br/>
                  <span className="font-semibold">M.Tech VLSI</span> (2025-27) — 1st Year
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`home-block relative p-6 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15'
              }`}
            >
              <div className={isDark ? 'continuous-shimmer-dark' : 'continuous-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-4xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  💻
                </motion.div>
                <h3 className="text-empire-cyan font-black mb-2 text-lg">Core Skills</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  Python • C++ • JavaScript • HTML/CSS<br/>
                  VLSI • Embedded • AI/ML • Web Dev
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`home-block relative p-6 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-green/30 hover:border-empire-green/60 hover:shadow-2xl hover:shadow-empire-green/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-green/25 hover:border-empire-green/50 hover:shadow-2xl hover:shadow-empire-green/15'
              }`}
            >
              <div className={isDark ? 'continuous-shimmer-dark' : 'continuous-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-4xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  🚀
                </motion.div>
                <h3 className="text-empire-green font-black mb-2 text-lg">Currently Learning</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                  Cadence • Vivado • Verilog<br/>
                  Graphene • Quantum • OpenCL • Fusion 360
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <div className="w-6 h-10 border-2 border-empire-purple rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 bg-empire-purple rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
