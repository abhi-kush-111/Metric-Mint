import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';

export default function MetricMintLanding() {
  const navigate = useNavigate();

  return (
    <div className="antialiased gradient-bg min-h-screen font-sans text-gray-900 selection:bg-purple-200">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#480d4c] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#480d4c]">The Metric Mint</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#products" className="hover:text-[#480d4c] transition-colors font-semibold">Products</a>
          <a href="#about" className="hover:text-[#480d4c] transition-colors font-semibold">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#480d4c] text-xs font-bold uppercase tracking-widest mb-8 border border-purple-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#480d4c]"></span>
            </span>
            New Trackers Available
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-tight">
            Measure what matters. <br className="hidden md:block" />
            <span className="text-[#480d4c]">
              Master your life.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium, highly-effective tracking systems designed to help you build consistency, achieve your goals, and mint your own success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-purple w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-2"
            >
              Explore Products <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#480d4c] mb-3">Laser Focus</h3>
              <p className="text-gray-600 leading-relaxed">Our trackers are designed without the fluff, helping you focus entirely on the metrics that drive real results.</p>
            </div>
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#480d4c] mb-3">Instant Setup</h3>
              <p className="text-gray-600 leading-relaxed">No complex apps to install. Get access immediately and start tracking your progress in seconds.</p>
            </div>
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 text-[#480d4c] rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#480d4c] mb-3">Proven Systems</h3>
              <p className="text-gray-600 leading-relaxed">Built on behavioral science and proven productivity methods to ensure you actually stick to your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#480d4c] mb-4">Our Premium Trackers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Simple, powerful systems to help you take control of your daily routines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Habit Tracker Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-card rounded-3xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col border border-white/60"
          >
            <div className="aspect-[4/3] bg-[#480d4c] p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <h3 className="text-4xl font-black text-white tracking-tighter relative z-10 text-center">
                ULTIMATE<br/>HABIT<br/>TRACKER
              </h3>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Habit Tracker</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Best Seller</span>
              </div>
              <p className="text-gray-600 mb-8 flex-grow">
                A simple, no-fluff habit tracker that helps you stay consistent and see real progress. Build consistency in 30 days.
              </p>
              <button 
                onClick={() => navigate('/habit-tracker')}
                className="btn-purple w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
              >
                View Details <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Placeholder for future products */}
          <div className="glass-card rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">Finance Tracker</h3>
            <p className="text-gray-400 text-sm">Coming Soon</p>
          </div>

          {/* Goal Tracker Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-card rounded-3xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col border border-white/60"
          >
            <div className="aspect-[4/3] bg-[#480d4c] p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <h3 className="text-4xl font-black text-white tracking-tighter relative z-10 text-center">
                ULTIMATE<br/>GOAL<br/>TRACKER
              </h3>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Goal Tracker</h3>
                <span className="px-3 py-1 bg-purple-100 text-[#480d4c] text-xs font-bold rounded-full">New Release</span>
              </div>
              <p className="text-gray-600 mb-8 flex-grow">
                A simple, no-fluff goal planner that helps you stay consistent and see real progress. Achieve your goals in 30 days.
              </p>
              <button 
                onClick={() => navigate('/goal-tracker')}
                className="btn-purple w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
              >
                View Details <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-gray-200/50 mt-12">
        <div className="flex items-center justify-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-[#480d4c]" />
          <span className="text-xl font-bold tracking-tight text-[#480d4c]">The Metric Mint</span>
        </div>
        <p className="text-sm text-gray-500 font-medium">© {new Date().getFullYear()} The Metric Mint. All rights reserved.</p>
      </footer>
    </div>
  );
}
