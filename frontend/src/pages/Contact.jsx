import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MessageSquare, Send, MapPin, Clock, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
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
    
    trackContactSubmit();
    
    try {
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        subject: ''
      });
      
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
      colorHex: '#a855f7',
      description: 'View my code & projects',
      username: '@AbyssDrn'
    },
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      link: 'https://www.linkedin.com/in/amal-madhu-48042a20a', 
      color: 'empire-cyan',
      colorHex: '#06b6d4',
      description: 'Professional network',
      username: 'Amal Madhu'
    },
    { 
      name: 'Twitter', 
      icon: '🐦', 
      link: 'https://twitter.com/AbyssDrn', 
      color: 'empire-green',
      colorHex: '#10b981',
      description: 'Tech updates & insights',
      username: '@AbyssDrn'
    },
    { 
      name: 'Email', 
      icon: '📧', 
      link: 'mailto:asuragodamal6purdemoneuabeyond@gmail.com', 
      color: 'empire-orange',
      colorHex: '#f97316',
      description: 'Direct communication',
      username: 'asuragodamal6purdemoneuabeyond@gmail.com'
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

        /* CONTINUOUS SHIMMER FOR BLOCKS - INSTANT & SMOOTH */
        .block-shimmer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: blockShimmer 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .block-shimmer-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.15),
            transparent
          );
          animation: blockShimmer 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes blockShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* GLASS OVERLAY FOR HOVER - INSTANT RESPONSE */
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
          transition: opacity 0.2s ease-out;
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
          transition: opacity 0.2s ease-out;
          pointer-events: none;
          z-index: 0;
        }

        .contact-block:hover .glass-overlay-dark,
        .contact-block:hover .glass-overlay-light {
          opacity: 1;
        }

        /* SMOOTH BLOCK TRANSITIONS */
        .contact-block {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* INPUT FOCUS GLOW - INSTANT */
        .input-focus:focus {
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.25);
          transition: box-shadow 0.15s ease-out;
        }

        /* Button shimmer */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
          50% { box-shadow: 0 0 35px rgba(168, 85, 247, 0.8); }
        }

        .btn-glow:hover {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        /* SOCIAL SHIMMER - DIAGONAL SWEEP */
        @keyframes shimmerSweep {
          0%, 100% { 
            transform: translateX(-150%) skewX(-15deg);
            opacity: 0;
          }
          50% { 
            transform: translateX(150%) skewX(-15deg);
            opacity: 1;
          }
        }

        .social-shimmer {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          border-radius: 0.75rem;
          z-index: 1;
          transition: opacity 0.2s ease-out;
        }

        .social-btn:hover .social-shimmer {
          animation: shimmerSweep 2s ease-in-out infinite;
          opacity: 1;
        }

        /* INSTANT HOVER TRANSFORMS */
        .social-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-btn:hover {
          transform: translateX(8px) translateY(-2px);
        }

        .social-btn:active {
          transform: translateX(8px) translateY(-2px) scale(0.98);
        }

        /* Icon animations */
        .social-icon {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-btn:hover .social-icon {
          transform: scale(1.2) rotate(12deg);
        }

        /* Arrow animation */
        .social-arrow {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-btn:hover .social-arrow {
          transform: translateX(4px);
          animation: arrowBounce 0.6s ease-in-out infinite;
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateX(4px); }
          50% { transform: translateX(8px); }
        }

        /* FADE IN/OUT - SMOOTH */
        .fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 15 }}
            className="inline-block mb-4"
          >
            <Sparkles className="text-empire-purple mx-auto" size={48} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text-stable">Get In Touch</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-text-muted' : 'text-light-muted'
            }`}
          >
            <span className="font-bold text-empire-cyan">Amal Madhu</span> is open to collaborate on{' '}
            <span className="font-semibold text-empire-purple">AI/ML</span>,{' '}
            <span className="font-semibold text-empire-cyan">computer vision</span>,{' '}
            <span className="font-semibold text-empire-green">neuromorphic VLSI</span>,{' '}
            <span className="font-semibold text-empire-orange">embedded systems</span>, and{' '}
            <span className="font-semibold text-pink-500">full-stack development</span> projects
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className={`contact-block relative p-6 md:p-8 rounded-2xl border-2 shadow-xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
            }`}>
              <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
              <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
              
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <label className={`block font-bold mb-2 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <User size={18} className="text-empire-purple" />
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 font-semibold ${
                      isDark 
                        ? 'bg-dark-bg border-empire-purple/30 text-empire-text focus:border-empire-purple hover:border-empire-purple/50' 
                        : 'bg-light-bg border-empire-purple/20 text-light-text focus:border-empire-purple hover:border-empire-purple/40'
                    }`}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <label className={`block font-bold mb-2 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <Mail size={18} className="text-empire-cyan" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 font-semibold ${
                      isDark 
                        ? 'bg-dark-bg border-empire-cyan/30 text-empire-text focus:border-empire-cyan hover:border-empire-cyan/50' 
                        : 'bg-light-bg border-empire-cyan/20 text-light-text focus:border-empire-cyan hover:border-empire-cyan/40'
                    }`}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <label className={`block font-bold mb-2 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <MessageSquare size={18} className="text-empire-green" />
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 font-semibold ${
                      isDark 
                        ? 'bg-dark-bg border-empire-green/30 text-empire-text focus:border-empire-green hover:border-empire-green/50' 
                        : 'bg-light-bg border-empire-green/20 text-light-text focus:border-empire-green hover:border-empire-green/40'
                    }`}
                    placeholder="Project collaboration, consulting, etc."
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                >
                  <label className={`block font-bold mb-2 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <Send size={18} className="text-empire-orange" />
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`input-focus w-full px-4 py-3 rounded-xl border-2 resize-none font-semibold ${
                      isDark 
                        ? 'bg-dark-bg border-empire-orange/30 text-empire-text focus:border-empire-orange hover:border-empire-orange/50' 
                        : 'bg-light-bg border-empire-orange/20 text-light-text focus:border-empire-orange hover:border-empire-orange/40'
                    }`}
                    rows="6"
                    placeholder="Tell me about your project, ideas, or how we can collaborate..."
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-xl bg-empire-green/20 border-2 border-empire-green/50 text-empire-green font-bold text-center flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={20} />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-xl bg-red-500/20 border-2 border-red-500/50 text-red-500 font-bold text-center flex items-center justify-center gap-2"
                    >
                      <AlertCircle size={20} />
                      Error sending message. Please try again or email me directly.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`btn-glow relative w-full py-4 rounded-xl font-bold shadow-lg overflow-hidden ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-base md:text-lg">
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          📤
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className={`contact-block relative p-6 md:p-8 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60 hover:shadow-2xl hover:shadow-empire-cyan/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50 hover:shadow-2xl hover:shadow-empire-cyan/15'
              }`}>
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <h3 className={`text-xl md:text-2xl font-black mb-6 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <span className="text-2xl md:text-3xl">🌐</span>
                    Connect With Me
                  </h3>
                  
                  <div className="space-y-3 md:space-y-4">
                    {socials.map((social, idx) => (
                      <motion.button
                        key={social.name}
                        onClick={() => handleSocialClick(social.name, social.link)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.08, duration: 0.3 }}
                        className={`social-btn relative w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 cursor-pointer text-left shadow-md overflow-hidden ${
                          isDark 
                            ? `bg-dark-bg border-${social.color}/30 hover:border-${social.color}/60 hover:shadow-lg hover:shadow-${social.color}/20` 
                            : `bg-light-bg border-${social.color}/20 hover:border-${social.color}/50 hover:shadow-lg hover:shadow-${social.color}/15`
                        }`}
                      >
                        {/* COLOR-SPECIFIC SHIMMER */}
                        <div 
                          className="social-shimmer"
                          style={{
                            background: `linear-gradient(110deg, transparent 20%, ${social.colorHex}80 50%, transparent 80%)`
                          }}
                        />
                        
                        <span className="social-icon relative z-10 text-2xl md:text-3xl">
                          {social.icon}
                        </span>
                        
                        <div className="relative z-10 flex-1 min-w-0">
                          <p className={`font-bold text-sm md:text-base ${
                            isDark ? 'text-empire-text' : 'text-light-text'
                          }`}>{social.name}</p>
                          <p className={`text-xs md:text-sm ${
                            isDark ? 'text-text-muted' : 'text-light-muted'
                          }`}>{social.description}</p>
                          <p className={`text-xs truncate ${
                            isDark ? 'text-text-muted/70' : 'text-light-muted/70'
                          }`}>{social.username}</p>
                        </div>
                        
                        <span 
                          className={`social-arrow relative z-10 text-${social.color} font-bold text-lg`}
                        >
                          →
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className={`contact-block relative p-6 md:p-8 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-green/30 hover:border-empire-green/60 hover:shadow-2xl hover:shadow-empire-green/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-green/25 hover:border-empire-green/50 hover:shadow-2xl hover:shadow-empire-green/15'
              }`}>
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10">
                  <h3 className={`text-lg md:text-xl font-black mb-4 flex items-center gap-2 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    <span className="text-xl md:text-2xl">💼</span>
                    Available For
                  </h3>
                  <ul className={`space-y-2 md:space-y-3 ${
                    isDark ? 'text-text-muted' : 'text-light-muted'
                  }`}>
                    {[
                      { text: 'AI/ML & Computer Vision Projects', color: 'empire-purple' },
                      { text: 'Neuromorphic VLSI Design', color: 'empire-cyan' },
                      { text: 'Embedded Systems & IoT', color: 'empire-green' },
                      { text: 'Full-Stack Web Development', color: 'empire-orange' },
                      { text: 'Open Source Collaboration', color: 'pink-500' }
                    ].map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.06, duration: 0.3 }}
                        whileHover={{ x: 6, scale: 1.01 }}
                        className="flex items-center gap-2 font-semibold text-sm md:text-base cursor-default"
                      >
                        <motion.span 
                          className={`text-${item.color} font-bold`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.06, type: "spring", stiffness: 300 }}
                        >
                          ✓
                        </motion.span>
                        {item.text}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Location & Response Time */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className={`contact-block relative p-6 md:p-8 rounded-2xl border-2 shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                  : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
              }`}>
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
                
                <div className="relative z-10 space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <MapPin size={28} className="text-empire-purple flex-shrink-0" />
                    <div>
                      <p className={`font-bold text-sm md:text-base ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        Location
                      </p>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                        Kozhikode, Kerala, India
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <Clock size={28} className="text-empire-cyan flex-shrink-0" />
                    <div>
                      <p className={`font-bold text-sm md:text-base ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
                        Response Time
                      </p>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                        Usually within 24-48 hours
                      </p>
                    </div>
                  </motion.div>
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
