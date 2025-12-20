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

  const categories = ['all', 'Tutorial', 'Project', 'Learning', 'Tech'];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-empire-purple border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      {/* Smooth Animation Styles */}
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
            Documenting my journey through electronics, AI/ML, web development, and everything in between
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                  : isDark
                    ? 'bg-dark-surface border-2 border-dark-border text-empire-text hover:border-empire-purple'
                    : 'bg-light-surface border-2 border-light-border text-light-text hover:border-empire-purple'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className={`rounded-2xl overflow-hidden border-2 shadow-xl h-full flex flex-col ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15'
                }`}>
                  {/* Image */}
                  {post.image_url && (
                    <div className="relative h-52 overflow-hidden">
                      <motion.img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300/a855f7/ffffff?text=Blog+Post';
                        }}
                      />
                      {post.featured && (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute top-4 right-4 bg-gradient-to-r from-empire-purple to-empire-pink text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg"
                        >
                          ⭐ Featured
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-xs px-3 py-1.5 rounded-lg font-bold bg-empire-cyan/25 text-empire-cyan border-2 border-empire-cyan/40">
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
                          <span 
                            key={i} 
                            className="text-xs px-2.5 py-1 bg-empire-purple/20 text-empire-purple border border-empire-purple/30 rounded-lg font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className={`flex items-center justify-between text-xs font-semibold pt-4 border-t-2 ${
                      isDark 
                        ? 'text-text-muted border-dark-border' 
                        : 'text-light-muted border-light-border'
                    }`}>
                      <span className="flex items-center gap-1">
                        <span className="text-empire-cyan">✍️</span> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-empire-green">👁️</span> {post.views || 0} views
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
            transition={{ delay: 0.3 }}
            className={`text-center py-20 px-6 rounded-2xl border-2 ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25'
            }`}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              📝
            </motion.div>
            <h3 className={`text-3xl font-black mb-4 ${
              isDark ? 'text-empire-text' : 'text-light-text'
            }`}>
              No posts found
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-text-muted' : 'text-light-muted'
            }`}>
              {selectedCategory !== 'all' 
                ? `No posts in "${selectedCategory}" category yet. Try another category!`
                : 'Check back soon for new content! I\'m constantly documenting my learning journey.'}
            </p>
          </motion.div>
        )}

        {/* Coming Soon Section */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 shadow-empire-purple/10' 
                : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 shadow-empire-purple/5'
            }`}
          >
            <motion.div 
              className="text-6xl mb-5"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🚀
            </motion.div>
            <h2 className="text-3xl font-black text-empire-purple mb-5">More Content Coming Soon</h2>
            <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-empire-text/90' : 'text-light-text/90'
            }`}>
              I'm constantly learning and building. Expect posts on{' '}
              <span className="font-bold text-empire-cyan">BlueDepth-Crescent development</span>,{' '}
              <span className="font-bold text-empire-green">VLSI research</span>,{' '}
              <span className="font-bold text-empire-purple">web development tutorials</span>, and{' '}
              <span className="font-bold text-empire-orange">embedded systems projects</span>.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
