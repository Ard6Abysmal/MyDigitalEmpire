import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext'; // NEW

const Blog = () => {
  const { isDark } = useTheme(); // NEW - Get theme state
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchPosts();
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-empire-purple"></div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${
      isDark ? 'bg-true-black' : 'bg-light-bg'
    }`}>
      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
            Blog
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-text-muted' : 'text-light-muted'
          }`}>
            Sharing my journey, learnings, and insights in tech
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-empire-purple to-empire-cyan text-white'
                  : isDark
                    ? 'bg-dark-surface border border-dark-border text-empire-text hover:border-empire-purple'
                    : 'bg-light-surface border border-light-border text-light-text hover:border-empire-purple'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className={`rounded-2xl overflow-hidden border hover:border-empire-purple transition-all group h-full flex flex-col ${
                  isDark ? 'bg-dark-surface border-dark-border' : 'bg-light-surface border-light-border'
                }`}>
                  {/* Image */}
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300/a855f7/ffffff?text=Blog+Post';
                        }}
                      />
                      {post.featured && (
                        <div className="absolute top-4 right-4 bg-empire-purple text-white px-3 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-empire-cyan/20 text-empire-cyan border border-empire-cyan/30">
                        {post.category}
                      </span>
                      <span className={`text-xs ${
                        isDark ? 'text-text-muted' : 'text-light-muted'
                      }`}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <h2 className={`text-xl font-bold mb-2 group-hover:text-empire-purple transition-colors ${
                      isDark ? 'text-empire-text' : 'text-light-text'
                    }`}>
                      {post.title}
                    </h2>
                    <p className={`text-sm mb-4 flex-1 ${
                      isDark ? 'text-text-muted' : 'text-light-muted'
                    }`}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-empire-purple/10 text-empire-purple rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className={`flex items-center justify-between text-xs pt-4 border-t ${
                      isDark 
                        ? 'text-text-muted border-dark-border' 
                        : 'text-light-muted border-light-border'
                    }`}>
                      <span>By {post.author}</span>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-2xl mb-4 ${
              isDark ? 'text-text-muted' : 'text-light-muted'
            }`}>No posts found</p>
            <p className={isDark ? 'text-text-muted' : 'text-light-muted'}>
              Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
