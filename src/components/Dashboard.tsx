import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';


const DATA = [
  { name: 'Mon', views: 400, inquiries: 24 },
  { name: 'Tue', views: 300, inquiries: 13 },
  { name: 'Wed', views: 600, inquiries: 38 },
  { name: 'Thu', views: 800, inquiries: 39 },
  { name: 'Fri', views: 500, inquiries: 48 },
  { name: 'Sat', views: 1100, inquiries: 60 },
  { name: 'Sun', views: 900, inquiries: 43 },
];

const COLORS = ['#141414', '#F97316', '#3B82F6', '#10B981'];

export default function Dashboard() {
  return (
    <div className="p-8 md:p-16">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tighter mb-2">Analytics Dashboard</h2>
        <p className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Platform Reach & User Interaction</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Views', value: '42,891', change: '+12%', icon: Eye, trend: 'up' },
          { label: 'Project Inquiries', value: '1,204', change: '+5%', icon: Users, trend: 'up' },
          { label: 'Avg. Retention', value: '4m 12s', change: '-2%', icon: Clock, trend: 'down' },
          { label: 'Conversion', value: '3.4%', change: '+0.5%', icon: TrendingUp, trend: 'up' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 shadow-xl group hover:bg-white/10 transition-all cursor-default">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                stat.trend === 'up' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-3xl font-bold tracking-tighter text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-2xl h-[450px]">
          <h3 className="text-lg font-bold mb-10 uppercase tracking-widest text-white/60">Performance Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold'}} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(10, 11, 30, 0.9)', 
                  borderRadius: '20px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Secondary Info */}
        <div className="bg-gradient-to-br from-blue-600/40 to-purple-600/40 backdrop-blur-xl p-10 rounded-[40px] border border-white/20 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 blur-[60px] rounded-full" />
          
          <div>
            <h3 className="text-xl font-bold mb-8 italic tracking-tight">Ecosystem Distribution</h3>
            <div className="space-y-8">
              {[
                { name: 'Direct Web', val: 75, color: '#3b82f6' },
                { name: 'Social Shares', val: 15, color: '#a855f7' },
                { name: 'Organic Search', val: 10, color: '#ec4899' },
              ].map(item => (
                <div key={item.name}>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3 text-white/50">
                    <span>{item.name}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="h-full rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" /> Growth Milestone
            </h4>
            <p className="text-xs text-white/50 leading-relaxed font-medium">You've reached 10k monthly visitors! Upgrade to the Enterprise plan for advanced targeting and custom APK builds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
