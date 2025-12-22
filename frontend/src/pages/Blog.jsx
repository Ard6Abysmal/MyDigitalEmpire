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
    { id: 'AI/ML', name: 'AI/ML & Computer Vision', icon: '🤖' },
    { id: 'VLSI', name: 'VLSI & Neuromorphic', icon: '💎' },
    { id: 'Embedded', name: 'Embedded & IoT', icon: '🔌' },
    { id: 'Web Dev', name: 'Web Development', icon: '💻' },
    { id: 'Tutorial', name: 'Tutorials & Guides', icon: '📖' },
    { id: 'Project', name: 'Project Logs', icon: '🚀' },
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="text-center">
          <motion.div 
            className="w-16 h-16 border-4 border-empire-purple border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className={`font-semibold ${isDark ? 'text-empire-text' : 'text-light-text'}`}>
            Loading blog posts...
          </p>
        </div>
      </div>
    );
  }

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

        .blog-card:hover .glass-overlay-dark,
        .blog-card:hover .glass-overlay-light {
          opacity: 1;
        }

        /* SMOOTH BLOCK TRANSITIONS */
        .blog-card {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* TEXT CLAMPING */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* IMAGE ZOOM ON HOVER */
        .blog-image {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-card:hover .blog-image {
          transform: scale(1.08);
        }

        /* CATEGORY BUTTON SHIMMER */
        .category-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: categoryShimmer 2.5s linear infinite;
          pointer-events: none;
        }

        @keyframes categoryShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* FADE ANIMATIONS */
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text-stable">Blog & Insights</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            Documenting <span className="font-bold text-empire-cyan">Amal Madhu's</span> journey through{' '}
            <span className="font-semibold text-empire-purple">AI/ML computer vision</span> (BlueDepth-Crescent),{' '}
            <span className="font-semibold text-empire-cyan">neuromorphic VLSI design</span>,{' '}
            <span className="font-semibold text-empire-green">embedded IoT systems</span>, and{' '}
            <span className="font-semibold text-empire-orange">full-stack development</span> — 
            sharing learnings, project updates, and technical deep-dives
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="mb-12"
        >
          <div className={`blog-card relative p-6 rounded-2xl border-2 shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
          }`}>
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
            
            <div className="relative z-10 flex justify-center gap-3 flex-wrap">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`relative px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 border-2 shadow-lg overflow-hidden ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.6)]'
                      : isDark
                        ? 'bg-dark-bg text-empire-text border-empire-purple/30 hover:border-empire-purple/60 hover:bg-dark-surface hover:shadow-lg hover:shadow-empire-purple/20'
                        : 'bg-light-surface text-light-text border-empire-purple/20 hover:border-empire-purple/50 hover:bg-white hover:shadow-lg hover:shadow-empire-purple/10'
                  }`}
                >
                  <motion.span 
                    className="text-lg"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {cat.icon}
                  </motion.span>
                  <span className="relative z-10">{cat.name}</span>
                  {selectedCategory === cat.id && (
                    <div className="category-shimmer" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div
                  className={`blog-card relative rounded-2xl overflow-hidden border-2 shadow-xl h-full flex flex-col ${
                    isDark 
                      ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2 hover:scale-[1.02]' 
                      : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2 hover:scale-[1.02]'
                  }`}
                >
                  <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                  <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

                  {/* Image */}
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="blog-image w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300/a855f7/ffffff?text=Blog+Post';
                        }}
                      />
                      {post.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-empire-purple to-empire-pink text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg z-10">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-xs px-3 py-1.5 rounded-lg bg-empire-cyan/20 text-empire-cyan border-2 border-empire-cyan/40 font-bold">
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
                      {post.title}
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
                            transition={{ duration: 0.15 }}
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={`blog-card relative text-center py-20 px-6 rounded-2xl border-2 shadow-xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
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
                I'm constantly documenting my journey through AI/ML computer vision (BlueDepth-Crescent), 
                neuromorphic VLSI design, embedded IoT systems, and web development. Check back soon for new content!
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSelectedCategory('all')}
                className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] overflow-hidden"
              >
                <span className="relative z-10">View All Posts</span>
                <div className="category-shimmer" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Blog Stats */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`blog-card relative mt-16 p-8 rounded-2xl border-2 text-center shadow-xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2' 
                : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />
            
            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              <div>
                <motion.div 
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  transition={{ duration: 0.15 }}
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
              </div>
              <div>
                <motion.div 
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  transition={{ duration: 0.15 }}
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
              </div>
              <div>
                <motion.div 
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  transition={{ duration: 0.15 }}
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
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={`blog-card relative mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

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
              <span className="font-bold text-empire-cyan">Amal Madhu</span> regularly shares insights on{' '}
              <span className="font-bold text-empire-purple">AI/ML computer vision</span> (BlueDepth-Crescent),{' '}
              <span className="font-bold text-empire-green">embedded IoT systems</span>,{' '}
              <span className="font-bold text-empire-cyan">neuromorphic VLSI design</span>, and{' '}
              <span className="font-bold text-empire-orange">full-stack development</span>. 
              Follow the journey through hardware-software integration and innovation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a
                href="https://github.com/AbyssDrn"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] inline-flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 text-xl">💻</span>
                <span className="relative z-10">Follow on GitHub</span>
                <div className="category-shimmer" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`px-6 py-3 rounded-xl border-2 font-bold inline-flex items-center gap-2 shadow-lg ${
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
