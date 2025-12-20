import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const { isDark } = useTheme();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const categoryParam = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
      const response = await fetch(`${API_URL}/api/blog/posts${categoryParam}`);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📚' },
    { id: 'AI/ML', name: 'AI/ML', icon: '🤖' },
    { id: 'Embedded', name: 'Embedded Systems', icon: '🔌' },
    { id: 'Web Dev', name: 'Web Development', icon: '💻' },
    { id: 'VLSI', name: 'VLSI & Hardware', icon: '⚡' },
    { id: 'Tutorial', name: 'Tutorials', icon: '📖' },
    { id: 'Project', name: 'Project Logs', icon: '🚀' },
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-empire-purple border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      {/* ENHANCED SHIMMER EFFECTS */}
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

        /* SHIMMER TEXT EFFECT */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .shimmer-text-hover {
          background: linear-gradient(
            90deg,
            currentColor 0%,
            currentColor 40%,
            rgba(6, 182, 212, 1) 50%,
            currentColor 60%,
            currentColor 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          will-change: background-position;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .group:hover .shimmer-text-hover {
          animation: shimmer 1.5s linear infinite;
        }

        /* CARD WAVE SHIMMER - FAST (on hover) */
        .blog-card {
          position: relative;
          overflow: hidden;
        }

        .dark-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.6s ease;
          z-index: 1;
          pointer-events: none;
        }

        .dark-shimmer:hover::before {
          left: 100%;
        }

        .light-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.3),
            transparent
          );
          transition: left 0.6s ease;
          z-index: 1;
          pointer-events: none;
        }

        .light-shimmer:hover::before {
          left: 100%;
        }

        /* CONTINUOUS SLOW SHIMMER - For empty state (like CTA) */
        .continuous-shimmer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          animation: continuousShimmer 4s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .continuous-shimmer-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.12),
            transparent
          );
          animation: continuousShimmer 4s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes continuousShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Glass morphism overlay */
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
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }

        .glass-overlay-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.08) 0%,
            rgba(6, 182, 212, 0.05) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }

        .blog-card:hover .glass-overlay-dark,
        .blog-card:hover .glass-overlay-light {
          opacity: 1;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-stable">Blog & Insights</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            Documenting my journey through AI/ML, embedded systems, VLSI design, and full-stack development — 
            sharing learnings, project updates, and technical deep-dives
          </p>
        </motion.div>

        {/* Category Filter - EXACT ABOUT.JSX PATTERN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 border-2 shadow-lg overflow-hidden ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white border-empire-purple/50 shadow-empire-purple/30'
                    : isDark
                      ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 text-empire-text hover:border-empire-purple/60 hover:shadow-xl hover:shadow-empire-purple/20'
                      : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 text-light-text hover:border-empire-purple/50 hover:shadow-xl hover:shadow-empire-purple/15'
                }`}
              >
                <motion.span 
                  className="relative z-10 text-lg"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {cat.icon}
                </motion.span>
                <span className="relative z-10">{cat.name}</span>
                {selectedCategory === cat.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid - EXACT EDUCATION PATTERN */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`group blog-card ${isDark ? 'dark-shimmer' : 'light-shimmer'} rounded-2xl overflow-hidden border-2 shadow-xl h-full flex flex-col ${
                    isDark 
                      ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                      : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
                  }`}
                >
                  {/* Glass overlay */}
                  <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

                  {/* Image */}
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300/a855f7/ffffff?text=Blog+Post';
                        }}
                      />
                      {post.featured && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="absolute top-4 right-4 bg-gradient-to-r from-empire-purple to-empire-pink text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg z-10"
                        >
                          ⭐ Featured
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-empire-cyan/20 text-empire-cyan border-2 border-empire-cyan/40 font-bold">
                        {post.category}
                      </span>
                      <span className={`text-xs font-semibold ${
                        isDark ? 'text-text-muted' : 'text-light-muted'
                      }`}>
                        📅 {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <h2 className={`text-xl font-black mb-3 line-clamp-2 ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>
                      <span className="shimmer-text-hover">{post.title}</span>
                    </h2>
                    <p className={`text-sm mb-4 flex-1 line-clamp-3 leading-relaxed ${
                      isDark ? 'text-text-muted' : 'text-gray-600'
                    }`}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <motion.span 
                            key={i}
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="text-xs px-2.5 py-1 bg-empire-purple/15 text-empire-purple rounded-lg border border-empire-purple/30 font-semibold"
                          >
                            #{tag}
                          </motion.span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs px-2.5 py-1 text-empire-purple font-semibold">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className={`flex items-center justify-between text-xs pt-4 border-t-2 font-semibold ${
                      isDark 
                        ? 'text-text-muted border-dark-border' 
                        : 'text-light-muted border-light-border'
                    }`}>
                      <span className="flex items-center gap-1">
                        <span className="text-base">👤</span>
                        {post.author || 'Amal Madhu'}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-base">👁️</span>
                        {post.views || 0} views
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State - CONTINUOUS SLOW SHIMMER */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative text-center py-20 px-6 rounded-2xl border-2 shadow-xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
            }`}
          >
            {/* CONTINUOUS SLOW BACKGROUND SHIMMER */}
            <div className={isDark ? 'continuous-shimmer-dark' : 'continuous-shimmer-light'} />

            {/* Glass overlay */}
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl mb-6"
              >
                📝
              </motion.div>
              <h3 className={`text-3xl font-black mb-4 ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>
                No posts found in this category
              </h3>
              <p className={`text-lg mb-6 leading-relaxed max-w-2xl mx-auto ${
                isDark ? 'text-text-muted' : 'text-light-muted'
              }`}>
                I'm constantly documenting my journey through AI/ML projects, embedded systems, 
                VLSI research, and web development. Check back soon for new content!
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setSelectedCategory('all')}
                className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-lg hover:shadow-empire-purple/50 transition-all overflow-hidden"
              >
                <span className="relative z-10">View All Posts</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Blog Stats - EXACT EDUCATION PATTERN */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`mt-16 p-8 rounded-2xl border-2 text-center shadow-xl ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
            }`}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div 
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  📚
                </motion.div>
                <div className="text-4xl font-black mb-2 text-empire-purple">
                  {posts.length}
                </div>
                <p className={`text-sm font-semibold ${
                  isDark ? 'text-text-muted' : 'text-light-muted'
                }`}>
                  Total Posts
                </p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div 
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  🔥
                </motion.div>
                <div className="text-4xl font-black mb-2 text-empire-cyan">
                  {posts.reduce((sum, post) => sum + (post.views || 0), 0)}
                </div>
                <p className={`text-sm font-semibold ${
                  isDark ? 'text-text-muted' : 'text-light-muted'
                }`}>
                  Total Views
                </p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div 
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  ⭐
                </motion.div>
                <div className="text-4xl font-black mb-2 text-empire-green">
                  {posts.filter(post => post.featured).length}
                </div>
                <p className={`text-sm font-semibold ${
                  isDark ? 'text-text-muted' : 'text-light-muted'
                }`}>
                  Featured Posts
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl relative overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
          }`}
        >
          {/* Continuous slow shimmer */}
          <div className={isDark ? 'continuous-shimmer-dark' : 'continuous-shimmer-light'} />

          <div className="relative z-10">
            <motion.div 
              className="text-6xl mb-5"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💡
            </motion.div>
            <h2 className="text-3xl font-black text-empire-purple mb-5">Want to Stay Updated?</h2>
            <p className={`text-lg leading-relaxed max-w-3xl mx-auto mb-6 ${
              isDark ? 'text-empire-text/90' : 'text-light-text/90'
            }`}>
              I regularly share insights on <span className="font-bold text-empire-cyan">AI/ML projects</span>, 
              <span className="font-bold text-empire-green"> embedded systems</span>, 
              <span className="font-bold text-empire-purple"> VLSI design</span>, and{' '}
              <span className="font-bold text-empire-orange">full-stack development</span>. 
              Follow my journey as I build, learn, and grow.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a
                href="https://github.com/AbyssDrn"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-lg hover:shadow-empire-purple/50 transition-all inline-flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 text-xl">🔧</span>
                <span className="relative z-10">Follow on GitHub</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`px-6 py-3 rounded-xl border-2 font-bold transition-all inline-flex items-center gap-2 shadow-lg ${
                  isDark
                    ? 'bg-dark-surface border-empire-purple text-empire-text hover:bg-empire-purple/10 hover:shadow-empire-purple/20'
                    : 'bg-light-surface border-empire-purple text-light-text hover:bg-empire-purple/10 hover:shadow-empire-purple/15'
                }`}
              >
                <span className="text-xl">📧</span>
                Get in Touch
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
