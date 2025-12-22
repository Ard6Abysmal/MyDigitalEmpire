import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Eye, 
  MousePointerClick, 
  Download, 
  TrendingUp,
  Globe,
  Clock,
  ArrowLeft,
  Activity
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { useTheme } from '../context/ThemeContext';

export default function Analytics() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, [navigate]);

  // Mock analytics data (replace with real GA4 data)
  const stats = [
    {
      label: 'Total Visitors',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'from-empire-purple to-empire-cyan',
    },
    {
      label: 'Page Views',
      value: '3,456',
      change: '+8.2%',
      icon: Eye,
      color: 'from-empire-cyan to-blue-500',
    },
    {
      label: 'Button Clicks',
      value: '567',
      change: '+15.3%',
      icon: MousePointerClick,
      color: 'from-empire-green to-emerald-500',
    },
    {
      label: 'Downloads',
      value: '89',
      change: '+23.1%',
      icon: Download,
      color: 'from-empire-orange to-red-500',
    },
  ];

  const topPages = [
    { path: '/', views: 1234, percentage: 35.7, color: 'from-empire-purple to-empire-cyan' },
    { path: '/projects', views: 890, percentage: 25.7, color: 'from-empire-cyan to-blue-500' },
    { path: '/blog', views: 567, percentage: 16.4, color: 'from-empire-green to-emerald-500' },
    { path: '/about', views: 456, percentage: 13.2, color: 'from-empire-orange to-yellow-500' },
    { path: '/contact', views: 309, percentage: 8.9, color: 'from-pink-500 to-rose-500' },
  ];

  const recentActivity = [
    { action: 'Page View', page: '/projects', time: '2 mins ago', icon: Eye },
    { action: 'Resume Download', page: '/about', time: '5 mins ago', icon: Download },
    { action: 'Contact Form', page: '/contact', time: '12 mins ago', icon: MousePointerClick },
    { action: 'Blog Post View', page: '/blog/bluedepth-crescent', time: '18 mins ago', icon: BarChart3 },
    { action: 'Chat Message', page: '/', time: '25 mins ago', icon: Activity },
  ];

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        isDark ? 'bg-true-black' : 'bg-light-bg'
      }`}>
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-empire-purple"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Activity className="text-empire-purple animate-pulse" size={24} />
          </div>
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

        /* GRADIENT TEXT */
        .gradient-text-stable {
          display: inline-block;
          background: linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.1em 0;
          line-height: 1.2;
        }

        /* SHIMMER ANIMATIONS */
        .block-shimmer-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
          animation: shimmer 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .block-shimmer-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), transparent);
          animation: shimmer 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* GLASS OVERLAY */
        .glass-overlay-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 0;
        }

        .glass-overlay-light {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(6, 182, 212, 0.06) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 0;
        }

        .analytics-card:hover .glass-overlay-dark,
        .analytics-card:hover .glass-overlay-light {
          opacity: 1;
        }

        /* PROGRESS BAR GLOW */
        .progress-glow {
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6));
        }
      `}</style>

      <ParticleBackground theme="default" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`p-2 md:p-3 rounded-xl transition-all ${
                isDark 
                  ? 'bg-dark-surface hover:bg-dark-border border-2 border-dark-border hover:border-empire-purple' 
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-empire-purple'
              }`}
            >
              <ArrowLeft size={24} className={isDark ? 'text-empire-text' : 'text-light-text'} />
            </button>
            <div>
              <h1 className="text-3xl md:text-5xl font-black mb-2">
                <span className="gradient-text-stable">Analytics Dashboard</span>
              </h1>
              <p className={`text-sm md:text-base ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                Track performance for <span className="font-semibold text-empire-cyan">Amal Madhu's</span> Digital Empire
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-gray-200'
          }`}>
            <Clock size={20} className="text-empire-purple" />
            <span className={isDark ? 'text-text-muted' : 'text-light-muted'}>Last 30 days</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`analytics-card relative rounded-2xl p-6 border-2 overflow-hidden transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-purple/30 hover:border-empire-purple/60' 
                    : 'bg-gradient-to-br from-white to-light-surface border-empire-purple/25 hover:border-empire-purple/50'
                }`}
              >
                <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
                <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className="text-empire-green text-sm md:text-base font-bold px-3 py-1 rounded-full bg-empire-green/10">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className={`text-3xl md:text-4xl font-black mb-1 ${
                    isDark ? 'text-empire-text' : 'text-light-text'
                  }`}>
                    {stat.value}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`analytics-card relative rounded-2xl p-6 md:p-8 border-2 overflow-hidden transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-cyan/30 hover:border-empire-cyan/60' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-cyan/25 hover:border-empire-cyan/50'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 size={28} className="text-empire-cyan" />
                <h2 className={`text-2xl md:text-3xl font-black ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>
                  Top Pages
                </h2>
              </div>
              
              <div className="space-y-5">
                {topPages.map((page, index) => (
                  <motion.div
                    key={page.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-semibold ${
                        isDark ? 'text-empire-text' : 'text-light-text'
                      }`}>
                        {page.path}
                      </span>
                      <span className={`font-bold ${
                        isDark ? 'text-text-muted' : 'text-light-muted'
                      }`}>
                        {page.views} views
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 overflow-hidden ${
                      isDark ? 'bg-dark-border' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${page.percentage}%` }}
                        transition={{ delay: index * 0.15, duration: 0.8, ease: 'easeOut' }}
                        className={`progress-glow h-full bg-gradient-to-r ${page.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`analytics-card relative rounded-2xl p-6 md:p-8 border-2 overflow-hidden transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-green/30 hover:border-empire-green/60' 
                : 'bg-gradient-to-br from-white to-light-surface border-empire-green/25 hover:border-empire-green/50'
            }`}
          >
            <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
            <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={28} className="text-empire-green" />
                <h2 className={`text-2xl md:text-3xl font-black ${
                  isDark ? 'text-empire-text' : 'text-light-text'
                }`}>
                  Recent Activity
                </h2>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-200 ${
                        isDark 
                          ? 'bg-dark-bg hover:bg-dark-border' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-empire-purple/20">
                        <ActivityIcon size={18} className="text-empire-purple" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${
                          isDark ? 'text-empire-text' : 'text-light-text'
                        }`}>
                          {activity.action}
                        </p>
                        <p className={`text-xs ${
                          isDark ? 'text-text-muted' : 'text-light-muted'
                        }`}>
                          {activity.page}
                        </p>
                      </div>
                      <span className="text-empire-cyan text-xs font-semibold whitespace-nowrap">
                        {activity.time}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Analytics Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`analytics-card relative mt-6 rounded-2xl p-6 md:p-8 border-2 overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-dark-surface to-dark-bg border-empire-orange/30 hover:border-empire-orange/60' 
              : 'bg-gradient-to-br from-white to-light-surface border-empire-orange/25 hover:border-empire-orange/50'
          }`}
        >
          <div className={isDark ? 'block-shimmer-dark' : 'block-shimmer-light'} />
          <div className={isDark ? 'glass-overlay-dark' : 'glass-overlay-light'} />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={28} className="text-empire-orange" />
              <h2 className={`text-2xl md:text-3xl font-black ${
                isDark ? 'text-empire-text' : 'text-light-text'
              }`}>
                Google Analytics Dashboard
              </h2>
            </div>
            <p className={`mb-4 ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
              View detailed analytics for{' '}
              <span className="font-bold text-empire-cyan">amalmadhu.dev</span> in your{' '}
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-empire-purple hover:text-empire-cyan underline font-semibold transition-colors"
              >
                Google Analytics Dashboard
              </a>
            </p>
            
            <div className={`rounded-xl p-8 text-center transition-all ${
              isDark ? 'bg-dark-bg border-2 border-dark-border' : 'bg-gray-50 border-2 border-gray-200'
            }`}>
              <Globe size={48} className="mx-auto mb-4 text-empire-purple opacity-50" />
              <p className={`font-semibold ${isDark ? 'text-text-muted' : 'text-light-muted'}`}>
                Connect Looker Studio to embed live GA4 reports for Digital Empire
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
