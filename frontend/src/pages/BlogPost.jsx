import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { trackBlogView } from '../services/analytics'; // NEW

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchPost();
  }, [slug]);

  // Track blog post view when post is loaded
  useEffect(() => {
    if (post) {
      trackBlogView(post.title);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-true-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-empire-purple"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-true-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-empire-text mb-4">Post not found</h2>
          <Link to="/blog" className="text-empire-purple hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-true-black pt-24 pb-16">
      <ParticleBackground theme="default" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-empire-purple hover:text-empire-cyan transition-colors mb-8"
        >
          ← Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden"
        >
          {/* Header Image */}
          {post.image_url && (
            <div className="h-96 overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x600/a855f7/ffffff?text=Blog+Post';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-empire-cyan/20 text-empire-cyan border border-empire-cyan/30 text-sm font-semibold">
                {post.category}
              </span>
              <span className="text-text-muted text-sm">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="text-text-muted text-sm">
                {post.views} views
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-empire-text mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-dark-border">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-empire-purple to-empire-cyan flex items-center justify-center text-white font-bold text-xl">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-empire-text font-semibold">{post.author}</p>
                <p className="text-text-muted text-sm">Developer & Writer</p>
              </div>
            </div>

            {/* Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none"
              style={{
                color: '#e5e7eb',
                lineHeight: '1.8'
              }}
            >
              {/* Render markdown or HTML content */}
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-dark-border">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-empire-purple/10 text-empire-purple rounded-full text-sm border border-empire-purple/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;
