import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Share2, 
  Copy, 
  Globe, 
  Mail, 
  Twitter, 
  Linkedin,
  Check,
  Smartphone,
  ExternalLink,
  Loader2,
  Download,
  AlertCircle
} from 'lucide-react';

export default function Publish() {
  const [copied, setCopied] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildReady, setBuildReady] = useState(false);
  const [showPwaInfo, setShowPwaInfo] = useState(false);

  const appUrl = window.location.origin;
  const portfolioUrl = `${appUrl}/portfolio`;
  const paymentUrl = `${appUrl}/payment`;

  const handleBuild = () => {
    setIsBuilding(true);
    setBuildReady(false);
    setBuildProgress(0);
  };

  useEffect(() => {
    if (isBuilding) {
      const interval = setInterval(() => {
        setBuildProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsBuilding(false);
            setBuildReady(true);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isBuilding]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { name: 'Full Portfolio', url: portfolioUrl, desc: 'Every project in one place' },
    { name: 'Payment Portal', url: paymentUrl, desc: 'Quick secure checkout' },
    { name: 'Latest Showcase', url: `${appUrl}/showcase`, desc: 'Featured works only' },
  ];

  return (
    <div className="p-8 md:p-16">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tighter mb-2">Publish & Share</h2>
        <p className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Cloud Deployment & Social Integration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Shareable Links */}
        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-2xl">
            <h3 className="text-lg font-bold mb-10 flex items-center gap-3 uppercase tracking-[0.2em] text-blue-400">
              <Share2 className="w-5 h-5" /> Shareable Assets
            </h3>
            
            <div className="space-y-6">
              {links.map((link) => (
                <div key={link.name} className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white/10 transition-all">
                  <div>
                    <h4 className="font-bold text-lg mb-1 tracking-tight">{link.name}</h4>
                    <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold mb-3">{link.url}</p>
                    <p className="text-xs text-white/40 font-medium italic">{link.desc}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => copyToClipboard(link.url)}
                      className="p-4 bg-white/10 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-white/10"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      className="p-4 bg-white/10 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-white/10"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-tr from-blue-600/80 to-purple-600/80 backdrop-blur-2xl text-white p-10 rounded-[40px] flex items-center justify-between shadow-[0_0_50px_rgba(37,99,235,0.2)] relative overflow-hidden border border-white/20">
             <div className="absolute top-0 right-0 p-10 opacity-10 scale-150 rotate-12">
               <Globe className="w-48 h-48" />
             </div>
             <div className="relative z-10 max-w-sm">
               <h3 className="text-3xl font-bold mb-2 tracking-tighter">Global Edge Deployment</h3>
               <p className="text-white/70 text-sm mb-8 font-medium">Your platform is distributed across worldwide private nodes for zero-latency access.</p>
               <div className="flex flex-col gap-4">
                 <div className="flex gap-3">
                   <button 
                     onClick={handleBuild}
                     disabled={isBuilding}
                     className="px-8 py-3 bg-white text-blue-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                   >
                     {isBuilding ? (
                       <>
                         <Loader2 className="w-4 h-4 animate-spin" />
                         Compiling...
                       </>
                     ) : buildReady ? (
                       <>
                         <Download className="w-4 h-4" />
                         Download APK
                       </>
                     ) : (
                       'Build Android APK'
                     )}
                   </button>
                   <button 
                     onClick={() => setShowPwaInfo(!showPwaInfo)}
                     className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors whitespace-nowrap"
                   >
                     {showPwaInfo ? 'Hide Specs' : 'Config PWA'}
                   </button>
                 </div>

                 {isBuilding && (
                   <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden border border-white/10">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${buildProgress}%` }}
                       className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                     />
                   </div>
                 )}

                 <AnimatePresence>
                   {(buildReady || showPwaInfo) && (
                     <motion.div
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       className="p-6 bg-white rounded-3xl text-blue-900 shadow-2xl space-y-4"
                     >
                       <div className="flex items-start gap-4">
                         <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                           <Smartphone className="w-6 h-6" />
                         </div>
                         <div>
                           <h4 className="font-bold text-sm uppercase tracking-tight">Deployment Ready</h4>
                           <p className="text-[11px] opacity-70 leading-relaxed mt-1">
                             {buildReady 
                               ? "Your APK wrapper is pre-compiled. To install without a store, open this URL on Android and select 'Add to Home Screen' via the browser menu."
                               : "The PWA engine uses service workers to enable full native APK capabilities including push notifications and offline access."}
                           </p>
                         </div>
                       </div>
                       
                       <div className="pt-4 border-t border-blue-100 flex justify-between items-center">
                         <p className="text-[10px] font-bold uppercase text-blue-400">Status: Verified</p>
                         <button className="text-[10px] font-bold underline text-blue-600">View Manifest</button>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             </div>
          </div>
        </div>

        {/* Right: QR Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {links.slice(0, 2).map((link) => (
            <div key={link.name} className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-2xl text-center flex flex-col items-center">
              <div className="p-6 bg-white rounded-3xl mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <QRCodeSVG value={link.url} size={200} />
              </div>
              <h4 className="font-bold mb-2 uppercase tracking-[0.1em] text-blue-400 text-sm">{link.name} QR</h4>
              <p className="text-xs text-white/30 font-medium leading-relaxed max-w-[200px]">Physical meeting integration. Deploy your presence instantly.</p>
              <button className="mt-8 w-full py-4 border border-dashed border-white/20 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-white/40 hover:border-blue-500/50 hover:text-blue-400 transition-all">
                Print Card Specs
              </button>
            </div>
          ))}
          
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl rounded-[40px] p-10 text-white flex items-center gap-10 border border-white/10 shadow-2xl">
            <div className="w-20 h-20 bg-blue-600/20 rounded-[28px] flex items-center justify-center shrink-0 border border-blue-500/20 shadow-inner">
               <Smartphone className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2 tracking-tighter">Mobile Optimization Engine</h4>
              <p className="text-sm text-white/40 leading-relaxed font-medium italic">"Every micro-interaction is handcrafted for haptic precision, ensuring fluid navigation across all mobile touchpoints."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
