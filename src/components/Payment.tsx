import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  User, 
  Upload, 
  Package,
  ArrowRight,
  Info
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAppContext } from '../context/AppContext';

const PACKAGES = [
  { id: 'basic', name: 'Starter Kit', price: '₹999', features: ['Single Page', 'Basic SEO', 'Contact Form'] },
  { id: 'pro', name: 'Pro Builder', price: '₹4999', features: ['5 Pages', 'CMS Integration', 'Custom Domain', 'Support'] },
  { id: 'custom', name: 'Enterprise', price: 'Custom', features: ['Unlimited Pages', 'E-commerce', 'AI Integration', '24/7 Support'] },
];

export default function Payment() {
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1]);
  const [showInquiry, setShowInquiry] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: '1', role: 'system', text: 'Thanks for reaching out! How can I help you with your project today?', time: 'Just now' }
  ]);
  const { setNotificationCount } = useAppContext();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const upiId = '8680940806@postbank';
  const paymentUrl = `upi://pay?pa=${upiId}&pn=PradeepBuilds&am=${selectedPackage.price.replace(/[^0-9]/g, '')}&cu=INR`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = { id: Date.now().toString(), role: 'user', text: message, time: 'Now' };
    setChatHistory([...chatHistory, newMsg]);
    setMessage('');
    
    // Simulate thinking and then a reply
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'system', 
        text: "Got your message! I'll review your inquiry regarding the " + selectedPackage.name + " and get back to you shortly.",
        time: 'Now' 
      }]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tighter mb-2">Payment & Inquiry</h2>
        <p className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Secure Transactions & Project Consulting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Package Selection & QR */}
        <div className="space-y-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2 uppercase tracking-widest text-blue-400">
              <Package className="w-5 h-5" /> Select Your Path
            </h3>
            <div className="space-y-4">
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-300 ${
                    selectedPackage.id === pkg.id 
                    ? 'border-blue-600 bg-blue-600/10' 
                    : 'border-white/5 bg-white/2 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-xl uppercase tracking-tight">{pkg.name}</span>
                    <span className="font-bold text-2xl text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">{pkg.price}</span>
                  </div>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {pkg.features.map(f => (
                      <li key={f} className="text-[11px] font-bold uppercase tracking-tighter text-white/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-blue-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full" />
            <div className="p-4 bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] relative z-10">
              <QRCodeSVG value={paymentUrl} size={160} />
            </div>
            <div className="flex-1 text-center md:text-left relative z-10">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Instant UPI Gateway</p>
              <h3 className="text-3xl font-bold mb-3 tracking-tighter">Scan to Pay</h3>
              <p className="text-white/40 text-sm mb-6 font-medium">Verified ID: <strong>{upiId}</strong></p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-4 py-1.5 bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10">BHIM UPI</span>
                <span className="px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-blue-600/20">Secured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Messaging */}
        <div className="relative">
          <div className="sticky top-12 h-[650px] bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-8 flex items-center gap-5 shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20">
                <User className="w-7 h-7" />
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-bold tracking-tight">Pradeep Builds</h4>
                <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" /> 
                  Online & Active
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar">
              {chatHistory.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-[28px] text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-600/20' 
                    : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-2 font-bold uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-8 bg-black/20 border-t border-white/10 flex gap-3">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Inquire about project features..."
                className="flex-1 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:ring-2 ring-blue-500/30 transition-all font-medium placeholder:text-white/20"
              />
              <button 
                type="submit"
                className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/30"
              >
                <Send className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
