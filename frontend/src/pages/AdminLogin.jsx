import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

const AdminLogin = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (token.trim()) {
      // Store token in localStorage
      localStorage.setItem('adminToken', token);
      navigate('/admin/dashboard');
    } else {
      setError('Please enter admin token');
    }
  };

  return (
    <div className="relative min-h-screen bg-true-black flex items-center justify-center">
      <ParticleBackground theme="matrix" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-dark-surface border-2 border-empire-purple/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent mb-2">
              Admin Portal
            </h1>
            <p className="text-text-muted text-sm">Enter your admin token to continue</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-empire-text font-semibold mb-2">
                Admin Token
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin token..."
                className="w-full bg-dark-bg border-2 border-dark-border rounded-xl px-4 py-3 text-empire-text focus:outline-none focus:border-empire-purple transition-all"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold py-3 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-empire-cyan text-sm hover:underline">
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
