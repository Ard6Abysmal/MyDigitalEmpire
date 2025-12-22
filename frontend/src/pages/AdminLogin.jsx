import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

const AdminLogin = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Your actual admin token from backend .env
  const ADMIN_TOKEN = 'MySecureToken_2025_DigitalEmpire';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (token === ADMIN_TOKEN) {
      localStorage.setItem('adminToken', token);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin token. Please check and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen flex items-center justify-center pt-20 pb-16 ${
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

        /* BLOCK SHIMMER ANIMATION */
        .block-shimmer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          animation: shimmer 8s linear infinite;
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

        .admin-block:hover .glass-overlay-dark,
        .admin-block:hover .glass-overlay-light {
          opacity: 1;
        }

        /* INPUT FOCUS GLOW */
        .input-focus:focus {
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
          outline: none;
        }

        /* BUTTON SHIMMER EFFECT */
        .button-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: buttonShimmer 2s linear infinite;
        }

        @keyframes buttonShimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <ParticleBackground theme="default" />

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`admin-block relative p-8 rounded-2xl border-2 shadow-2xl overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-empire-purple/20' 
              : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-empire-purple/15'
          }`}
        >
          {/* Shimmer Effect */}
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          
          {/* Glass Overlay */}
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="inline-block p-4 rounded-2xl bg-gradient-to-br from-empire-purple/20 to-empire-cyan/20 mb-4"
              >
                <span className="text-5xl">🔐</span>
              </motion.div>
              
              <h1 className="text-3xl font-black mb-2">
                <span className="gradient-text-stable">Admin Access</span>
              </h1>
              
              <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                Digital Empire Control Panel
              </p>
              
              <p className={`text-xs mt-2 ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                Amal Madhu's Portfolio Management
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block font-bold mb-2 ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>
                  Admin Token *
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                    setError(''); // Clear error on input
                  }}
                  className={`input-focus w-full px-4 py-3 rounded-xl border-2 transition-all ${
                    isDark 
                      ? 'bg-dark-bg border-empire-purple/30 text-empire-text focus:border-empire-purple hover:border-empire-purple/50' 
                      : 'bg-light-bg border-empire-purple/20 text-light-text focus:border-empire-purple hover:border-empire-purple/40'
                  }`}
                  placeholder="Enter your admin token..."
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/20 border-2 border-red-500/50 text-red-500 font-bold text-center text-sm"
                >
                  ❌ {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`relative w-full py-4 rounded-xl font-bold shadow-lg transition-all overflow-hidden ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <span>🔓</span>
                      Access Dashboard
                    </>
                  )}
                </span>
                
                {/* Button Shimmer Effect */}
                {!isLoading && (
                  <div className="button-shimmer" />
                )}
              </motion.button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 space-y-2">
              <div className="text-center">
                <a 
                  href="/" 
                  className={`text-sm hover:underline transition-colors ${
                    isDark ? 'text-empire-cyan' : 'text-empire-purple'
                  }`}
                >
                  ← Back to Portfolio
                </a>
              </div>
              
              <div className={`text-center text-xs ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                🔒 Secure admin portal for portfolio management
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Card Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`mt-6 p-4 rounded-xl border ${
            isDark 
              ? 'bg-dark-surface/50 border-empire-cyan/20' 
              : 'bg-white/50 border-empire-cyan/20'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className={`text-sm font-semibold mb-1 ${
                isDark ? 'text-empire-cyan' : 'text-empire-purple'
              }`}>
                Admin Features
              </p>
              <p className={`text-xs ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                Manage resume, projects, blog posts, and view analytics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
