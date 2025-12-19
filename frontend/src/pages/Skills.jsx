import { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext'; // NEW

// Move static data outside component to avoid re-creation
const FRAMEWORKS_LIST = [
  'TensorFlow', 'PyTorch', 'React', 'Next.js', 'FastAPI', 'Django',
  'Node.js', 'Express', 'Three.js', 'Framer Motion', 'Tailwind CSS',
  'Web3.js', 'Solidity', 'OpenCV', 'Pandas', 'NumPy'
];

const Skills = () => {
  const { isDark } = useTheme(); // NEW - Get theme state

  const software = [
    { name: 'VS Code', icon: '💻', category: 'Editor', color: 'empire-cyan' },
    { name: 'Git/GitHub', icon: '🔧', category: 'Version Control', color: 'empire-orange' },
    { name: 'Docker', icon: '🐳', category: 'DevOps', color: 'empire-purple' },
    { name: 'PyTorch', icon: '🔥', category: 'AI/ML', color: 'empire-pink' },
    { name: 'React', icon: '⚛️', category: 'Frontend', color: 'empire-cyan' },
    { name: 'FastAPI', icon: '⚡', category: 'Backend', color: 'empire-green' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database', color: 'empire-purple' },
    { name: 'Tailwind CSS', icon: '🎨', category: 'Styling', color: 'empire-cyan' },
  ];

  const hardware = [
    { name: 'NVIDIA GPU', spec: 'CUDA Computing', icon: '🎮' },
    { name: 'Jetson Nano', spec: 'Edge AI Deployment', icon: '🤖' },
    { name: 'Raspberry Pi', spec: 'IoT Projects', icon: '🍓' },
    { name: 'Development PC', spec: 'High-Performance Workstation', icon: '🖥️' },
  ];

  // Now useMemo has no missing dependencies
  const frameworks = useMemo(() => {
    return FRAMEWORKS_LIST.map(name => ({
      name,
      size: Math.random() * 0.5 + 0.9 // Random between 0.9 and 1.4
    }));
  }, []); // Empty array is correct now since FRAMEWORKS_LIST never changes

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      <ParticleBackground theme="matrix" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
            Tech Stack
          </h1>
          <p className={`text-xl ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
            Tools, frameworks, and hardware I use to build Digital Empire
          </p>
        </motion.div>

        {/* Software Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 text-empire-purple">Software & Tools</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {software.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`p-6 rounded-xl border hover:border-empire-purple/50 transition-all text-center group ${
                  isDark ? 'bg-dark-surface border-dark-border' : 'bg-light-surface border-light-border'
                }`}
                style={{
                  borderColor: tool.color === 'empire-cyan' ? '#06b6d4' :
                              tool.color === 'empire-orange' ? '#f97316' :
                              tool.color === 'empire-purple' ? '#a855f7' :
                              tool.color === 'empire-pink' ? '#ec4899' :
                              tool.color === 'empire-green' ? '#10b981' : undefined
                }}
              >
                <div className="text-5xl mb-3 group-hover:animate-bounce">{tool.icon}</div>
                <h3 className={`text-lg font-bold mb-1 ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>{tool.name}</h3>
                <p className={`text-xs ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
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
          <h2 className="text-4xl font-bold mb-8 text-empire-cyan">Hardware</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardware.map((hw, idx) => (
              <motion.div
                key={hw.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`p-6 rounded-xl border hover:border-empire-cyan/50 transition-all ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-dark-border' 
                    : 'bg-gradient-to-br from-light-surface to-light-bg border-light-border'
                }`}
              >
                <div className="text-4xl mb-3">{hw.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>{hw.name}</h3>
                <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
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
          <h2 className="text-4xl font-bold mb-8 text-empire-green">Frameworks & Libraries</h2>
          
          <div className={`p-8 rounded-2xl border ${
            isDark ? 'bg-dark-surface border-dark-border' : 'bg-light-surface border-light-border'
          }`}>
            <div className="flex flex-wrap gap-3 justify-center">
              {frameworks.map((framework, idx) => (
                <motion.span
                  key={framework.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.03 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r from-empire-purple/20 to-empire-cyan/20 border border-empire-purple/30 font-semibold cursor-pointer hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all ${
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
