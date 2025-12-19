// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext'; // NEW

const Home = () => {
  const [meshActive, setMeshActive] = useState(false);
  const { isDark } = useTheme(); // NEW - Get theme state

  return (
    <div className={`relative min-h-screen overflow-hidden ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      <ParticleBackground theme="default" />
      
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-24 max-w-7xl mx-auto gap-12">
        
        {/* LEFT: Large Photo - 50-60% viewport height */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
          className="w-full md:w-1/2 flex items-center justify-center"
          onMouseEnter={() => setMeshActive(true)}
          onMouseLeave={() => setMeshActive(false)}
        >
          <div className="relative group">
            {/* Main Photo Container - Responsive sizing */}
            <div 
              className="relative rounded-3xl bg-gradient-to-br from-empire-purple via-empire-pink to-empire-cyan p-2 shadow-[0_0_80px_rgba(168,85,247,0.8)]"
              style={{
                width: 'min(90vw, 500px)',
                height: 'min(55vh, 500px)', // 55% viewport height, max 500px
              }}
            >
              <div className={`w-full h-full rounded-3xl overflow-hidden relative ${
                isDark ? 'bg-dark-surface' : 'bg-light-surface'
              }`}>
                {/* Your Photo */}
                <img 
                  src="/your-photo.jpg" 
                  alt="Your Name" 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x500/a855f7/ffffff?text=Your+Photo';
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
              Available for Projects
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          {/* Name & Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4">
            <span className="bg-gradient-to-r from-empire-purple via-empire-cyan to-empire-green bg-clip-text text-transparent animate-gradient">
              YOUR NAME
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
            <span className="px-4 py-2 bg-empire-purple/20 border border-empire-purple rounded-full text-empire-purple font-semibold text-sm">
              Full Stack Developer
            </span>
            <span className="px-4 py-2 bg-empire-cyan/20 border border-empire-cyan rounded-full text-empire-cyan font-semibold text-sm">
              AI/ML Scientist
            </span>
            <span className="px-4 py-2 bg-empire-green/20 border border-empire-green rounded-full text-empire-green font-semibold text-sm">
              Blockchain Dev
            </span>
          </div>

          {/* Description */}
          <p className={`text-lg md:text-xl mb-8 leading-relaxed ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            Building the future with <span className="text-empire-purple font-bold">AI/ML</span>,{' '}
            <span className="text-empire-cyan font-bold">Web3</span>, and{' '}
            <span className="text-empire-green font-bold">Full-Stack Development</span>.
            Turning ambitious ideas into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link
              to="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-empire-purple to-empire-cyan rounded-xl font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all overflow-hidden"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Link>
            
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-empire-purple text-empire-purple rounded-xl font-bold hover:bg-empire-purple hover:text-white transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
