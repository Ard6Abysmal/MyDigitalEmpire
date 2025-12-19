import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackContactSubmit, trackSocialClick } from '../services/analytics';
import { useTheme } from '../context/ThemeContext'; // NEW

const Contact = () => {
  const { isDark } = useTheme(); // NEW - Get theme state
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Track form submission
    trackContactSubmit();
    
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent! (Note: Connect this to a backend API)');
    
    // Reset form after submission (optional)
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const socials = [
    { name: 'GitHub', icon: '💻', link: 'https://github.com/Ard6Abysmal', color: 'empire-purple' },
    { name: 'LinkedIn', icon: '💼', link: 'https://linkedin.com/in/yourusername', color: 'empire-cyan' },
    { name: 'Twitter', icon: '🐦', link: 'https://twitter.com/yourusername', color: 'empire-green' },
    { name: 'Email', icon: '📧', link: 'mailto:asuragodamal6purdemoneuabeyond@gmail.com', color: 'empire-orange' },
  ];

  const handleSocialClick = (platformName, url) => {
    // Track social media click
    trackSocialClick(platformName);
    
    // Open link
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className={`text-xl ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block font-semibold mb-2 ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border focus:border-empire-purple focus:outline-none transition-all ${
                    isDark 
                      ? 'bg-dark-surface border-dark-border text-empire-text' 
                      : 'bg-light-surface border-light-border text-light-text'
                  }`}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border focus:border-empire-cyan focus:outline-none transition-all ${
                    isDark 
                      ? 'bg-dark-surface border-dark-border text-empire-text' 
                      : 'bg-light-surface border-light-border text-light-text'
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border focus:border-empire-green focus:outline-none transition-all resize-none ${
                    isDark 
                      ? 'bg-dark-surface border-dark-border text-empire-text' 
                      : 'bg-light-surface border-light-border text-light-text'
                  }`}
                  rows="6"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'bg-dark-surface border-dark-border' : 'bg-light-surface border-light-border'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>Connect With Me</h3>
              
              <div className="space-y-4">
                {socials.map((social, idx) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleSocialClick(social.name, social.link)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ x: 10 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border hover:border-${social.color}/50 transition-all group cursor-pointer text-left ${
                      isDark ? 'bg-dark-bg border-dark-border' : 'bg-light-bg border-light-border'
                    }`}
                  >
                    <span className="text-3xl group-hover:animate-bounce">{social.icon}</span>
                    <div>
                      <p className={`font-semibold ${
                        isDark ? 'text-empire-text' : 'text-light-text'
                      }`}>{social.name}</p>
                      <p className={`text-sm ${
                        isDark ? 'text-text-muted' : 'text-light-muted'
                      }`}>Connect on {social.name}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-2xl border ${
              isDark 
                ? 'bg-gradient-to-br from-empire-purple/10 to-empire-cyan/10 border-empire-purple/30' 
                : 'bg-gradient-to-br from-empire-purple/5 to-empire-cyan/5 border-empire-purple/20'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>Available For</h3>
              <ul className={`space-y-2 ${
                isDark ? 'text-text-muted' : 'text-light-muted'
              }`}>
                <li>✓ Full-Stack Development Projects</li>
                <li>✓ AI/ML Consulting</li>
                <li>✓ Blockchain/Web3 Development</li>
                <li>✓ Open Source Collaboration</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
