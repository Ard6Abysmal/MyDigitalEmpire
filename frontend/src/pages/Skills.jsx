import { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

// Framework data with unique 6-color gradients
const FRAMEWORKS_WITH_COLORS = [
  { name: 'PyTorch', colors: ['#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FFA500', '#FFD700'] },
  { name: 'TensorFlow', colors: ['#FF6B00', '#FF8C00', '#FFA500', '#FFB347', '#FFC85C', '#FFD700'] },
  { name: 'Keras', colors: ['#D00000', '#E50000', '#FF1744', '#FF4081', '#FF6090', '#FF80AB'] },
  { name: 'OpenCV', colors: ['#5C3EE8', '#7B68EE', '#9370DB', '#8A2BE2', '#00CED1', '#00D4AA'] },
  { name: 'scikit-learn', colors: ['#F7931E', '#FFA726', '#FFB74D', '#64B5F6', '#42A5F5', '#2196F3'] },
  { name: 'Pandas', colors: ['#150458', '#311B92', '#512DA8', '#7C4DFF', '#D500F9', '#E70488'] },
  { name: 'NumPy', colors: ['#4DABCF', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#4D77CF'] },
  { name: 'React', colors: ['#00D8FF', '#26C6DA', '#4DD0E1', '#61DAFB', '#80DEEA', '#B2EBF2'] },
  { name: 'Next.js', colors: ['#000000', '#1A1A1A', '#333333', '#666666', '#999999', '#CCCCCC'] },
  { name: 'Vite', colors: ['#646CFF', '#7C4DFF', '#9C27B0', '#BA68C8', '#BD34FE', '#E040FB'] },
  { name: 'Node.js', colors: ['#2C6E2F', '#339933', '#43A047', '#66BB6A', '#81C784', '#A5D6A7'] },
  { name: 'Express', colors: ['#000000', '#212121', '#303030', '#424242', '#616161', '#757575'] },
  { name: 'FastAPI', colors: ['#009688', '#00ACC1', '#00BCD4', '#26C6DA', '#4DD0E1', '#80DEEA'] },
  { name: 'Django', colors: ['#092E20', '#0C4B33', '#0F5C42', '#0F7350', '#11805E', '#13937C'] },
  { name: 'Flask', colors: ['#000000', '#1C1C1C', '#383838', '#545454', '#707070', '#8C8C8C'] },
  { name: 'Tailwind CSS', colors: ['#06B6D4', '#14B8DC', '#22C9E5', '#38BDF8', '#4FC3F7', '#81D4FA'] },
  { name: 'Bootstrap', colors: ['#563D7C', '#6C4D8B', '#7952B3', '#8E6DB8', '#A389C4', '#B8A5D0'] },
  { name: 'Framer Motion', colors: ['#0055FF', '#2979FF', '#448AFF', '#4FC3F7', '#82B1FF', '#88AAFF'] },
  { name: 'Three.js', colors: ['#000000', '#1A1A1A', '#333333', '#4D4D4D', '#666666', '#808080'] },
  { name: 'PostgreSQL', colors: ['#336791', '#3F7CA5', '#4A91BA', '#5BA3D0', '#6BB6E5', '#4169E1'] },
  { name: 'MongoDB', colors: ['#47A248', '#4DB33D', '#5BC043', '#6FD859', '#7FE066', '#8FE873'] },
  { name: 'SQLite', colors: ['#003B57', '#0F5C7E', '#0F80CC', '#1E90E5', '#42A5F5', '#64B5F6'] },
  { name: 'Firebase', colors: ['#FFCA28', '#FFD54F', '#FFDD71', '#FFE082', '#FFEB3B', '#FFA000'] },
  { name: 'Arduino IDE', colors: ['#00878F', '#00979D', '#00ACC1', '#00BCD4', '#26C6DA', '#4DD0E1'] },
  { name: 'PlatformIO', colors: ['#FF6F00', '#FF7F00', '#FF8C00', '#FFA726', '#FFB74D', '#FFCC80'] },
  { name: 'Embedded C', colors: ['#5C6BC0', '#7986CB', '#9FA8DA', '#A8B9CC', '#BBDEFB', '#E3F2FD'] },
  { name: 'CUDA', colors: ['#76B900', '#7DB900', '#88C32F', '#9ACD32', '#B2D732', '#CDDC39'] },
  { name: 'cuDNN', colors: ['#76B900', '#83C31E', '#90CD3C', '#00CED1', '#00D4AA', '#00E5B8'] },
  { name: 'Git', colors: ['#F05032', '#F14E32', '#F44336', '#EF5350', '#E57373', '#EF9A9A'] },
  { name: 'Docker', colors: ['#1488CC', '#2496ED', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB'] },
  { name: 'Linux', colors: ['#FCC624', '#FFD54F', '#FFDD71', '#FFE082', '#FFEB3B', '#FFF176'] },
  { name: 'Bash', colors: ['#2E7D32', '#388E3C', '#43A047', '#66BB6A', '#81C784', '#A5D6A7'] },
  { name: 'PowerShell', colors: ['#012456', '#1565C0', '#1976D2', '#2196F3', '#42A5F5', '#5391FE'] },
  { name: 'Vivado Xilinx', colors: ['#D32F2F', '#E01F27', '#F44336', '#EF5350', '#FF4747', '#FF6B6B'] },
  { name: 'Cadence', colors: ['#0C2340', '#1A3A5C', '#2C5282', '#3B6BA8', '#FF6B35', '#FF8A5C'] },
  { name: 'Synopsys', colors: ['#0F5499', '#1565C0', '#1976D2', '#2196F3', '#42A5F5', '#64B5F6'] },
  { name: 'ModelSim', colors: ['#005BAC', '#0277BD', '#0288D1', '#039BE5', '#03A9F4', '#29B6F6'] },
  { name: 'MATLAB', colors: ['#E16737', '#EF6C00', '#F57C00', '#FF8A65', '#FF9E80', '#FFAB91'] },
  { name: 'Simulink', colors: ['#0076A8', '#0288D1', '#0097A7', '#00ACC1', '#00BCD4', '#26C6DA'] },
  { name: 'LabVIEW', colors: ['#FFDB00', '#FFE54C', '#FFEB3B', '#FFF176', '#FFF59D', '#FFA000'] },
  { name: 'Proteus', colors: ['#0066CC', '#1976D2', '#2196F3', '#42A5F5', '#64B5F6', '#90CAF9'] },
  { name: 'Jupyter', colors: ['#F37626', '#F57C00', '#FF8A65', '#FF9E80', '#FF6F00', '#FFAB91'] },
  { name: 'Google Colab', colors: ['#F9AB00', '#FFA726', '#FFB74D', '#FFCA28', '#FFD54F', '#FF9800'] },
  { name: 'Anaconda', colors: ['#3B7D3F', '#43A047', '#44A833', '#66BB6A', '#81C784', '#4CAF50'] },
  { name: 'pip', colors: ['#2C5AA0', '#3775A9', '#1976D2', '#2196F3', '#42A5F5', '#64B5F6'] },
  { name: 'npm', colors: ['#B71C1C', '#CB3837', '#D32F2F', '#E53935', '#C62828', '#F44336'] },
];

const Skills = () => {
  const { isDark } = useTheme();

  const software = [
    { name: 'VS Code', icon: '💻', category: 'Primary Editor', color: 'empire-cyan' },
    { name: 'Git/GitHub', icon: '🔧', category: 'Version Control', color: 'empire-orange' },
    { name: 'PyTorch', icon: '🔥', category: 'Deep Learning', color: 'empire-pink' },
    { name: 'TensorFlow', icon: '🧠', category: 'AI/ML Framework', color: 'empire-purple' },
    { name: 'React', icon: '⚛️', category: 'Frontend Framework', color: 'empire-cyan' },
    { name: 'FastAPI', icon: '⚡', category: 'Backend API', color: 'empire-green' },
    { name: 'Arduino IDE', icon: '🔌', category: 'Embedded Development', color: 'empire-orange' },
    { name: 'MATLAB', icon: '📊', category: 'Signal Processing', color: 'empire-purple' },
    { name: 'OpenCV', icon: '👁️', category: 'Computer Vision', color: 'empire-cyan' },
    { name: 'Tailwind CSS', icon: '🎨', category: 'CSS Framework', color: 'empire-green' },
    { name: 'Docker', icon: '🐳', category: 'Containerization', color: 'empire-purple' },
    { name: 'Linux', icon: '🐧', category: 'Development OS', color: 'empire-orange' },
    { name: 'Vivado Xilinx', icon: '💎', category: 'FPGA Design', color: 'empire-cyan' },
    { name: 'Cadence', icon: '🛠️', category: 'VLSI Design', color: 'empire-pink' },
    { name: 'Jupyter', icon: '📓', category: 'Data Science', color: 'empire-green' },
    { name: 'Proteus', icon: '🔬', category: 'Circuit Simulation', color: 'empire-purple' },
  ];

  const hardware = [
    { name: 'NVIDIA RTX 4050', spec: '6GB VRAM - CUDA Training & Inference', icon: '🎮', color: 'empire-green' },
    { name: 'Arduino Boards', spec: 'Uno, Nano, Mega - Embedded Projects', icon: '🔌', color: 'empire-cyan' },
    { name: 'MPU6050', spec: 'Accelerometer/Gyroscope - Motion Detection', icon: '📡', color: 'empire-purple' },
    { name: 'Sensor Modules', spec: 'pH, Turbidity, Temperature - IoT Systems', icon: '💧', color: 'empire-pink' },
    { name: 'GSM800L', spec: 'GSM Module - SMS/GPS Alerting', icon: '📱', color: 'empire-orange' },
    { name: 'Neo-6M GPS', spec: 'GPS Module - Real-time Location Tracking', icon: '🛰️', color: 'empire-cyan' },
    { name: 'Development Laptop', spec: 'High-Performance Workstation - RTX 4050', icon: '🖥️', color: 'empire-purple' },
    { name: 'Jetson Nano (Planned)', spec: 'Edge AI Deployment & Inference', icon: '🤖', color: 'empire-green' },
  ];

  const vlsiTools = [
    { name: 'Verilog', icon: '⚙️', category: 'HDL Programming', color: 'empire-purple' },
    { name: 'SystemVerilog', icon: '🔬', category: 'Advanced HDL', color: 'empire-cyan' },
    { name: 'Vivado Xilinx', icon: '💎', category: 'FPGA Synthesis', color: 'empire-green' },
    { name: 'Cadence', icon: '🛠️', category: 'VLSI Design Suite', color: 'empire-orange' },
    { name: 'Synopsys', icon: '🔧', category: 'Design Compiler', color: 'empire-pink' },
    { name: 'ModelSim', icon: '📊', category: 'HDL Simulation', color: 'empire-purple' },
  ];

  const programmingLanguages = [
    { name: 'Python', level: 'Expert', years: '3+', icon: '🐍', color: 'empire-purple' },
    { name: 'C/C++', level: 'Expert', years: '3+', icon: '⚡', color: 'empire-cyan' },
    { name: 'JavaScript', level: 'Proficient', years: '2+', icon: '💛', color: 'empire-green' },
    { name: 'Embedded C', level: 'Expert', years: '3+', icon: '💾', color: 'empire-orange' },
    { name: 'MATLAB', level: 'Proficient', years: '2+', icon: '📊', color: 'empire-pink' },
    { name: 'Verilog', level: 'Learning', years: '1+', icon: '⚙️', color: 'empire-purple' },
    { name: 'C#', level: 'Intermediate', years: '1+', icon: '🔷', color: 'empire-cyan' },
    { name: 'Java', level: 'Intermediate', years: '1+', icon: '☕', color: 'empire-green' },
  ];

  const frameworks = useMemo(() => {
    return FRAMEWORKS_WITH_COLORS.map((fw, idx) => ({
      ...fw,
      size: Math.random() * 0.5 + 0.9, // Random between 0.9 and 1.4
      delay: idx * 0.3 // Stagger shimmer delays
    }));
  }, []);

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

        .skill-block:hover .glass-overlay-dark,
        .skill-block:hover .glass-overlay-light {
          opacity: 1;
        }

        /* INDIVIDUAL FRAMEWORK SHIMMER EFFECT */
        @keyframes frameworkShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .framework-tag {
          position: relative;
          overflow: hidden;
          background-size: 200% 100%;
          animation: frameworkShimmer 3s linear infinite;
        }

        /* STAGGER SHIMMER DELAYS */
        .framework-tag:nth-child(1) { animation-delay: 0s; }
        .framework-tag:nth-child(2) { animation-delay: 0.1s; }
        .framework-tag:nth-child(3) { animation-delay: 0.2s; }
        .framework-tag:nth-child(4) { animation-delay: 0.3s; }
        .framework-tag:nth-child(5) { animation-delay: 0.4s; }
        .framework-tag:nth-child(6) { animation-delay: 0.5s; }
        .framework-tag:nth-child(7) { animation-delay: 0.6s; }
        .framework-tag:nth-child(8) { animation-delay: 0.7s; }
        .framework-tag:nth-child(9) { animation-delay: 0.8s; }
        .framework-tag:nth-child(10) { animation-delay: 0.9s; }

        /* FRAMEWORK TAG PULSE */
        @keyframes frameworkPulse {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.7);
            transform: scale(1.05);
          }
        }

        .framework-tag:hover {
          animation: frameworkPulse 1s ease-in-out infinite, frameworkShimmer 3s linear infinite;
        }
      `}</style>

      <ParticleBackground theme="matrix" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-stable">Tech Stack</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            Software, hardware, and frameworks powering my projects — from neuromorphic VLSI to AI/ML and full-stack development
          </p>
        </motion.div>

        {/* Programming Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">🐍</span>
            <span className="gradient-text-stable">Programming Languages</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programmingLanguages.map((lang, idx) => (
              <div
                key={lang.name}
                className={`skill-block relative p-6 rounded-xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="text-5xl mb-3"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {lang.icon}
                  </motion.div>
                  <h3 className={`text-lg font-black mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>{lang.name}</h3>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs px-3 py-1.5 rounded-lg border-2 font-bold ${
                      lang.level === 'Expert' ? 'bg-empire-green/25 text-empire-green border-empire-green/50' :
                      lang.level === 'Proficient' ? 'bg-empire-cyan/25 text-empire-cyan border-empire-cyan/50' :
                      lang.level === 'Intermediate' ? 'bg-empire-orange/25 text-empire-orange border-empire-orange/50' :
                      'bg-empire-purple/25 text-empire-purple border-empire-purple/50'
                    }`}>
                      {lang.level}
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-lg border-2 font-bold ${
                      isDark ? 'bg-dark-bg/70 border-empire-purple/30 text-empire-text' : 'bg-white/70 border-empire-purple/25 text-light-text'
                    }`}>
                      {lang.years} yrs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Software Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">💻</span>
            <span className="gradient-text-stable">Software & Tools</span>
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {software.map((tool, idx) => (
              <div
                key={tool.name}
                className={`skill-block relative p-6 rounded-xl border-2 shadow-xl text-center overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-3"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {tool.icon}
                  </motion.div>
                  <h3 className={`text-lg font-black mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>{tool.name}</h3>
                  <p className={`text-sm font-semibold ${
                    tool.color === 'empire-cyan' ? 'text-empire-cyan' :
                    tool.color === 'empire-orange' ? 'text-empire-orange' :
                    tool.color === 'empire-purple' ? 'text-empire-purple' :
                    tool.color === 'empire-pink' ? 'text-empire-pink' :
                    tool.color === 'empire-green' ? 'text-empire-green' : 'text-text-muted'
                  }`}>
                    {tool.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* VLSI & Hardware Design Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">💎</span>
            <span className="gradient-text-stable">VLSI & Hardware Design</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vlsiTools.map((tool, idx) => (
              <div
                key={tool.name}
                className={`skill-block relative p-6 rounded-xl border-2 shadow-xl text-center overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-green/30 hover:border-empire-green/60 hover:shadow-2xl hover:shadow-empire-green/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-green/25 hover:border-empire-green/50 hover:shadow-2xl hover:shadow-empire-green/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-3"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {tool.icon}
                  </motion.div>
                  <h3 className={`text-lg font-black mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>{tool.name}</h3>
                  <p className={`text-sm font-semibold ${
                    tool.color === 'empire-cyan' ? 'text-empire-cyan' :
                    tool.color === 'empire-orange' ? 'text-empire-orange' :
                    tool.color === 'empire-purple' ? 'text-empire-purple' :
                    tool.color === 'empire-pink' ? 'text-empire-pink' :
                    tool.color === 'empire-green' ? 'text-empire-green' : 'text-text-muted'
                  }`}>
                    {tool.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hardware & Electronics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">⚡</span>
            <span className="gradient-text-stable">Hardware & Electronics</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardware.map((hw, idx) => (
              <div
                key={hw.name}
                className={`skill-block relative p-6 rounded-xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-orange/30 hover:border-empire-orange/60 hover:shadow-2xl hover:shadow-empire-orange/20 hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-orange/25 hover:border-empire-orange/50 hover:shadow-2xl hover:shadow-empire-orange/15 hover:-translate-y-2 hover:scale-[1.02]'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-5xl mb-3"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {hw.icon}
                  </motion.div>
                  <h3 className={`text-lg font-black mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>{hw.name}</h3>
                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-text-muted' : 'text-gray-600'
                  }`}>
                    {hw.spec}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Frameworks Cloud - 6-COLOR GRADIENTS + INDIVIDUAL SHIMMER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">🚀</span>
            <span className="gradient-text-stable">Frameworks & Libraries</span>
          </h2>
          
          <div className={`skill-block relative p-10 rounded-2xl border-2 shadow-2xl overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-pink/30 hover:border-empire-pink/60 hover:shadow-2xl hover:shadow-empire-pink/20 hover:-translate-y-2' 
              : 'bg-gradient-to-br from-white to-light-surface border-empire-pink/25 hover:border-empire-pink/50 hover:shadow-2xl hover:shadow-empire-pink/15 hover:-translate-y-2'
          }`}>
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
            
            <div className="relative z-10 flex flex-wrap gap-3 justify-center">
              {frameworks.map((framework, idx) => (
                <motion.span
                  key={framework.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.02 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  className="framework-tag px-5 py-2.5 rounded-full font-bold cursor-pointer shadow-lg transition-all"
                  style={{
                    fontSize: `${framework.size}rem`,
                    background: `linear-gradient(
                      90deg, 
                      ${framework.colors[0]} 0%, 
                      ${framework.colors[1]} 20%, 
                      ${framework.colors[2]} 40%, 
                      ${framework.colors[3]} 60%, 
                      ${framework.colors[4]} 80%, 
                      ${framework.colors[5]} 100%
                    )`,
                    color: '#FFFFFF',
                    border: `2px solid ${framework.colors[0]}60`,
                    textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  {framework.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`skill-block relative mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl overflow-hidden ${
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
              🛠️
            </motion.div>
            <h2 className="text-3xl font-black text-empire-purple mb-5">Technology Philosophy</h2>
            <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-empire-text/90' : 'text-light-text/90'
            }`}>
              I choose tools based on <span className="font-bold text-empire-cyan">efficiency and scalability</span>. 
              Whether it's <span className="font-bold text-empire-green">neuromorphic VLSI circuits</span>, 
              <span className="font-bold text-empire-orange"> embedded IoT hardware</span>, 
              <span className="font-bold text-empire-purple"> deep learning frameworks</span> for computer vision, or{' '}
              <span className="font-bold text-empire-pink">modern web technologies</span> for full-stack development — 
              every tool serves a purpose in building <span className="font-bold text-empire-cyan">robust, real-world solutions</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
