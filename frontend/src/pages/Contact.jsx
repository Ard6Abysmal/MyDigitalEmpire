import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackContactSubmit, trackSocialClick } from '../services/analytics'; // NEW

const Contact = () => {
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
    <div className="relative min-h-screen bg-true-black pt-24 pb-16">
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
          <p className="text-xl text-text-muted">
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
                <label className="block text-empire-text font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border focus:border-empire-purple focus:outline-none text-empire-text transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-empire-text font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border focus:border-empire-cyan focus:outline-none text-empire-text transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-empire-text font-semibold mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border focus:border-empire-green focus:outline-none text-empire-text transition-all resize-none"
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
            <div className="p-8 rounded-2xl bg-dark-surface border border-dark-border">
              <h3 className="text-2xl font-bold text-empire-text mb-6">Connect With Me</h3>
              
              <div className="space-y-4">
                {socials.map((social, idx) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleSocialClick(social.name, social.link)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ x: 10 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl bg-dark-bg border border-dark-border hover:border-${social.color}/50 transition-all group cursor-pointer text-left`}
                  >
                    <span className="text-3xl group-hover:animate-bounce">{social.icon}</span>
                    <div>
                      <p className="font-semibold text-empire-text">{social.name}</p>
                      <p className="text-sm text-text-muted">Connect on {social.name}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-empire-purple/10 to-empire-cyan/10 border border-empire-purple/30">
              <h3 className="text-xl font-bold text-empire-text mb-4">Available For</h3>
              <ul className="space-y-2 text-text-muted">
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
