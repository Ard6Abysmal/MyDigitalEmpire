import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackContactSubmit, trackSocialClick } from '../services/analytics';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track form submission
    trackContactSubmit();
    
    try {
      // TODO: Connect to backend API
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
        subject: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { 
      name: 'GitHub', 
      icon: '💻', 
      link: 'https://github.com/AbyssDrn', 
      color: 'empire-purple',
      description: 'View my code & projects'
    },
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      link: 'https://linkedin.com/in/amal-madhu', 
      color: 'empire-cyan',
      description: 'Professional network'
    },
    { 
      name: 'Twitter', 
      icon: '🐦', 
      link: 'https://twitter.com/AbyssDrn', 
      color: 'empire-green',
      description: 'Tech updates & insights'
    },
    { 
      name: 'Email', 
      icon: '📧', 
      link: 'mailto:asuragodamal6purdemoneuabeyond@gmail.com', 
      color: 'empire-orange',
      description: 'Direct communication'
    },
  ];

  const handleSocialClick = (platformName, url) => {
    trackSocialClick(platformName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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

        .contact-block:hover .glass-overlay-dark,
        .contact-block:hover .glass-overlay-light {
          opacity: 1;
        }

        /* INPUT FOCUS GLOW */
        .input-focus:focus {
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
        }

        /* PULSE ANIMATION */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-pulse-custom {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-stable">Get In Touch</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            Let's collaborate on AI/ML, neuromorphic VLSI, embedded systems, or full-stack development projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`contact-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
            }`}>
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label className={`block font-bold mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 transition-all ${
                      isDark 
                        ? 'bg-dark-bg border-empire-purple/30 text-empire-text focus:border-empire-purple hover:border-empire-purple/50' 
                        : 'bg-light-bg border-empire-purple/20 text-light-text focus:border-empire-purple hover:border-empire-purple/40'
                    }`}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 transition-all ${
                      isDark 
                        ? 'bg-dark-bg border-empire-cyan/30 text-empire-text focus:border-empire-cyan hover:border-empire-cyan/50' 
                        : 'bg-light-bg border-empire-cyan/20 text-light-text focus:border-empire-cyan hover:border-empire-cyan/40'
                    }`}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 transition-all ${
                      isDark 
                        ? 'bg-dark-bg border-empire-green/30 text-empire-text focus:border-empire-green hover:border-empire-green/50' 
                        : 'bg-light-bg border-empire-green/20 text-light-text focus:border-empire-green hover:border-empire-green/40'
                    }`}
                    placeholder="Project collaboration, consulting, etc."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 transition-all resize-none ${
                      isDark 
                        ? 'bg-dark-bg border-empire-orange/30 text-empire-text focus:border-empire-orange hover:border-empire-orange/50' 
                        : 'bg-light-bg border-empire-orange/20 text-light-text focus:border-empire-orange hover:border-empire-orange/40'
                    }`}
                    rows="6"
                    placeholder="Tell me about your project, ideas, or how we can collaborate..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-empire-green/20 border-2 border-empire-green/50 text-empire-green font-bold text-center"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/20 border-2 border-red-500/50 text-red-500 font-bold text-center"
                  >
                    ❌ Error sending message. Please try again or email me directly.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`relative w-full py-4 rounded-xl font-bold shadow-lg transition-all overflow-hidden ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse-custom">📤</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>🚀</span>
                        Send Message
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={`contact-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15'
              }`}>
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <h3 className={`text-2xl font-black mb-6 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <span className="text-3xl">🌐</span>
                    Connect With Me
                  </h3>
                  
                  <div className="space-y-4">
                    {socials.map((social, idx) => (
                      <motion.button
                        key={social.name}
                        onClick={() => handleSocialClick(social.name, social.link)}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all group cursor-pointer text-left shadow-md ${
                          isDark 
                            ? `bg-dark-bg border-${social.color}/30 hover:border-${social.color}/60 hover:shadow-${social.color}/20` 
                            : `bg-light-bg border-${social.color}/20 hover:border-${social.color}/50 hover:shadow-${social.color}/15`
                        }`}
                      >
                        <motion.span 
                          className="text-3xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          {social.icon}
                        </motion.span>
                        <div className="flex-1">
                          <p className={`font-bold ${
                            isDark ? 'text-empire-text' : 'text-light-text'
                          }`}>{social.name}</p>
                          <p className={`text-sm ${
                            isDark ? 'text-text-muted' : 'text-light-muted'
                          }`}>{social.description}</p>
                        </div>
                        <span className={`text-${social.color} font-bold`}>→</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className={`contact-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-green/30 hover:border-empire-green/60 hover:shadow-2xl hover:shadow-empire-green/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-green/25 hover:border-empire-green/50 hover:shadow-2xl hover:shadow-empire-green/15'
              }`}>
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <h3 className={`text-xl font-black mb-4 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <span className="text-2xl">💼</span>
                    Available For
                  </h3>
                  <ul className={`space-y-3 ${
                    isDark ? 'text-text-muted' : 'text-light-muted'
                  }`}>
                    <motion.li 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <span className="text-empire-purple">✓</span> 
                      AI/ML & Computer Vision Projects
                    </motion.li>
                    <motion.li 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <span className="text-empire-cyan">✓</span> 
                      Neuromorphic VLSI Design
                    </motion.li>
                    <motion.li 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <span className="text-empire-green">✓</span> 
                      Embedded Systems & IoT
                    </motion.li>
                    <motion.li 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <span className="text-empire-orange">✓</span> 
                      Full-Stack Web Development
                    </motion.li>
                    <motion.li 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <span className="text-empire-pink">✓</span> 
                      Open Source Collaboration
                    </motion.li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Location & Response Time */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className={`contact-block relative p-8 rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-200 ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
              }`}>
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📍</span>
                    <div>
                      <p className={`font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        Location
                      </p>
                      <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                        Thiruvananthapuram, Kerala, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⏱️</span>
                    <div>
                      <p className={`font-bold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        Response Time
                      </p>
                      <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                        Usually within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
