import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Download, Wand2, Loader2, RefreshCw } from 'lucide-react';
import { generateProjectImage } from '../services/geminiService';

export default function AIGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const url = await generateProjectImage(prompt);
      setGeneratedImage(url);
    } catch (err: any) {
      setError(err.message || 'Failed to generate image. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 md:p-16">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tighter mb-2">AI Image Engine</h2>
        <p className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Powered by Google Gemini Generative AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 shadow-2xl">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Prompt Description</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A futuristic glass office tower at sunset with neon lighting, photorealistic 3D render..."
              className="w-full h-48 p-6 bg-white/5 border border-white/10 rounded-3xl outline-none focus:ring-2 ring-blue-500/30 resize-none text-white text-lg placeholder:text-white/10"
            />
            
            <button
              id="btn-generate-ai"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-8 py-5 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 font-bold hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all disabled:opacity-40"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Synapse Processing...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 text-blue-200" />
                  Generate Framework
                </>
              )}
            </button>
            
            {error && (
              <p className="mt-6 text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-500/10 p-5 rounded-2xl border border-red-500/20 italic">
                {error}
              </p>
            )}
          </div>

          <div className="p-8 bg-blue-600/10 backdrop-blur-md rounded-[32px] border border-blue-500/20">
            <h4 className="text-blue-400 text-xs font-bold mb-3 flex items-center gap-2 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> Optimization Tip
            </h4>
            <p className="text-white/40 text-xs leading-relaxed font-medium">
              Use descriptive adjectives and lighting terms like 'volumetric lighting', '8k resolution', or 'hyper-detailed' to refine the neural output.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="aspect-square bg-white/5 backdrop-blur-sm rounded-[48px] border-2 border-dashed border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner group">
            {generatedImage ? (
              <>
                <img 
                  src={generatedImage} 
                  alt="AI Generated" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 text-white">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedImage;
                      link.download = 'ai-art.png';
                      link.click();
                    }}
                    className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl"
                  >
                    <Download className="w-5 h-5" /> Export 4K
                  </button>
                  <button 
                    onClick={handleGenerate}
                    className="px-10 py-4 border border-white/20 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md"
                  >
                    <RefreshCw className="w-5 h-5" /> Iterative Shift
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-12">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                  <Sparkles className="w-12 h-12 text-white/10" />
                </div>
                <p className="text-white/20 uppercase tracking-[0.3em] font-bold text-sm">Visual Synthesis Pending</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 bg-[#0a0b1e]/60 backdrop-blur-xl flex flex-col items-center justify-center z-10">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                />
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-blue-400 animate-pulse">Neural Render Active</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
