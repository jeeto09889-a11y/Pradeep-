import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Globe, Smartphone, Code } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { setActiveTab } = useAppContext();

  return (
    <div className="min-h-full flex flex-col p-8 md:p-16 overflow-hidden relative">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 text-blue-400" />
            Empowering Digital Creators
          </motion.div>
          
          <h1 className="text-6xl md:text-[100px] font-bold leading-[0.9] tracking-tighter uppercase mb-10">
            Precision <br />
            <span className="text-blue-500 italic drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">Software</span> <br />
            Craftsmanship
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-xl leading-relaxed mb-12">
            Professional portfolio, automated payment systems, and real-time client engagement in one seamless, high-performance workspace.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              id="cta-get-started" 
              onClick={() => setActiveTab('payment')}
              className="group px-10 py-5 bg-blue-600 text-white rounded-2xl flex items-center gap-3 font-bold hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              Launch Builder
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              id="cta-view-work" 
              onClick={() => setActiveTab('portfolio')}
              className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl font-bold text-white hover:bg-white/10 transition-colors text-sm md:text-base"
            >
              Explore Projects
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 relative z-10">
        {[
          { title: 'Web Projects', icon: Globe, count: '42+', color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { title: 'App Designs', icon: Smartphone, count: '18+', color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { title: 'Client UX', icon: Code, count: '95%', color: 'text-pink-400', bg: 'bg-pink-400/10' },
          { title: 'Portfolio Assets', icon: Sparkles, count: '200+', color: 'text-green-400', bg: 'bg-green-400/10' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all cursor-default group"
          >
            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">{item.title}</h3>
            <p className="text-4xl font-bold tracking-tight text-white">{item.count}</p>
          </motion.div>
        ))}
      </section>
      
      {/* Quote Section */}
      <section className="border-t border-white/5 pt-12 relative z-10">
        <p className="text-xl italic font-medium text-white/30 max-w-2xl leading-relaxed">
          "Architecture should speak of its time and place, but yearn for timelessness."
        </p>
      </section>
    </div>
  );
}
