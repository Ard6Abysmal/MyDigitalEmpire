import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackBlogView } from '../services/analytics';
import { useTheme } from '../context/ThemeContext';

const BlogPost = () => {
  const { isDark } = useTheme();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (post) {
      trackBlogView(post.title);
      fetchRelatedPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog/posts/${slug}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog/posts?category=${post.category}`);
      const data = await response.json();
      const filtered = data.posts.filter(p => p.slug !== slug).slice(0, 3);
      setRelatedPosts(filtered);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-empire-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={isDark ? 'text-empire-text' : 'text-light-text'}>Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-6"
          >
            📝
          </motion.div>
          <h2 className={`text-3xl font-black mb-4 ${
            isDark ? 'text-empire-text' : 'text-light-text'
          }`}>Post not found</h2>
          <Link 
            to="/blog" 
            className="text-empire-purple hover:text-empire-cyan transition-colors font-bold text-lg"
          >
            ← Back to Blog
          </Link>
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

        .blog-block:hover .glass-overlay-dark,
        .blog-block:hover .glass-overlay-light {
          opacity: 1;
        }

        /* PROSE STYLING */
        .prose h2 {
          font-size: 2rem;
          font-weight: 900;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: ${isDark ? '#a855f7' : '#7c3aed'};
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: ${isDark ? '#06b6d4' : '#0891b2'};
        }

        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }

        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
        }

        .prose code {
          background: ${isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)'};
          padding: 0.2rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: ${isDark ? '#a855f7' : '#7c3aed'};
          border: 1px solid ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.2)'};
        }

        .prose pre {
          background: ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)'};
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.25rem;
          border: 2px solid ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.2)'};
        }

        .prose blockquote {
          border-left: 4px solid #a855f7;
          padding-left: 1rem;
          font-style: italic;
          margin: 1.5rem 0;
          color: ${isDark ? '#9ca3af' : '#6b7280'};
        }

        .prose a {
          color: #06b6d4;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .prose a:hover {
          color: #a855f7;
          text-decoration: underline;
        }

        .prose img {
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-empire-purple hover:text-empire-cyan transition-colors font-bold mb-8 text-lg"
          >
            ← Back to Blog
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`blog-block relative rounded-2xl overflow-hidden border-2 shadow-2xl transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:shadow-empire-purple/20' 
              : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:shadow-empire-purple/15'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

          {/* Header Image */}
          {post.image_url && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x600/a855f7/ffffff?text=Blog+Post';
                }}
              />
              {post.featured && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-empire-purple to-empire-pink text-white px-6 py-2 rounded-full text-sm font-black shadow-xl">
                  ⭐ Featured
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12 relative z-10">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="px-4 py-1.5 rounded-lg bg-empire-cyan/20 text-empire-cyan border-2 border-empire-cyan/40 text-sm font-bold">
                {post.category}
              </span>
              <span className={`text-sm font-semibold flex items-center gap-1 ${
                isDark ? 'text-text-muted' : 'text-light-muted'
              }`}>
                📅 {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className={`text-sm font-semibold flex items-center gap-1 ${
                isDark ? 'text-text-muted' : 'text-light-muted'
              }`}>
                👁️ {post.views || 0} views
              </span>
              {post.read_time && (
                <span className={`text-sm font-semibold flex items-center gap-1 ${
                  isDark ? 'text-text-muted' : 'text-light-muted'
                }`}>
                  ⏱️ {post.read_time} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={`text-4xl md:text-5xl font-black mb-6 leading-tight ${
              isDark ? 'text-empire-text' : 'text-light-text'
            }`}>
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className={`text-xl mb-8 leading-relaxed ${
                isDark ? 'text-text-muted' : 'text-light-muted'
              }`}>
                {post.excerpt}
              </p>
            )}

            {/* Author */}
            <div className={`flex items-center gap-4 mb-8 pb-8 border-b-2 ${
              isDark ? 'border-dark-border' : 'border-light-border'
            }`}>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-empire-purple to-empire-cyan flex items-center justify-center text-white font-black text-2xl shadow-lg">
                {(post.author || 'Amal Madhu').charAt(0)}
              </div>
              <div>
                <p className={`font-black text-lg ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>{post.author || 'Amal Madhu'}</p>
                <p className={`text-sm font-semibold ${
                  isDark ? 'text-text-muted' : 'text-light-muted'
                }`}>AI/ML Engineer • VLSI Designer • Full-Stack Developer</p>
              </div>
            </div>

            {/* Content */}
            <div 
              className={`prose prose-lg max-w-none mb-12 ${
                isDark ? 'prose-invert' : 'prose-light'
              }`}
              style={{
                color: isDark ? '#e5e7eb' : '#212529',
                lineHeight: '1.8'
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className={`flex flex-wrap gap-3 pt-8 border-t-2 ${
                isDark ? 'border-dark-border' : 'border-light-border'
              }`}>
                {post.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="px-4 py-2 bg-empire-purple/15 text-empire-purple rounded-lg text-sm border-2 border-empire-purple/30 font-bold cursor-pointer"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className={`text-3xl font-black mb-8 ${
              isDark ? 'text-empire-text' : 'text-light-text'
            }`}>
              <span className="gradient-text-stable">Related Posts</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, idx) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div
                    className={`blog-block relative rounded-xl overflow-hidden border-2 shadow-xl h-full transition-all duration-200 ${
                      isDark 
                        ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2 hover:scale-[1.02]' 
                        : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2 hover:scale-[1.02]'
                    }`}
                  >
                    <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                    <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

                    {relatedPost.image_url && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedPost.image_url}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300/a855f7/ffffff?text=Blog+Post';
                          }}
                        />
                      </div>
                    )}

                    <div className="p-4 relative z-10">
                      <span className="text-xs px-3 py-1.5 rounded-lg bg-empire-cyan/20 text-empire-cyan border-2 border-empire-cyan/40 font-bold inline-block mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className={`text-lg font-black mb-2 line-clamp-2 ${
                        isDark ? 'text-empire-text' : 'text-light-text'
                      }`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${
                        isDark ? 'text-text-muted' : 'text-light-muted'
                      }`}>
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`blog-block relative mt-16 p-10 rounded-2xl border-2 text-center shadow-2xl overflow-hidden transition-all duration-200 ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface/95 to-dark-bg/95 border-empire-purple/40 hover:border-empire-purple/60 hover:shadow-2xl hover:shadow-empire-purple/20 hover:-translate-y-2' 
              : 'bg-gradient-to-br from-white/95 to-light-surface/95 border-empire-purple/30 hover:border-empire-purple/50 hover:shadow-2xl hover:shadow-empire-purple/15 hover:-translate-y-2'
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
              💬
            </motion.div>
            <h2 className="text-3xl font-black text-empire-purple mb-5">Enjoyed this post?</h2>
            <p className={`text-lg leading-relaxed max-w-2xl mx-auto mb-6 ${
              isDark ? 'text-empire-text/90' : 'text-light-text/90'
            }`}>
              Let's discuss your ideas on AI/ML, neuromorphic VLSI, embedded systems, or web development. 
              I'm always excited to collaborate on innovative projects!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => navigate('/contact')}
                className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-empire-purple to-empire-cyan text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => navigate('/blog')}
                className={`px-8 py-3 rounded-xl border-2 font-bold transition-all shadow-lg ${
                  isDark
                    ? 'bg-dark-surface border-empire-purple text-empire-text hover:bg-empire-purple/10 hover:shadow-empire-purple/20'
                    : 'bg-light-surface border-empire-purple text-light-text hover:bg-empire-purple/10 hover:shadow-empire-purple/15'
                }`}
              >
                Read More Posts
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
