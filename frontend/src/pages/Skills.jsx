import { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

// Static data outside component
const FRAMEWORKS_LIST = [
  'PyTorch', 'TensorFlow', 'OpenCV', 'scikit-learn', 'Pandas', 'NumPy',
  'React', 'Next.js', 'Vite', 'Node.js', 'Express', 'FastAPI', 'Django',
  'Tailwind CSS', 'Framer Motion', 'Three.js', 'PostgreSQL', 'MongoDB',
  'Arduino IDE', 'Embedded C', 'CUDA', 'Git', 'Docker', 'Linux'
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
  ];

  const hardware = [
    { name: 'NVIDIA RTX 4050', spec: '6GB - CUDA Training & Inference', icon: '🎮', color: 'empire-green' },
    { name: 'Arduino Boards', spec: 'Uno, Nano - Embedded Projects', icon: '🔌', color: 'empire-cyan' },
    { name: 'MPU6050', spec: 'Accelerometer - Accident Detection', icon: '📡', color: 'empire-purple' },
    { name: 'Sensor Modules', spec: 'pH, Turbidity, Temperature - IoT', icon: '💧', color: 'empire-pink' },
    { name: 'GSM800L', spec: 'GSM Module - SMS/GPS Alerting', icon: '📱', color: 'empire-orange' },
    { name: 'Neo-6M GPS', spec: 'GPS Module - Location Tracking', icon: '🛰️', color: 'empire-cyan' },
    { name: 'Development Laptop', spec: 'High-Performance Workstation', icon: '🖥️', color: 'empire-purple' },
    { name: 'Jetson Nano (Planned)', spec: 'Edge AI Deployment Target', icon: '🤖', color: 'empire-green' },
  ];

  const frameworks = useMemo(() => {
    return FRAMEWORKS_LIST.map(name => ({
      name,
      size: Math.random() * 0.5 + 0.9 // Random between 0.9 and 1.4
    }));
  }, []);

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      {/* Smooth Animation Styles */}
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .gradient-text-stable {
          display: inline-block;
          background: linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.1em 0;
          line-height: 1.2;
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
            Software, hardware, and frameworks powering my projects — from embedded systems to AI/ML and full-stack development
          </p>
        </motion.div>

        {/* Software Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">💻</span>
            <span className="gradient-text-stable">Software & Tools</span>
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {software.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`p-6 rounded-xl border-2 shadow-xl text-center ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
                }`}
              >
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hardware */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">⚡</span>
            <span className="gradient-text-stable">Hardware & Electronics</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardware.map((hw, idx) => (
              <motion.div
                key={hw.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`p-6 rounded-xl border-2 shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15'
                }`}
              >
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Frameworks Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-10 flex items-center gap-3">
            <span className="text-5xl">🚀</span>
            <span className="gradient-text-stable">Frameworks & Libraries</span>
          </h2>
          
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`p-10 rounded-2xl border-2 shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-green/30 hover:border-empire-green/60 hover:shadow-2xl hover:shadow-empire-green/20' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-green/25 hover:border-empire-green/50 hover:shadow-2xl hover:shadow-empire-green/15'
            }`}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {frameworks.map((framework, idx) => (
                <motion.span
                  key={framework.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.02 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`px-5 py-2.5 rounded-full bg-gradient-to-r from-empire-purple/25 to-empire-cyan/25 border-2 border-empire-purple/40 font-bold cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}
                  style={{
                    fontSize: `${framework.size}rem`,
                  }}
                >
                  {framework.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Tech Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
          }`}
        >
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
            Whether it's <span className="font-bold text-empire-green">embedded hardware</span> for IoT projects, 
            <span className="font-bold text-empire-purple"> deep learning frameworks</span> for AI, or{' '}
            <span className="font-bold text-empire-orange">modern web technologies</span> for full-stack development — 
            every tool serves a purpose in building robust, real-world solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
