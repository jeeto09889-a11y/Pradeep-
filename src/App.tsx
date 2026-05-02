/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Briefcase, 
  CreditCard, 
  BarChart3, 
  Send, 
  Image as ImageIcon,
  Menu,
  X,
  Bell
} from 'lucide-react';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';
import Publish from './components/Publish';
import AIGenerator from './components/AIGenerator';
import { AppProvider, useAppContext } from './context/AppContext';

function AppContent() {
  const { activeTab, setActiveTab, notificationCount } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'home', name: 'Home', icon: HomeIcon },
    { id: 'portfolio', name: 'Portfolio', icon: Briefcase },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'ai', name: 'AI Generator', icon: ImageIcon },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'publish', name: 'Publish', icon: Send },
  ];

  // Update document title with notification badge if needed
  useEffect(() => {
    if (notificationCount > 0) {
      document.title = `(${notificationCount}) pradeepbuilds`;
    } else {
      document.title = 'pradeepbuilds';
    }
  }, [notificationCount]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'portfolio': return <Portfolio />;
      case 'payment': return <Payment />;
      case 'ai': return <AIGenerator />;
      case 'dashboard': return <Dashboard />;
      case 'publish': return <Publish />;
      default: return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0b1e] font-sans text-white relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[25%] h-[25%] bg-pink-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 relative z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              P
            </div>
            <h1 className="text-xl font-bold tracking-tight">pradeepbuilds</h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1 font-bold">Creator Suite v2.0</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              id={`nav-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' 
                : 'hover:bg-white/5 text-white/50 hover:text-white'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'group-hover:text-white/80'}`} />
              <span className="font-semibold text-sm">{tab.name}</span>
              {tab.id === 'payment' && notificationCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#0a0b1e]">
                  {notificationCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-white/5">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs">
                PJ
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">Pradeep J.</p>
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Verified Pro</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Portfolio Live</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0b1e]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold">P</div>
           <h1 className="text-lg font-bold tracking-tight">PB</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white/60">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="fixed inset-0 bg-[#0a0b1e] z-40 md:hidden pt-20"
          >
            <nav className="px-6 py-8 space-y-2">
              {tabs.map((tab) => (
                <button
                  id={`mobile-nav-${tab.id}`}
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-bold ${
                    activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl' : 'text-white/40'
                  }`}
                >
                  <tab.icon className="w-6 h-6" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0 relative z-10 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

