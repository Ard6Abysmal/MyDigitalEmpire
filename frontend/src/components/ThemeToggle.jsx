// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundManager } from '../utils/sounds';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleToggle = () => {
    soundManager.playClick();
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={() => soundManager.playHover()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-16 h-8 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-empire-purple/50"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1f1f1f, #0a0a0a)' 
          : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      }}
      aria-label="Toggle theme"
    >
      {/* Slider */}
      <motion.div
        animate={{
          x: isDark ? 0 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        className="w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #a855f7, #06b6d4)'
            : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        }}
      >
        {isDark ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-yellow-600" />
        )}
      </motion.div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Moon 
          size={12} 
          className={`transition-opacity ${isDark ? 'opacity-60' : 'opacity-20'}`}
          style={{ color: isDark ? '#ffffff' : '#6c757d' }}
        />
        <Sun 
          size={12} 
          className={`transition-opacity ${!isDark ? 'opacity-60' : 'opacity-20'}`}
          style={{ color: isDark ? '#6c757d' : '#fbbf24' }}
        />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
