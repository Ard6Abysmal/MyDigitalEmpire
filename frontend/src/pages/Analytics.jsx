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
  ArrowLeft
} from 'lucide-react';

export default function Analytics() {
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
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Page Views',
      value: '3,456',
      change: '+8.2%',
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Button Clicks',
      value: '567',
      change: '+15.3%',
      icon: MousePointerClick,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Downloads',
      value: '89',
      change: '+23.1%',
      icon: Download,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const topPages = [
    { path: '/', views: 1234, percentage: 35.7 },
    { path: '/projects', views: 890, percentage: 25.7 },
    { path: '/blog', views: 567, percentage: 16.4 },
    { path: '/about', views: 456, percentage: 13.2 },
    { path: '/contact', views: 309, percentage: 8.9 },
  ];

  const recentActivity = [
    { action: 'Page View', page: '/projects', time: '2 mins ago' },
    { action: 'Resume Download', page: '/about', time: '5 mins ago' },
    { action: 'Contact Form', page: '/contact', time: '12 mins ago' },
    { action: 'Blog Post View', page: '/blog/1', time: '18 mins ago' },
    { action: 'Chat Message', page: '/', time: '25 mins ago' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Track your portfolio performance</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={20} />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold">Top Pages</h2>
          </div>
          
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.path} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{page.path}</span>
                  <span className="text-gray-400">{page.views} views</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${page.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Globe size={16} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.page}</p>
                </div>
                <span className="text-gray-500 text-xs whitespace-nowrap">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Embed GA4 Dashboard (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-4">Google Analytics Dashboard</h2>
        <p className="text-gray-400 mb-4">
          View detailed analytics in your{' '}
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Google Analytics Dashboard
          </a>
        </p>
        
        {/* You can embed GA4 reports here if you set up Looker Studio */}
        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Connect Looker Studio to embed live GA4 reports here
          </p>
        </div>
      </motion.div>
    </div>
  );
}
